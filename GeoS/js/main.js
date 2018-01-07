

//500px photos

window.onload = function () {
    _500px.init({
        sdk_key: 'c4e4e7623c6b35f6b42acc1bbb261b685de19d76'
    });
};


/* Google Map */

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}
/*----------------------*/

function on(image_url,name,description,url) {
    document.getElementById('fullImage').src = image_url;
    document.getElementById('fullImageSource').href = "https://500px.com" + url;
    document.getElementById('fullImageTitle').textContent = name;
    document.getElementById('fullImageDescription').textContent = description;
    document.getElementById("fullscreen").style.display = "block";
}

function off() {
    document.getElementById("fullscreen").style.display = "none";
}
