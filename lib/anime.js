/*
 * animeAPI.js
 * website --> Comming soon
 * Version: beta
 *
 * Copyright Yoann Charbonnier
 * Released under license
 * https://github.com/YoannCHB/animeAPI
*/

function animeAPI(name, backcall){
    let api = new BreakRequest('https://kitsu.io/api/edge/anime?filter[text]='+encodeURIComponent(name));
    api.on('open', function(res){
        res=api.json;
        let anime_name=[];
        let anime_synopsis=[];
        let createdAt=[];
        let updatedAt=[];
        let endDate=[];
        let nextRelease=[];
        let anime_type=[];
        let anime_status=[];
        let anime_pop=[];
        let anime_age=[];
        let anime_subtype=[];
        let posterImage=[];
        let coverImage=[];
        let anime_nsfw=[]
        let anime_ep={
            episodeCount: 0,
            episodeLength: 0,
            totalLength: 0
        }
        let anime_youtube=[];
        let cache='';
        let anime_genre=[];
        for(n in res.data){
            let actu=res.data[n];
            //anime_name
            anime_name.push(actu.attributes.titles);
            anime_name.push(actu.attributes.abbreviatedTitles);
            //anime_synopsis
            anime_synopsis.push(actu.attributes.synopsis)
            //createdAt
            createdAt.push(actu.attributes.startDate);
            //updatedAt
            updatedAt.push(actu.attributes.updatedAt.split('T')[0])
            //endDate
            endDate.push(actu.attributes.endDate)
            //nextRelease
            nextRelease.push(actu.attributes.nextRelease)
            //anime_type
            anime_type.push(actu.type);
            //anime_status
            anime_status.push(actu.attributes.status);
            //anime_pop
            anime_pop.push(actu.attributes.popularityRank);
            anime_pop.push(actu.attributes.ratingRank);
            //anime_age
            anime_age.push(actu.attributes.ageRating);
            anime_age.push(actu.attributes.ageRatingGuide);
            //anime_subtype
            anime_subtype.push(actu.attributes.subtype);
            //posterImage
            posterImage.push(actu.attributes.posterImage);
            //coverImage
            coverImage.push(actu.attributes.coverImage);
            //anime_nsfw
            anime_nsfw.push(actu.attributes.nsfw);
            //anime_ep
            anime_ep.episodeCount=actu.attributes.episodeCount;
            anime_ep.episodeLength=actu.attributes.episodeLength;
            anime_ep.totalLength=actu.attributes.totalLength;
            //anime_youtube
            anime_youtube.push(actu.attributes.youtubeVideoId);
            //cache
            cache=actu.relationships.genres.links.related;
        }
        let req=new BreakRequest(cache);
        req.on('open', function(res){
            for(var i=0; i<req.json.data.length; i++){
                anime_genre.push(req.json.data[i].attributes.name)
            }
            let animeAPIResult={
                anime_genre: anime_genre,
                anime_name: anime_name,
                anime_synopsis: anime_synopsis,
                createdAt: createdAt,
                updatedAt: updatedAt,
                endDate: endDate,
                nextRelease: nextRelease,
                anime_type: anime_type,
                anime_status: anime_status,
                anime_pop: anime_pop,
                anime_age: anime_age,
                anime_subtype: anime_subtype,
                posterImage: posterImage,
                coverImage: coverImage,
                anime_nsfw: anime_nsfw,
                anime_ep: anime_ep,
                anime_youtube: anime_youtube
            }
            backcall(animeAPIResult);
        })
        req.connect();
    })
    api.connect();
}
/*Example for konosuba anime
animeAPI('konosuba', function(res){
    console.log(res);
});
*/