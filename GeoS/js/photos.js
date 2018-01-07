function getInstagramPhotos(){
    var request = new XMLHttpRequest();
    request.open("GET","https://api.instagram.com/v1/tags/nofilter/media/recent",true);
    var params = {
        client_id: "a09387af147046f4b1bffb41fd63153e",
        access_token: "cca1df0f4fb7410d88d0d9ac37bcb82a"
    };

    request.onloadend = function (data) {
        console.log(data);
    };
    request.send(params);
}


//getInstagramPhotos();

