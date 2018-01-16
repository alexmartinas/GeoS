
function saveCookie(name, value) {
    var cookieString = [name, '=', JSON.stringify(value),
        ";domain=.",
        ";expires="+ new Date(new Date().getTime()+60*60*1000*744).toGMTString(),
        ';path=/;'].join('');
    document.cookie = cookieString;
}

function loadCookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

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

    document.getElementById("tag").value = localStorage.getItem("tag");
    document.getElementById("500px").checked = localStorage.getItem("500px") == "true"? true:false; 
    document.getElementById("flickr").checked = localStorage.getItem("flickr") == "true"? true:false; 
    document.getElementById("instagram").checked = localStorage.getItem("instagram") == "true"? true:false;

    document.getElementById("popular").checked = localStorage.getItem("popular") == "true"? addFilter2(document.getElementById("popular")):false; 
    document.getElementById("highest_rated").checked = localStorage.getItem("highest_rated") == "true"? addFilter2(document.getElementById("highest_rated")):false;
    document.getElementById("upcoming").checked = localStorage.getItem("upcoming") == "true"? addFilter2(document.getElementById("upcoming")):false; 
    document.getElementById("fresh_today").checked = localStorage.getItem("fresh_today") == "true"? addFilter2(document.getElementById("fresh_today")):false; 
    document.getElementById("fresh_yesterday").checked = localStorage.getItem("fresh_yesterday") == "true"? addFilter2(document.getElementById("fresh_yesterday")):false; 
    document.getElementById("fresh_week").checked = localStorage.getItem("fresh_week") == "true"? addFilter2(document.getElementById("fresh_week")):false; 

    document.getElementById("romania").checked = localStorage.getItem("romania") == "true"? addFilter2(document.getElementById("romania")):false; 
    document.getElementById("europe").checked = localStorage.getItem("europe") == "true"? addFilter2(document.getElementById("europe")):false; 
    document.getElementById("asia").checked = localStorage.getItem("asia") == "true"? addFilter2(document.getElementById("asia")):false; 
    document.getElementById("africa").checked = localStorage.getItem("africa") == "true"? addFilter2(document.getElementById("africa")):false; 
    document.getElementById("south-america").checked = localStorage.getItem("south-america") == "true"? addFilter2(document.getElementById("south-america")):false; 
   document.getElementById("north-america").checked =  localStorage.getItem("north-america") == "true"? addFilter2(document.getElementById("north-america")):false; 
   document.getElementById("australia").checked =  localStorage.getItem("australia") == "true"? addFilter2(document.getElementById("australia")):false; 
   document.getElementById("antarctica").checked =  localStorage.getItem("antarctica") == "true"? addFilter2(document.getElementById("antarctica")):false; 


    document.getElementById("uncategorized").checked = localStorage.getItem("uncategorized") == "true"? addFilter2(document.getElementById("uncategorized")):false; 
    document.getElementById("abstract").checked = localStorage.getItem("abstract") == "true"? addFilter2(document.getElementById("abstract")):false; 
    document.getElementById("aerial").checked = localStorage.getItem("aerial") == "true"? addFilter2(document.getElementById("aerial")):false; 
    document.getElementById("animals").checked = localStorage.getItem("animals") == "true"? addFilter2(document.getElementById("animals")):false; 
    document.getElementById("celebrities").checked = localStorage.getItem("celebrities") == "true"? addFilter2(document.getElementById("celebrities")):false; 
    document.getElementById("city-and-architecture").checked = localStorage.getItem("city-and-architecture") == "true"? addFilter2(document.getElementById("city-and-architecture")):false; 
    document.getElementById("comercial").checked = localStorage.getItem("comercial") == "true"? addFilter2(document.getElementById("comercial")):false; 
    document.getElementById("family").checked = localStorage.getItem("family") == "true"? addFilter2(document.getElementById("family")):false; 
     document.getElementById("fashion").checked =localStorage.getItem("fashion") == "true"? addFilter2(document.getElementById("fashion")):false; 
    document.getElementById("film").checked = localStorage.getItem("film") == "true"? addFilter2(document.getElementById("film")):false; 
    document.getElementById("fine-art").checked =localStorage.getItem("fine-art") == "true"?  addFilter2(document.getElementById("fine-art")):false;  
   document.getElementById("food").checked =  localStorage.getItem("food") == "true"? addFilter2(document.getElementById("food")):false; 
    document.getElementById("landscapes").checked = localStorage.getItem("landscapes") == "true"? addFilter2(document.getElementById("landscapes")):false; 
    document.getElementById("nature").checked = localStorage.getItem( "nature") == "true"? addFilter2(document.getElementById("nature")):false; 
    document.getElementById("night").checked = localStorage.getItem( "night") == "true"? addFilter2(document.getElementById("night")):false; 
    document.getElementById("nude").checked = localStorage.getItem("nude") == "true"? addFilter2(document.getElementById("nude")):false; 
    document.getElementById("people").checked = localStorage.getItem("people") == "true"? addFilter2(document.getElementById("people")):false; 
    document.getElementById("travel").checked = localStorage.getItem("travel") == "true"? addFilter2(document.getElementById("travel")):false; 
    document.getElementById("wedding").checked = localStorage.getItem("wedding") == "true"? addFilter2(document.getElementById("wedding")):false; 


     document.getElementById("70px").checked = localStorage.getItem("70px") == "true"? addFilter2(document.getElementById("70px")):false;
     document.getElementById("140px").checked =localStorage.getItem("140px") == "true"? addFilter2(document.getElementById("140px")):false; 
    document.getElementById("280px").checked = localStorage.getItem("280px") == "true"? addFilter2(document.getElementById("280px")):false; 
    document.getElementById("100px").checked = localStorage.getItem("100px") == "true"? addFilter2(document.getElementById("100px")):false; 
    document.getElementById("200px").checked = localStorage.getItem("200px") == "true"? addFilter2(document.getElementById("200px")):false; 
     document.getElementById("440px").checked = localStorage.getItem("440px") == "true"? addFilter2(document.getElementById("440px")):false;
    document.getElementById("600px").checked = localStorage.getItem("600px") == "true"? addFilter2(document.getElementById("600px")):false; 

    document.getElementById("Canon").checked = localStorage.getItem("Canon") == "true"? addFilter2(document.getElementById("Canon")):false; 
    document.getElementById("NIKON").checked = localStorage.getItem("NIKON") == "true"? addFilter2(document.getElementById("NIKON")):false; 
    document.getElementById("DSLR").checked = localStorage.getItem("DSLR") == "true"? addFilter2(document.getElementById("DSLR")):false; 


    document.getElementById("max10").checked = localStorage.getItem("max10") == "true"? addFilter2(document.getElementById("max10")):false; 
    document.getElementById("max50").checked = localStorage.getItem("max50") == "true"? addFilter2(document.getElementById("max50")):false; 
    document.getElementById("max100").checked =localStorage.getItem("max100") == "true"? addFilter2(document.getElementById("max100")):false;  
    document.getElementById("max150").checked =localStorage.getItem("max150") == "true"? addFilter2(document.getElementById("max150")):false;  
    document.getElementById("max200").checked = localStorage.getItem("max200") == "true"? addFilter2(document.getElementById("max200")):false; 
    document.getElementById("max250").checked = localStorage.getItem("max250") == "true"? addFilter2(document.getElementById("max250")):false; 
    document.getElementById("max300").checked = localStorage.getItem("max300") == "true"? addFilter2(document.getElementById("max300")):false; 


    document.getElementById("romaniaFlickr").checked = localStorage.getItem("romaniaFlickr") == "true"? addFilter2(document.getElementById("romaniaFlickr")):false; 
    document.getElementById("europeFlickr").checked = localStorage.getItem("europeFlickr") == "true"? addFilter2(document.getElementById("europeFlickr")):false;
    document.getElementById("asiaFlickr").checked = localStorage.getItem("asiaFlickr") == "true"? addFilter2(document.getElementById("asiaFlickr")):false; 
    document.getElementById("africaFlickr").checked = localStorage.getItem("africaFlickr") == "true"? addFilter2(document.getElementById("africaFlickr")):false; 
    document.getElementById("south-americaFlickr").checked =localStorage.getItem( "south-americaFlickr") == "true"? addFilter2(document.getElementById("south-americaFlickr")):false;  
    document.getElementById("north-americaFlickr").checked = localStorage.getItem( "north-americaFlickr") == "true"? addFilter2(document.getElementById("north-americaFlickr")):false;
    document.getElementById("australiaFlickr").checked = localStorage.getItem( "australiaFlickr") == "true"? addFilter2(document.getElementById("australiaFlickr")):false; 
    document.getElementById("antarcticaFlickr").checked = localStorage.getItem( "antarcticaFlickr") == "true"? addFilter2(document.getElementById("antarcticaFlickr")):false;

    document.getElementById("inside").checked = localStorage.getItem( "inside") == "true"? addFilter2(document.getElementById("inside")):false;
    document.getElementById("outside").checked = localStorage.getItem( "outside") == "true"? addFilter2(document.getElementById("outside")):false; 
    document.getElementById("undefined").checked = localStorage.getItem( "undefined") == "true"? addFilter2(document.getElementById("undefined")):false;


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


    localStorage.setItem( "inside", document.getElementById("inside").checked);
    localStorage.setItem( "outside", document.getElementById("outside").checked);
    localStorage.setItem( "undefined", document.getElementById("undefined").checked);
    console.log("Saved!");
}

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
    document.getElementById('fullImage').src = image_url;
    document.getElementById('fullImageSource').href =  url;
    document.getElementById('fullImageTitle').textContent = name;
    document.getElementById('fullImageDescription').textContent = description;
    document.getElementById("fullscreen").style.display = "block";
}

function off() {
    document.getElementById("fullscreen").style.display = "none";
}


