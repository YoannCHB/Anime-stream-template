/*
 * Break.js
 * website --> Comming soon
 * Version: 2.1
 *
 * Copyright Yoann Charbonnier
 * Released under license
 * https://github.com/YoannCHB/Break
*/

const auto_url = function(u){
    try {
        let url = new window.URL(u);
        let s = Boolean(url);
        return s;
    }
    catch(e){
        return false;
    }
}

var auto_ext = ["sncf","org","com","us","fr","xyz","sony","sexy","eus","gift","info","st","int","net","pro","post","wiki","onl","cat"];

class BreakRequest{
    constructor(url){
        this.type = null;
        this.method = 'GET';
        this.request = false;
        this.url = url;
        this.loop = true;
        this.connected = false;
        this.error = false;
        this.proto1 = new XMLHttpRequest();
        this.proto2 = null;
        this.proto3 = null;
        this.json = null;
        this.response = null;
        this.correctURL = false;
        this.f = {};
        this.headers = [];
        this.responseType = false;
        this.headerMap = [];
        this.send = null;
    }
}

//EXTENSION URL (EXEMPLE: 'com')
BreakRequest.prototype.ext = function(e){
    auto_ext.push(e);
}

BreakRequest.prototype.writeHead = function(h, v){
    this.headers.push(new Array(h, v));
}

//PORT
BreakRequest.prototype.listen = function(p){
    let cache = this.url.split('/');
    let verif = false;
    let final = "";
    for(var n in cache){
        if(cache[n].indexOf('.') != -1 && !verif){
            if(cache[n].indexOf(':') != -1){ //VERIF SI IL Y ADEJA UN PORT
                console.error('Port already open !');
                final += cache[n]+"/";
                verif = true;
            } else {
                final += cache[n]+":"+p+"/"; //RAJOUTE PORT
                verif = true;
            }
        } else {
            final += cache[n]+"/";
        }
    }
    this.url = final;
    console.warn("Port open on: "+this.url);
}

const auto_proto3 = function(el, url){
    if(el.f.error){
        el.f.error();
    }
    el.error = true;
    el.send = false;
}


//Window.EventSource
const auto_evsource = function(el, url){
    try{

        //SET THE HEADERS
        if(el.headers.length > 0){
            var h  = {};
            for(var i = 0; i < el.headers.length; i++){
                h[el.headers[i][0]] = el.headers[i][1];
            }
            //console.log(h);
        }

        if(h){
            el.proto3 = new window.EventSource(url, h);
        } else {
            el.proto3 = new window.EventSource(url);
        }
        
        el.proto3.onerror = function(e){
            auto_proto2(el, url);
        }

        el.proto3.onopen = function(){
            el.type = ['EventSource']
            el.request = el.proto3;
            el.connected = true;
            el.response = false;
            el.json = false;
            el.correctURL = url;
            if(el.f.open){
                el.f.open(el.proto3);
            }
        }

        el.proto3.onmessage = function(e){
            if(el.f.message){
                el.f.message(e);
            }
        }

        el.proto3.onclose = function(e){
            if(el.f.close){
                el.f.close(e);
            }
            el.send = false;
            console.warn('Server closed');
        }
    }
    catch(e){
        auto_proto2(el, url);
    }
}
//FIN EventSource


const auto_proto2 = function(el, url){
    let test = url.indexOf('http');
    if(test == -1){
        try {
        el.proto2 = new WebSocket(url);
    }
    catch(e){
        auto_proto3(el, url);
        return '';
    }
    } else {
        url = url.replace('https', "wss") != url ? url.replace('https', "wss") : url.replace('http', 'ws');
        try {
        el.proto2 = new WebSocket(url);
        }
        catch(e){
            auto_proto3(el, url);
            return "";
        }
    }
    el.proto2.onerror = function(e){
        //console.log(e);
        el.send = false;
        auto_proto3(el, url);
    }
    el.proto2.onopen = function(){
        el.type = ['WebSocket']
        el.request = el.proto2;
        el.connected = true;
        el.response = false;
        el.json = false;
        el.correctURL = url;
        el.send = function(text){
            this.proto2.send(text);
        }
        if(el.f.open){
            el.f.open(el.proto2);
        }
    }
    el.proto2.onmessage = function(e){
        if(el.f.message){
            el.f.message(e);
        }
    }
    el.proto2.onclose = function(e){
        if(el.f.close){
            el.f.close(e);
        }
        el.send = false;
        console.warn('Server closed');
    }
}

const auto_verif = function(url){
    if(url.indexOf('http') + url.indexOf('ws') == -2){
        return "https://";
    } else {
        return false;
    }
    if(url.indexOf('.')){
        let s = url.split('.');
        let g = s[s.length-1];
    for(var i = 0; i < auto_ext.length; i++){
        if(g == auto_ext[i]){
            return "https://";
        }
    }
    }
    if(url.indexOf('/') == -1){
        return "/";
    }
    return false;
}

BreakRequest.prototype.connect = function(url){
    let element = this;
    url = url || this.url;
    let save = url;
    let complement = auto_verif(url);
    if(complement){
        url = complement+url;
    }
    if(!auto_url(url)){
        url = document.location.href+url;
        if(!auto_url(url)){
            console.error('INVALID URL: '+element.url);
            return false;
        }
    }
    this.proto1.open(this.method, url, this.loop);
    //HEADERS
    for(var i = 0; i < this.headers.length; i++){
        this.proto1.setRequestHeader(this.headers[i][0], this.headers[i][1])
    }
    //RESPONSE TYPE
    if(this.responseType){
        this.proto1.responseType = this.responseType;
    }
    this.proto1.onerror = function(e){
        //console.error(e);
        element.send = false;
        auto_evsource(element, url);
    }
    this.proto1.onload = function(){

        // Get the raw header string
        let headers = element.proto1.getAllResponseHeaders();
        // Convert the header string into an array
        // of individual headers
        let arr = headers.trim().split(/[\r\n]+/);
        // Create a map of header names to values
        arr.forEach(function (line) {
        var parts = line.split(': ');
        var header = parts.shift();
        var value = parts.join(': ');
        element.headerMap[header] = value;
        });

        element.request = element.proto1;
        element.type = ["XMLHttpRequest", 'GET', element.responseType];
        element.connected = true;
        element.correctURL = url;
        element.response = element.proto1.response;
        element.send = function(text){
            let req = new XMLHttpRequest();
            req.open('POST', this.url);
            req.onerror = function(e){
                console.warn(e);
            }
            req.send(text);
        }
        try{
            var jsonGet = JSON.parse(element.proto1.response);
        }
        catch(e){
            var jsonGet = false;
        }
        if(jsonGet){
            element.json = jsonGet;
        }
        if(element.f.open){
            element.f.open(element.proto1.response);
        } else {
            //console.info(element.proto1.response);
        }
    }
    this.proto1.send();
}

BreakRequest.prototype.on = function(p, call){
    try{
        p = p.toLowerCase();
    }
    catch(e){
        p = p;
    }
   switch(p){
       case "message":
       this.f.message = call;
       break;

       case "open":
       this.f.open = call;
       break;

       case "close":
       this.f.close = call;
       break;

       case "error":
       this.f.error = call;
       break;

       default:
       console.error('Invalide parameter: '+p);
   }
}