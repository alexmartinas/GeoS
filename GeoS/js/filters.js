var filters = [];
var server = "500px";
var markers = [];
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
        requestFilters.tag = tag;
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
    console.log(photos);
    var infowindow = new google.maps.InfoWindow();
    var marker, i,j;
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    var image = new google.maps.MarkerImage(
        '../GeoS/img/photo-icon.png',
        new google.maps.Size(40, 40),
        new google.maps.Point(0, 0),
        new google.maps.Point(20, 20),
        new google.maps.Size(30, 30));

    for (i = 0, j = 0; i < photos.length; i++) {

        if (photos[i].latitude && photos[i].longitude) {
            markers[j++] = new google.maps.Marker({
                position: new google.maps.LatLng(photos[i].latitude, photos[i].longitude),
                map: map,
                icon: image
            });

            if (photos[i].location === null) {
                photos[i].location = 'Unknown';
            }

            var links = {image_url: photos[i].image_url, url: photos[i].url};
            google.maps.event.addListener(markers[i], 'click', (function(marker, i) {
                return function() {
                    var content = '<b>Source:</b>' + source + '<br>'+
                        '<b>Location:</b>' + photos[i].location + '<br><br>' +
                        '<img width="100" src="' + photos[i].image_url + '" onclick="on(\''+ photos[i].image_url  + '\',\'' + photos[i].url + '\')" /><br>';
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }
            })(markers[i], i));
        }
    }
}

function requestFlickrPhotos(tag) {

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
            target.setAttribute('data-type','checked');
            if (!filters[filter]){
                filters[filter] = {};
                filters[filter].value = filterValue;
                filters[filter].type = 'single';
            } else if (filters[filter].value !== filterValue) {
                filters[filter].value = filterValue;
            }
            var container = document.getElementById("selectedFilters");
            var filterElement = container.querySelector("div[data-filter='" + filter +"']");
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

