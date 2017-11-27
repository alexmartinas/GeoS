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
        target.parentNode.nextElementSibling.style.maxHeight = "500px";
        target.parentNode.nextElementSibling.style.marginBottom = "15px";
        target.parentNode.nextElementSibling.style.transition = "all 1s ease";
    }

}
//filters
var source = [];
var area = [];
var category = [];
var posted = [];
var dimension = [];

function addFilter(event){
    target = event.target;

    if (target.tagName === "INPUT"){
        console.log(target);
        var filterName = target.id[0].toUpperCase() + target.id.slice(1);
        var filter = target.getAttribute('data-filter');

        if (target.checked === true){
            if (filter === 'Source'){
                source.push(filterName);
            } else if (filter === "Area"){
                area.push(filterName);
            } else if (filter === "Category"){
                category.push(filterName);
            } else if (filter === "Dimension"){
                dimension.push(filterName);
            } else if (filter === "Posted") {
                posted.push(filterName);
            }
            addSelectedFilter(filter, filterName);
            target.setAttribute('data-type','checked');
        } else {
            var index;
            if (filter === 'Source'){
                index = source.indexOf(filterName);
                source.splice(index, 1);
            } else if (filter === "Area"){
                index = source.indexOf(filterName);
                area.splice(index, 1);
            } else if (filter === "Category"){
                index = source.indexOf(filterName);
                category.splice(index, 1);
            } else if (filter === "Dimension"){
                index = source.indexOf(filterName);
                dimension.splice(index, 1);
            } else if (filter === "Posted") {
                index = source.indexOf(filterName);
                posted.splice(index, 1);
            }
            removeSelectedFilter(filter + ":" + filterName);
            target.setAttribute('data-type','unchecked');
        }

        addRemoveAllButton();
        console.log(source,area,category,posted,dimension);

    }
}

function addRemoveAllButton(){
    var filters = source.length + area.length + category.length + posted.length + dimension. length;
    //create remove all filters button
    if (filters === 1 && !document.getElementById("removeAllFilters")){
        var container = document.getElementById("selectedFilters");
        var a = document.createElement("A");
        a.className = "remove-all-filters";
        a.href = '#'
        a.id = "removeAllFilters";
        a.textContent = "Remove all filters";
        a.style.order = 9999;
        container.appendChild(a);
    } else if(filters === 0){
        removeSelectedFilter("removeAllFilters");
    }
}

function addSelectedFilter(type,filter){
    var container = document.getElementById("selectedFilters");
    var div = document.createElement("DIV");
    div.className = "selected-filter";
    div.id = type + ":" + filter;
    div.textContent = type + ":" + filter;
    var i = document.createElement('I');
    i.className = "fa fa-close remove-filter";
    div.appendChild(i);
    container.appendChild(div);
}

function removeFilter(event){
    var target = event.target;

    //remove single filter
    if (target.tagName === "I"){
        var id = target.parentNode.id;
        var filter = id.split(':')[0];
        var filterName = id.split(':')[1];
        document.getElementById(filterName.toLowerCase()).checked = false;
        var index;
        if (filter === 'Source'){
            index = source.indexOf(filterName);
            source.splice(index, 1);
        } else if (filter === "Area"){
            index = source.indexOf(filterName);
            area.splice(index, 1);
        } else if (filter === "Category"){
            index = source.indexOf(filterName);
            category.splice(index, 1);
        } else if (filter === "Dimension"){
            index = source.indexOf(filterName);
            dimension.splice(index, 1);
        } else if (filter === "Posted") {
            index = source.indexOf(filterName);
            posted.splice(index, 1);
        }
        removeSelectedFilter(id);
        addRemoveAllButton();

    //remove all filters
    } if (target.tagName === 'A'){
        source = [];
        area = [];
        category = [];
        posted = [];
        dimension = [];
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

