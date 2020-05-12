/*
    PAGE de chargement
*/
var page_chargement = true;
var time_chargement_after_end = 1000;


var base = new firebaseLoader(firebaseConfig, function(e){

    /*
      Get values from database
    */
    e.getValuesDatabase(function(key,val){
        animeAPI(key, function(res){
            //PAGE de chargement
            if(page_chargement){
                setTimeout(function(){
                    document.getElementById('page_chargement').style.opacity = "0";
                }, time_chargement_after_end+500);
                setTimeout(function(){
                    document.getElementById('page_chargement').style.display = "none";
                }, time_chargement_after_end+600);
                page_chargement = false;
            }

            //SCRIPT on load
            let genres = "";
            let poster = res.posterImage[0].original;
            let synopsy = res.anime_synopsis[0];
            let baniere = "";
            try{
                baniere = res.coverImage[0].tiny;
            } catch(e) {}
            res.anime_genre.forEach( genre => genres+=genre+", " );
            genres = genres.trim()=="" ? "Genres inconnues" : genres.substring(0,genres.length-2);
            createArticle(key, genres, poster, synopsy, baniere, val);
        });
    });
    
    
});

/*
  Imports module of firebase and launch the function above
  WARNING: obligatory function to launch the script !
*/
base.importAllModule();



/*
    CREATE articles
*/
function createArticle(name,genre,poster,synop,baniere,embed){
    let doc = document.getElementById('animes_list');

    //ARTICLE
    let article = document.createElement('article');
    article.setAttribute('name', '');
    article.name = name;
    article.style.backgroundImage = "url("+poster+")";
    article.style.backgroundRepeat = "no-repeat";
    article.style.backgroundSize = "100% 100%";
    article.onclick = function(){
        editPopup(name, synop, baniere, embed);
    }
    doc.appendChild(article, doc.getElementsByTagName('article')[1]);

    //TITLE
    let title = document.createElement('div');
    title.innerHTML = "<p>"+name+"</p>";
    title.className = "titleArticle";
    article.appendChild(title);

    //GENRES
    let g = document.createElement('div');
    g.innerHTML = "<p>"+genre+"</p>";
    g.className = "genresArticle";
    article.appendChild(g);

}



/*
    EDIT popup
*/
function editPopup(name, synop, baniere, embed){

    //RESET POPUP
    let pop = document.getElementById('popup');
    pop.innerHTML = "";
    

    //BANIERE
    let img = document.createElement('img');
    img.src = baniere;
    img.alt = "Image en cours de chargement ...";
    img.onload = function(){
        //APPEAR POPUP
        pop.parentNode.style.display = "block";
        pop.parentNode.style.opacity = "1";
        pop.parentNode.onclick = function(){
            this.style.opacity = "0";
            this.style.display = "none";
        }
    }
    img.onerror = function(){
        //APPEAR POPUP
        pop.parentNode.style.display = "block";
        pop.parentNode.style.opacity = "1";
        pop.parentNode.onclick = function(){
            this.style.opacity = "0";
            this.style.display = "none";
        }
        img.remove();
    }
    pop.appendChild(img);

    //TITLE
    let title = document.createElement('h1');
    title.innerHTML = name;
    pop.appendChild(title);

    //SYNOPSY
    let synopsy = document.createElement('p');
    synopsy.innerHTML = synop;
    pop.appendChild(synopsy);

    //BUTTON EP
    let allEp = Object.keys(embed.embed);
    allEp = allEp.sort();
    let div = document.createElement('div');
    div.innerHTML = "";
    for(var i = 0; i<allEp.length; i++){
        let link = embed[i];
        div.innerHTML += "<a href='./pages/lecteur.html?name="+encodeURIComponent(name)+"&ep="+(i+1)+"'>Episode "+(i+1)+"</a>";
    }
    pop.appendChild(div);

}