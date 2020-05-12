/*
    SETUP anime and episode video
*/
const link = document.location.href.split('?')[1].split('&');
const jsonResult = {
    name: decodeURIComponent(link[0].split('=')[1]),
    episode: link[1].split('=')[1]
}


var base = new firebaseLoader(firebaseConfig, function(e){

    /*
      Get values from database
    */
    e.getValueKeyDatabase(jsonResult.name, function(val){
        launchVideo(val.embed, Number(jsonResult.episode));
    });
    
    
});

/*
  Imports module of firebase and launch the function above
  WARNING: obligatory function to launch the script !
*/
base.importAllModule();





/*
    MAIN
*/
function launchVideo(liste, ep){
    document.title = jsonResult.name + " \|\| Episode " + (Number(jsonResult.episode));
    let div = document.getElementById('buttons_ep');
    let header = div.parentNode;
    div.innerHTML = "";
    let keys = Object.keys(liste);
    let link = liste[keys[Number(ep)-1]];

    //Accueille
    let accueille = document.createElement('a');
    accueille.href = "../index.html";
    accueille.innerHTML = "Accueille";
    div.appendChild(accueille);

    if(Number(ep)!=1){
        //EPISODE PRECEDENT
        let newEp = Number(jsonResult.episode)-1;
        let epPrecedent = document.createElement('a');
        //epPrecedent.href = "lecteur.html?name="+encodeURIComponent(jsonResult.name)+"&ep="+newEp;
        epPrecedent.onclick = function(){
            jsonResult.episode = Number(jsonResult.episode)-1;
            launchVideo(liste, jsonResult.episode);
        }
        epPrecedent.innerHTML = "< Precedent";
        div.appendChild(epPrecedent);
    }

    if(Number(ep)+1<liste.length){
        //EPISODE SUIVANT
        let newEp = Number(jsonResult.episode)+1;
        let epSuivant = document.createElement('a');
        //epSuivant.href = "lecteur.html?name="+encodeURIComponent(jsonResult.name)+"&ep="+newEp;
        epSuivant.onclick = function(){
            jsonResult.episode = Number(jsonResult.episode)+1;
            launchVideo(liste, jsonResult.episode);
        }
        epSuivant.innerHTML = "Suivant >";
        div.appendChild(epSuivant);
    }


    //TITLE EPISODE
    let title = document.getElementById('title') || document.createElement("h1");
    title.innerHTML = jsonResult.name+" \|\| Episode "+ep;
    title.id = "title";
    header.appendChild(title);

    //VIDEO
    let iframe = document.getElementById('video_anime') || document.createElement('iframe');
    iframe.id = "video_anime";
    iframe.src = link;
    iframe.innerHTML = "Loading...";
    iframe.allowFullscreen = "true";
    iframe.allow = "fullscreen";
    document.body.appendChild(iframe);
}