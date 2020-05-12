 
/*
 * firebaseLoader
 * Version: beta
 *
 * https://github.com/YoannCHB/firebaseLoader
*/
class firebaseLoader{
    constructor(config=false, callback=false, imp){
        if(!config){throw "the configuration can not be an Empty Object !"}
        if(!callback){throw "the callback can not be an Empty Function !"}
        this._config = config;
        this._callback = callback;
        this._importFiles = imp || ["https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js",
        "https://www.gstatic.com/firebasejs/7.13.1/firebase-analytics.js",
        "https://www.gstatic.com/firebasejs/7.13.1/firebase-firestore.js",
        "https://www.gstatic.com/firebasejs/7.13.1/firebase-auth.js",
        "https://www.gstatic.com/firebasejs/7.13.1/firebase-functions.js",
        "https://www.gstatic.com/firebasejs/7.13.1/firebase-database.js",
        "https://www.gstatic.com/firebasejs/7.13.1/firebase-storage.js",
        "https://www.gstatic.com/firebasejs/7.13.1/firebase-remote-config.js",
        "https://www.gstatic.com/firebasejs/7.13.1/firebase.js"
        ];
        this._countLoaded = 0;
        this._countError = 0;
        this._moduleLoaded = false;
        this._database = false;
    }

    importModule(url){
        var _element = this;
        let e = document.createElement("script");
        e.src = url;
        e.onload = function(){
            _element._countLoaded++;
            if(_element._countLoaded>=_element._importFiles.length){
                _element._moduleLoaded = true;
                firebase.initializeApp(_element._config);
                _element._database = firebase.database();
                _element._callback(_element);
            }
        }
        e.onerror = function(){
            _element._countLoaded++;
            _element._countError++;
            if(_element._countLoaded>=_element._importFiles.length){
                _element._moduleLoaded = true;
                firebase.initializeApp(_element._config);
                _element._database = firebase.database();
                _element._callback(_element);
            }
        }
        document.body.appendChild(e);
    }

    importAllModule(){
        this._importFiles.forEach( mod => this.importModule(mod) );
    }

    getImportFiles(){
        return this._importFiles;
    }

    getCallback(){
        return this._callback;
    }

    getModuleStats(){
        return this._moduleLoaded;
    }

    getDatabase(){
        return this._database;
    }

    getModLoaded(){
        return this._countLoaded-this._countError;
    }

    getModError(){
        return this._countError;
    }

    getValuesDatabase(callback=false){
        if(!callback){throw "callback must be specified !";}
        this._database.ref().once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              callback(childKey,childData);
            });
        });
    }

    getValueKeyDatabase(key=false,callback=false){
        if(!key){throw "key must be specified !";}
        if(!callback){throw "callback must be specified !";}
        let leadsRef = this._database.ref(key);
        leadsRef.on('value', function(snapshot) {
              var childData = snapshot.node_.children_.root_.value.value_;
              callback(snapshot.val());
        });
    }

    writeDatabase(key=false,json={}){
        if(!key){throw "error undifined key !";}
        this._database.ref(key).set(json);
    }
}