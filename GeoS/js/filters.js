var filters = [];
var server = "500px";
var markers = [];
var flickrPhotos = [];
var counter = 0;
var flickrPlacesLocation = {
    "21,44,27,48": {
        "latitude" : "45.946",
        "longitude" : "24.980"
    },
    "-22,36,40,71": {
        "latitude" : "52.976",
        "longitude" : "7.857"
    },
    "58,0,175,78": {
        "latitude" : "34.969",
        "longitude" : "99.819"
    },
    "-20,-34,56,36": {
        "latitude" : "2.070",
        "longitude" : "15.800"
    },
    "-80,-55,-36,15": {
        "latitude" : "-23.030",
        "longitude" : "-67.903"
    },
    "-163,0,-24,84": {
        "latitude" : "44.330",
        "longitude" : "-109.754"
    },
    "106,-43,178,0": {
        "latitude" : "-30.941",
        "longitude" : "140.810"
    },
    "-180,-84,180,-63": {
        "latitude" : "-81.500",
        "longitude" : "0.000"
    }
};
function searchPhotos(event) {
    var text = document.getElementById('tag').value;
    if (server === '500px') {
        request500pxPhotos(text);
    } else if (server === 'flickr') {
        requestFlickrPhotos(text);
    } else if (server === 'instagram') {
        requestInstagramPhotos(text);
    }

}

function request500pxPhotos(tag) {
    console.log(filters);
    var requestFilters = {};
    requestFilters.rpp = 40;
    if (filters['geo'] && filters['geo'].value) {
        requestFilters.geo = filters['geo'].value;
    }
    if (filters['image_size'] && filters['image_size'].value) {
        requestFilters.image_size = filters['image_size'].value;
    }
    if (filters['only'] && filters['only'].value) {
        requestFilters.only = filters['only'].value;
    }
    if (filters['was_featured_type'] && filters['was_featured_type'].value) {
        requestFilters.was_featured_type = filters['was_featured_type'].value;
    }
    if (tag && tag !== "") {
        requestFilters.term = tag;
    }

    _500px.api('/photos/search', requestFilters, function (response) {
        if (response.success) {
            displayPhotosFrom500px(response.data.photos,'500px');
        } else {
            alert("500px server is unavailable for the moment!")
        }
    });
}

function displayPhotosFrom500px(photos,source) {
    var marker, i,j;
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    var image = new google.maps.MarkerImage(
        '../GeoS/img/photo-icon.png',
        new google.maps.Size(40, 40),
        new google.maps.Point(0, 0),
        new google.maps.Point(20, 20),
        new google.maps.Size(30, 30));

    var ok;
    //filtering photos by camera and focal length
    if (filters['camera'] && filters['camera'].value){
        for ( i = 0; i < photos.length; i++) {
            if (photos[i].camera!==null){
                ok = 0;
                if ((filters['camera'].value[0] && photos[i].camera.indexOf(filters['camera'].value[0]) >= 0) ||
                    (filters['camera'].value[1] && photos[i].camera.indexOf(filters['camera'].value[1]) >= 0) ||
                    (filters['camera'].value[2] && photos[i].camera.indexOf(filters['camera'].value[2]) >= 0) ) {
                    ok = 1;
                }
                if (ok === 0) {
                    photos.splice(i--,1);
                }
            } else {
                photos.splice(i--,1);
            }
        }
    }

    if (filters['focal_length']) {
        for ( i = 0; i < photos.length; i++) {
            if (filters['focal_length'].value < parseInt( photos[i].focal_length) || photos[i].focal_length === null  ){
                photos.splice(i--,1);
            }
        }
    }

    if (filters['geo']) {
        var location = filters['geo'].value.split(',');
        map.setCenter({lat:parseFloat(location[0]),lng:parseFloat(location[1])});
        map.setZoom(3);
    } else {
        map.setCenter( {lat:0, lng:30.644});
        map.setZoom(3);
    }

    for (i = 0, j = 0; i < photos.length; i++) {
        console.log(photos[i]);
        if (photos[i].latitude && photos[i].longitude) {
            markers[j] = new google.maps.Marker({
                position: new google.maps.LatLng(photos[i].latitude, photos[i].longitude),
                map: map,
                icon: image
            });

            if (!photos[i].location_details) {
                photos[i].location_details = {};
                photos[i].location_details.city = 'Unknown';
            }
            if (!photos[i].description) {
                photos[i].description = "";
            }

            google.maps.event.addListener(markers[j], 'click', (function(marker, i) {
                return function() {
                    var image_url = "https://500px.com" + photos[i].url;
                    var content = '<b>Source:</b>' + source + '<br>'+
                        '<b>Location:</b>' + photos[i].location_details.city + '<br><br>' +
                        '<img width="100" style="cursor: pointer" src="' + photos[i].image_url + '" onclick="on(\''+ photos[i].image_url  + '\',\'' + photos[i].name + '\',\'' +  photos[i].description + '\',\'' + image_url + '\')" /><br>';
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }
            })(markers[j++], i));
        }
    }
}

