

//500px photos
var infowindow;
window.onload = function () {
    setDateToday();
    setDateWeek();
    setDateMonth();
    setDateYear();
    _500px.init({
        sdk_key: 'c4e4e7623c6b35f6b42acc1bbb261b685de19d76'
    });
    infowindow = new google.maps.InfoWindow();

    var url = document.URL;
    var poz = url.indexOf('code=');
    if (poz > 0 && instagramToken === 0) {
        getInstagramToken(url.substr(poz+5))
    }
};

/* Google Map */

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 30.644},
        zoom: 2
    });
}
/*----------------------*/

function on(image_url,name,description,url) {
    console.log(image_url,name,description,url);
    document.getElementById('fullImage').src = image_url;
    document.getElementById('fullImageSource').href =  url;
    document.getElementById('fullImageTitle').textContent = name;
    document.getElementById('fullImageDescription').textContent = description;
    document.getElementById("fullscreen").style.display = "block";
}

function off() {
    document.getElementById("fullscreen").style.display = "none";
}
