
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

    document.getElementById("tag").value = localStorage.getItem("tag");
    document.getElementById("500px").checked = localStorage.getItem("500px") == "true"? true:false;
    document.getElementById("flickr").checked = localStorage.getItem("flickr") == "true"? true:false;
    document.getElementById("instagram").checked = localStorage.getItem("instagram") == "true"? true:false;

    document.getElementById("popular").checked = localStorage.getItem("popular") == "true"? true:false;
     document.getElementById("highest_rated").checked = localStorage.getItem("highest_rated") == "true"? true:false;
    document.getElementById("upcoming").checked = localStorage.getItem("upcoming") == "true"? true:false;
    document.getElementById("fresh_today").checked = localStorage.getItem("fresh_today") == "true"? true:false;
    document.getElementById("fresh_yesterday").checked = localStorage.getItem("fresh_yesterday") == "true"? true:false;
    document.getElementById("fresh_week").checked = localStorage.getItem("fresh_week") == "true"? true:false;

    document.getElementById("romania").checked = localStorage.getItem("romania") == "true"? true:false;
    document.getElementById("europe").checked = localStorage.getItem("europe") == "true"? true:false;
    document.getElementById("asia").checked = localStorage.getItem("asia") == "true"? true:false;
    document.getElementById("africa").checked = localStorage.getItem("africa") == "true"? true:false;
    document.getElementById("south-america").checked = localStorage.getItem("south-america") == "true"? true:false;
   document.getElementById("north-america").checked =  localStorage.getItem("north-america") == "true"? true:false;
   document.getElementById("australia").checked =  localStorage.getItem("australia") == "true"? true:false;
   document.getElementById("antarctica").checked =  localStorage.getItem("antarctica") == "true"? true:false;


    document.getElementById("uncategorized").checked = localStorage.getItem("uncategorized") == "true"? true:false;
    document.getElementById("abstract").checked = localStorage.getItem("abstract") == "true"? true:false;
    document.getElementById("aerial").checked = localStorage.getItem("aerial") == "true"? true:false;
    document.getElementById("animals").checked = localStorage.getItem("animals") == "true"? true:false;
    document.getElementById("celebrities").checked = localStorage.getItem("celebrities") == "true"? true:false;
    document.getElementById("city-and-architecture").checked = localStorage.getItem("city-and-architecture") == "true"? true:false;
    document.getElementById("comercial").checked = localStorage.getItem("comercial") == "true"? true:false;
    document.getElementById("family").checked = localStorage.getItem("family") == "true"? true:false;
     document.getElementById("fashion").checked =localStorage.getItem("fashion") == "true"? true:false;
    document.getElementById("film").checked = localStorage.getItem("film") == "true"? true:false;
    document.getElementById("fine-art").checked =localStorage.getItem("fine-art") == "true"? true:false;
   document.getElementById("food").checked =  localStorage.getItem("food") == "true"? true:false;
    document.getElementById("landscapes").checked = localStorage.getItem("landscapes") == "true"? true:false;
    document.getElementById("nature").checked = localStorage.getItem( "nature") == "true"? true:false;
    document.getElementById("night").checked = localStorage.getItem( "night") == "true"? true:false;
    document.getElementById("nude").checked = localStorage.getItem("nude") == "true"? true:false;
    document.getElementById("people").checked = localStorage.getItem("people") == "true"? true:false;
    document.getElementById("travel").checked = localStorage.getItem("travel") == "true"? true:false;
    document.getElementById("wedding").checked = localStorage.getItem("wedding") == "true"? true:false;


     document.getElementById("70px").checked = localStorage.getItem( "70px") == "true"? true:false;
     document.getElementById("140px").checked =localStorage.getItem( "140px") == "true"? true:false;
    document.getElementById("280px").checked = localStorage.getItem("280px") == "true"? true:false;
    document.getElementById("100px").checked = localStorage.getItem( "100px") == "true"? true:false;
    document.getElementById("200px").checked = localStorage.getItem( "200px") == "true"? true:false;
     document.getElementById("440px").checked = localStorage.getItem( "440px") == "true"? true:false;
    document.getElementById("600px").checked = localStorage.getItem( "600px") == "true"? true:false;

    document.getElementById("Canon").checked = localStorage.getItem( "Canon") == "true"? true:false;
    document.getElementById("NIKON").checked = localStorage.getItem( "NIKON") == "true"? true:false;
    document.getElementById("DSLR").checked = localStorage.getItem(  "DSLR") == "true"? true:false;


    document.getElementById("max10").checked = localStorage.getItem( "max10") == "true"? true:false;
    document.getElementById("max50").checked = localStorage.getItem(  "max50") == "true"? true:false;
    document.getElementById("max100").checked =localStorage.getItem(  "max100") == "true"? true:false;
    document.getElementById("max150").checked =localStorage.getItem(  "max150") == "true"? true:false;
    document.getElementById("max200").checked = localStorage.getItem(  "max200") == "true"? true:false;
    document.getElementById("max250").checked = localStorage.getItem(  "max250") == "true"? true:false;
    document.getElementById("max300").checked = localStorage.getItem(  "max300") == "true"? true:false;


    document.getElementById("romaniaFlickr").checked = localStorage.getItem(  "romaniaFlickr") == "true"? true:false;
     document.getElementById("europeFlickr").checked = localStorage.getItem(  "europeFlickr") == "true"? true:false;
    document.getElementById("asiaFlickr").checked = localStorage.getItem(  "asiaFlickr") == "true"? true:false;
    document.getElementById("africaFlickr").checked = localStorage.getItem(  "africaFlickr") == "true"? true:false;
    document.getElementById("south-americaFlickr").checked =localStorage.getItem( "south-americaFlickr") == "true"? true:false;
     document.getElementById("north-americaFlickr").checked = localStorage.getItem( "north-americaFlickr") == "true"? true:false;
    document.getElementById("australiaFlickr").checked = localStorage.getItem( "australiaFlickr") == "true"? true:false;
     document.getElementById("antarcticaFlickr").checked = localStorage.getItem( "antarcticaFlickr") == "true"? true:false;
};