function requestFlickrPhotos(tag) {
    console.log(filters);
    var requestFilters = {};
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c488edfbf44a6cff76eea3da194338cb&format=json&nojsoncallback=1";

    if (filters['bbox'] && filters['bbox'].value) {
        url = url + "&bbox=" + filters['bbox'].value;
    }
    if (filters['geo_context'] && filters['geo_context'].value) {
        url = url + "&geo_context=" + filters['geo_context'].value;
    }
    if (filters['min_taken_date'] && filters['min_taken_date'].value) {
        url = url + "&min_taken_date=" + filters['min_taken_date'].value;
    }
    if (filters['min_upload_date'] && filters['min_upload_date'].value) {
        url = url + "&min_upload_date=" + filters['min_upload_date'].value;
    }
    if (tag && tag !== "") {
        url = url + "&text=" + tag;
    }

    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onloadend = function () {
        var photos = JSON.parse(request.response).photos;
        if (photos.total === "0") {
            alert("No results found");
        }
        photos = photos.photo;
        flickrPhotos = [];
        for(var i = 0; i < photos.length; i++) {
            var photoId = photos[i].id;
            var farm = photos[i].farm;
            var secret = photos[i].secret;
            var server = photos[i].server;

            flickrPhotos[photoId] = {};
            flickrPhotos[photoId].title = photos[i].title;
            var size = filters['flickr_image_size'] ? filters['flickr_image_size'].value : 'z';
            flickrPhotos[photoId].url = "https://farm" + farm + ".staticflickr.com/" + server + "/" + photoId + "_" + secret + "_" + size + ".jpg";
            flickrPhotos[photoId].source = "https://www.flickr.com/photos/" + photos[i].owner + "/" + photoId;
        }
        getFlickrPhotosLocation(photos);
    }
}

function getFlickrPhotosLocation(photos) {
    var request;
    counter = 0;
    for (var i = 0; i < photos.length; i++) {
        request = new XMLHttpRequest();
        request.onloadend = function () {
            counter ++;
            if (this.responseText.stat !== 'fail') {
                var response = JSON.parse(this.responseText);
                flickrPhotos[response.photo.id].location = response.photo.location;
            }
            if (counter === photos.length) {
                displayPhotosFromFlickr();
            }
        };
        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=c488edfbf44a6cff76eea3da194338cb&format=json&nojsoncallback=1&photo_id=" + photos[i].id;
        request.open("GET", url);
        request.send();
    }
}

