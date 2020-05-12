/*
    SETUP search bar
*/
const searchBar = document.getElementById('search');


/*
    ON CHANGE OR INPUT WHAT ARE WE DOING ?
*/
searchBar.oninput = function(){
    //VALUE TO RESEARCH
    let text = this.value.toLowerCase().trim().replace(/ /g, "");
    let animes = document.getElementById('animes_list').getElementsByTagName('article');

    //VERIFICATION WORD IN ANIME
    for(var i in animes){
        try{
            let animeWord = animes[i].name.toLowerCase().trim().replace(/ /g, "");
            let result = false;
            if(animeWord.indexOf(text)!=-1){
                result = true;
            }
            if(!result){
                animes[i].style.display = "none";
            } else {
                animes[i].style.display = "block";
            }
        }catch(e){}
    }

}