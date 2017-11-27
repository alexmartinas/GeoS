
/* Google Map */
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });


    var locations = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    var image = new google.maps.MarkerImage(
        '/img/photo-icon.png',
        new google.maps.Size(40, 40),
        new google.maps.Point(0, 0),
        new google.maps.Point(20, 20),
        new google.maps.Size(30, 30));

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: image
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                var content = '<b>Source:</b> 500px<br>'+
                              '<b>Location:</b> Australia<br><br>' +
                              '<img onclick="on()" width="100" src="/img/Pictures/sample_img1.jpg"/><br>';
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
/*----------------------*/

function on() {
    document.getElementById("fullscreen").style.display = "block";
}

function off() {
    document.getElementById("fullscreen").style.display = "none";
}