function displayPhotosFromFlickr(){
    var marker, i,j;
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    google.maps.event.clearListeners(map, 'click');
    var image = new google.maps.MarkerImage(
        '../GeoS/img/photo-icon.png',
        new google.maps.Size(40, 40),
        new google.maps.Point(0, 0),
        new google.maps.Point(20, 20),
        new google.maps.Size(30, 30));

    if (filters['bbox'] && filters['bbox'].value ) {
        var lat = flickrPlacesLocation[filters['bbox'].value]['latitude'];
        var lng = flickrPlacesLocation[filters['bbox'].value]['longitude'];
        map.setCenter({lat:parseFloat(lat),lng:parseFloat(lng)});
        map.setZoom(3);
    } else {
        map.setCenter( {lat:0, lng:30.644});
        map.setZoom(3);
    }

    var keys = Object.keys(flickrPhotos);
    for (i = 0, j = 0; i < keys.length; i++) {
        if (flickrPhotos[keys[i]].location && flickrPhotos[keys[i]].location.locality) {
            markers[j] = new google.maps.Marker({
                position: new google.maps.LatLng(flickrPhotos[keys[i]].location.latitude, flickrPhotos[keys[i]].location.longitude),
                map: map,
                icon: image
            });
            google.maps.event.addListener(markers[j], 'click', (function(marker, i) {
                return function() {
                    var location = flickrPhotos[keys[i]].location.locality._content;
                    var content = '<b>Source:</b>' + "Flickr" + '<br>'+
                        '<b>Location:</b>' + location + '<br><br>' +
                        '<img width="100" style="cursor: pointer" src="' + flickrPhotos[keys[i]].url + '" onclick="on(\''+ flickrPhotos[keys[i]].url  + '\',\'' + flickrPhotos[keys[i]].title + '\',\'' +  "" + '\',\'' + flickrPhotos[keys[i]].source + '\')" /><br>';
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }
            })(markers[j++], i));
        }
    }
}

function requestInstagramPhotos(tag) {

}

function displayFilters(event) {
    var target = event.target;
    var instagram = document.getElementById('instagram-filters');
    var flickr = document.getElementById('flickr-filters');
    var px = document.getElementById('500px-filters');

    if (target.getAttribute('data-type') === 'unchecked'){
        if (target.id === '500px') {
            px.style.display = 'block';
            px.setAttribute('data-type','checked');

            instagram.style.display = 'none';
            instagram.setAttribute('data-type','unchecked');

            flickr.style.display = 'none';
            flickr.setAttribute('data-type','unchecked');
            server = '500px';
        } else if (target.id === 'flickr') {
            px.style.display = 'none';
            px.setAttribute('data-type','unchecked');

            instagram.style.display = 'none';
            instagram.setAttribute('data-type','unchecked');

            flickr.style.display = 'block';
            flickr.setAttribute('data-type','checked');
            server = 'flickr';
        } else if (target.id === 'instagram') {
            px.style.display = 'none';
            px.setAttribute('data-type','unchecked');

            instagram.style.display = 'block';
            instagram.setAttribute('data-type','checked');

            flickr.style.display = 'none';
            flickr.setAttribute('data-type','unchecked');
            server = 'instagram';
        }

        //remove seleted filters
        filters=[];
        var container = document.getElementById("filtersContainer");
        input = container.querySelector("input[data-type='checked']");
        while (input) {
            input.checked = false;
            input.setAttribute('data-type','unchecked');
            input = container.querySelector("input[data-type='checked']");
        }
        container = document.getElementById("selectedFilters");
        container.innerHTML = "";
    }
}

function collapseFilter(event){
    var target = event.target;
    var buttonClass = target.className;
    if (buttonClass === "fa fa-chevron-down collapse-button"){
        target.className = "fa fa-chevron-right collapse-button";
        target.parentNode.nextElementSibling.style.opacity = "0";
        target.parentNode.nextElementSibling.style.maxHeight = "0";
        target.parentNode.nextElementSibling.style.marginBottom = "-10px";
    } else {
        target.className = "fa fa-chevron-down collapse-button";
        target.parentNode.nextElementSibling.style.opacity = "1";
        target.parentNode.nextElementSibling.style.maxHeight = "10rem";
        target.parentNode.nextElementSibling.style.marginBottom = "15px";
        target.parentNode.nextElementSibling.style.transition = "all 1s ease";
    }

}