window.onclick = function () {

    localStorage.setItem("tag", document.getElementById("tag").value);
    localStorage.setItem("500px", document.getElementById("500px").checked);
    localStorage.setItem("flickr", document.getElementById("flickr").checked);
    localStorage.setItem("instagram", document.getElementById("instagram").checked);

    localStorage.setItem("popular", document.getElementById("popular").checked);
    localStorage.setItem("highest_rated", document.getElementById("highest_rated").checked);
    localStorage.setItem("upcoming", document.getElementById("upcoming").checked);
    localStorage.setItem("fresh_today", document.getElementById("fresh_today").checked);
    localStorage.setItem("fresh_yesterday", document.getElementById("fresh_yesterday").checked);
    localStorage.setItem("fresh_week", document.getElementById("fresh_week").checked);

    localStorage.setItem("romania", document.getElementById("romania").checked);
    localStorage.setItem("europe", document.getElementById("europe").checked);
    localStorage.setItem("asia", document.getElementById("asia").checked);
    localStorage.setItem("africa", document.getElementById("africa").checked);
    localStorage.setItem("south-america", document.getElementById("south-america").checked);
    localStorage.setItem("north-america", document.getElementById("north-america").checked);
    localStorage.setItem("australia", document.getElementById("australia").checked);
    localStorage.setItem("antarctica", document.getElementById("antarctica").checked);


    localStorage.setItem("uncategorized", document.getElementById("uncategorized").checked);
    localStorage.setItem("abstract", document.getElementById("abstract").checked);
    localStorage.setItem("aerial", document.getElementById("aerial").checked);
    localStorage.setItem("animals", document.getElementById("animals").checked);
    localStorage.setItem("celebrities", document.getElementById("celebrities").checked);
    localStorage.setItem("city-and-architecture", document.getElementById("city-and-architecture").checked);
    localStorage.setItem("comercial", document.getElementById("comercial").checked);
    localStorage.setItem("family", document.getElementById("family").checked);
    localStorage.setItem("fashion", document.getElementById("fashion").checked);
    localStorage.setItem("film", document.getElementById("film").checked);
    localStorage.setItem("fine-art", document.getElementById("fine-art").checked);
    localStorage.setItem("food", document.getElementById("food").checked);
    localStorage.setItem("landscapes", document.getElementById("landscapes").checked);
    localStorage.setItem( "nature", document.getElementById("nature").checked);
    localStorage.setItem( "night", document.getElementById("night").checked);
    localStorage.setItem("nude", document.getElementById("nude").checked);
    localStorage.setItem("people", document.getElementById("people").checked);
    localStorage.setItem("travel", document.getElementById("travel").checked);
    localStorage.setItem("wedding", document.getElementById("wedding").checked);


    localStorage.setItem( "70px", document.getElementById("70px").checked);
    localStorage.setItem( "140px", document.getElementById("140px").checked);
    localStorage.setItem("280px", document.getElementById("280px").checked);
    localStorage.setItem( "100px", document.getElementById("100px").checked);
    localStorage.setItem( "200px", document.getElementById("200px").checked);
    localStorage.setItem( "440px", document.getElementById("440px").checked);
    localStorage.setItem( "600px", document.getElementById("600px").checked);

    localStorage.setItem( "Canon", document.getElementById("Canon").checked);
    localStorage.setItem( "NIKON", document.getElementById("NIKON").checked);
    localStorage.setItem(  "DSLR", document.getElementById("DSLR").checked);


    localStorage.setItem( "max10", document.getElementById("max10").checked);
    localStorage.setItem(  "max50", document.getElementById("max50").checked);
    localStorage.setItem(  "max100", document.getElementById("max100").checked);
    localStorage.setItem(  "max150", document.getElementById("max150").checked);
    localStorage.setItem(  "max200", document.getElementById("max200").checked);
    localStorage.setItem(  "max250", document.getElementById("max250").checked);
    localStorage.setItem(  "max300", document.getElementById("max300").checked);


    localStorage.setItem(  "romaniaFlickr", document.getElementById("romaniaFlickr").checked);
    localStorage.setItem(  "europeFlickr", document.getElementById("europeFlickr").checked);
    localStorage.setItem(  "asiaFlickr", document.getElementById("asiaFlickr").checked);
    localStorage.setItem(  "africaFlickr", document.getElementById("africaFlickr").checked);
    localStorage.setItem( "south-americaFlickr", document.getElementById("south-americaFlickr").checked);
    localStorage.setItem( "north-americaFlickr", document.getElementById("north-americaFlickr").checked);
    localStorage.setItem( "australiaFlickr", document.getElementById("australiaFlickr").checked);
    localStorage.setItem( "antarcticaFlickr", document.getElementById("antarcticaFlickr").checked);

    console.log("Saved!");
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