function addFilter(event){
    var target = event.target;
    var filter = target.getAttribute('data-filter');
    var filterValue = target.getAttribute('data-value');
    var filterText = target.getAttribute('data-text');
    if (target.tagName === "INPUT" && target.getAttribute('type') === 'radio'){
        if (target.getAttribute('data-type') === 'unchecked'){
            var container = document.getElementById(filter);
            var filterElement = container.querySelector("input[data-type='checked']");
            if (filterElement) {
                filterElement.setAttribute('data-type','unchecked');
            }
            target.setAttribute('data-type','checked');
            if (!filters[filter]){
                filters[filter] = {};
                filters[filter].value = filterValue;
                filters[filter].type = 'single';
            } else if (filters[filter].value !== filterValue) {
                filters[filter].value = filterValue;
            }
            container = document.getElementById("selectedFilters");
            filterElement = container.querySelector("div[data-filter='" + filter +"']");
            if (!filterElement) {
                addSelectedFilter(filter,filterText);
            } else {
                filterElement.textContent = filterText;
                filterElement.id = filterText;
                var i = document.createElement('I');
                i.className = "fa fa-close remove-filter";
                filterElement.appendChild(i);
            }
            addRemoveAllButton();
        } else {
            target.setAttribute('data-type','unchecked');
            target.checked = false;
            filters[filter].value = null;
            removeSelectedFilter(filterText);
            if (document.getElementsByClassName('selected-filter').length === 0) {
                removeSelectedFilter('removeAllFilters')
            }
        }

    } else if (target.tagName === "INPUT" && target.getAttribute('type') === 'checkbox') {
        if (target.getAttribute('data-type') === 'unchecked') {
            target.setAttribute('data-type','checked');
            if (!filters[filter]){
                filters[filter] = {};
                filters[filter].value = [];
                filters[filter].value.push(filterValue);
                filters[filter].type = 'multiple';
            } else {
                filters[filter].value.push(filterValue);
            }
            addSelectedFilter(filter,filterText);
            addRemoveAllButton();
        } else {
            target.setAttribute('data-type','unchecked');
            target.checked = false;
            var index = filters[filter].value.indexOf(filterValue);
            filters[filter].value.splice(index, 1);
            removeSelectedFilter(filterText);
            if (document.getElementsByClassName('selected-filter').length === 0) {
                removeSelectedFilter('removeAllFilters')
            }
        }
    }
}


function addFilter2(input){
    var target = input;
    var filter = target.getAttribute('data-filter');
    var filterValue = target.getAttribute('data-value');
    var filterText = target.getAttribute('data-text');
    if (target.tagName === "INPUT" && target.getAttribute('type') === 'radio'){
        if (target.getAttribute('data-type') === 'unchecked'){
            var container = document.getElementById(filter);
            var filterElement = container.querySelector("input[data-type='checked']");
            if (filterElement) {
                filterElement.setAttribute('data-type','unchecked');
            }
            target.setAttribute('data-type','checked');
            if (!filters[filter]){
                filters[filter] = {};
                filters[filter].value = filterValue;
                filters[filter].type = 'single';
            } else if (filters[filter].value !== filterValue) {
                filters[filter].value = filterValue;
            }
            container = document.getElementById("selectedFilters");
            filterElement = container.querySelector("div[data-filter='" + filter +"']");
            if (!filterElement) {
                addSelectedFilter(filter,filterText);
            } else {
                filterElement.textContent = filterText;
                filterElement.id = filterText;
                var i = document.createElement('I');
                i.className = "fa fa-close remove-filter";
                filterElement.appendChild(i);
            }
            addRemoveAllButton();
        } else {
            target.setAttribute('data-type','unchecked');
            target.checked = false;
            filters[filter].value = null;
            removeSelectedFilter(filterText);
            if (document.getElementsByClassName('selected-filter').length === 0) {
                removeSelectedFilter('removeAllFilters')
            }
        }

    } else if (target.tagName === "INPUT" && target.getAttribute('type') === 'checkbox') {
        if (target.getAttribute('data-type') === 'unchecked') {
            target.setAttribute('data-type','checked');
            if (!filters[filter]){
                filters[filter] = {};
                filters[filter].value = [];
                filters[filter].value.push(filterValue);
                filters[filter].type = 'multiple';
            } else {
                filters[filter].value.push(filterValue);
            }
            addSelectedFilter(filter,filterText);
            addRemoveAllButton();
        } else {
            target.setAttribute('data-type','unchecked');
            target.checked = false;
            var index = filters[filter].value.indexOf(filterValue);
            filters[filter].value.splice(index, 1);
            removeSelectedFilter(filterText);
            if (document.getElementsByClassName('selected-filter').length === 0) {
                removeSelectedFilter('removeAllFilters')
            }
        }
    }
    return true;
}

function addRemoveAllButton(){
    //create remove all filters button
    if (!document.getElementById("removeAllFilters")){
        var container = document.getElementById("selectedFilters");
        var a = document.createElement("A");
        a.className = "remove-all-filters";
        a.href = '#';
        a.id = "removeAllFilters";
        a.textContent = "Remove all filters";
        a.style.order = 9999;
        container.appendChild(a);
    }
}

function addSelectedFilter(filter,filterText){
    var container = document.getElementById("selectedFilters");
    var div = document.createElement("DIV");
    div.className = "selected-filter";
    div.setAttribute('data-filter',filter);
    div.id = filterText;
    div.textContent = filterText;
    var i = document.createElement('I');
    i.className = "fa fa-close remove-filter";
    div.appendChild(i);
    container.appendChild(div);
}

function removeFilter(event){
    var target = event.target;
    //remove single filter
    if (target.tagName === "I"){
        var parent = target.parentNode;
        var filter = parent.getAttribute('data-filter');
        var id = parent.id;
        var input = document.querySelector("input[data-text='" + id + "']");
        input.checked = false;
        input.setAttribute('data-type','unchecked');
        removeSelectedFilter(parent.id);
        if (filters[filter].type === 'single') {
            filters[filter].value = null;
        } else {
            var index = filters[filter].value.indexOf(input.getAttribute('data-value'));
            filters[filter].value.splice(index, 1);
        }
        if (document.getElementsByClassName('selected-filter').length === 0) {
            removeSelectedFilter('removeAllFilters')
        }
    //remove all filters
    } if (target.tagName === 'A'){
        filters = [];
        var container = document.getElementById("filtersContainer");
        input = container.querySelector("input[data-type='checked']");
        while (input) {
            input.checked = false;
            input.setAttribute('data-type','unchecked');
            input = container.querySelector("input[data-type='checked']");
        }
        container = document.getElementById("selectedFilters");
        container.innerHTML = "";
    }

}

function removeSelectedFilter(id){
    var elm  = document.getElementById(id);
    elm.parentNode.removeChild(elm);
}

function closeFilters(){
    var elm = document.getElementsByClassName("filters")[0];
    elm.className = "filters filtersAnim";
    elm = document.getElementById("close-filter-menu");
    elm.style.display = "none";

    elm = document.getElementsByClassName("map-container")[0];
    elm.style.position = "absolute";
    elm.style.width = "100%";

    elm = document.getElementById("open-filters-menu");
    elm.style.display = "block";
}

function openFilters(){
    var elm = document.getElementsByClassName("filters")[0];
    elm.className = "filters filtersAnim2";
    elm = document.getElementById("close-filter-menu");
    elm.style.display = "block";

    elm = document.getElementsByClassName("map-container")[0];
    elm.style.position = "relative";
    elm.style.width = "83%";

    elm = document.getElementById("open-filters-menu");
    elm.style.display = "none";
}

function setDateToday(){
    var elm1 = document.getElementById('todayFlickrUploaded');
    var elm2 = document.getElementById('todayFlickrTaken');
    elm1.setAttribute('data-value',new Date());
    elm2.setAttribute('data-value',new Date());
}

function setDateWeek(){
    var elm1 = document.getElementById('lastWeekFlickrUploaded');
    var elm2 = document.getElementById('lastWeekFlickrTaken');
    elm1.setAttribute('data-value',new Date(new Date().getTime() - (60*60*24*7*1000)))
    elm2.setAttribute('data-value',new Date(new Date().getTime() - (60*60*24*7*1000)))
}

function setDateMonth(){
    var elm1 = document.getElementById('lastMonthFlickrUploaded');
    var elm2 = document.getElementById('lastMonthFlickrTaken');
    elm1.setAttribute('data-value',new Date(new Date().getTime() - (60*60*24*30*1000)))
    elm2.setAttribute('data-value',new Date(new Date().getTime() - (60*60*24*30*1000)))
}

function setDateYear(){
    var elm1 = document.getElementById('lastYearFlickrUploaded');
    var elm2 = document.getElementById('lastYearFlickrTaken');
    elm1.setAttribute('data-value',new Date(new Date().getTime() - (60*60*24*365*1000)))
    elm2.setAttribute('data-value',new Date(new Date().getTime() - (60*60*24*365*1000)))
}


