function collapseFilter(event){
    var target = event.target;
    var buttonClass = target.className;
    if (buttonClass === "fa fa-chevron-down collapse-button"){
        target.className = "fa fa-chevron-right collapse-button";
        target.parentNode.nextElementSibling.style.display = "none";
    } else {
        target.className = "fa fa-chevron-down collapse-button";
        target.parentNode.nextElementSibling.style.display = "block";

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
            removeSelectedFilter(filter + "-" + filterName);
        }

        console.log(source,area,category,posted,dimension);

    }
}

function addSelectedFilter(type,filter){
    var container = document.getElementById("selectedFilters");
    var div = document.createElement("DIV");
    div.className = "selected-filter";
    div.id = type + "-" + filter;
    div.textContent = filter;
    var i = document.createElement('I');
    i.className = "fa fa-close remove-filter";
    div.appendChild(i);
    container.appendChild(div);
}

function removeFilter(event){
    var target = event.target;
    if (target.tagName === "I"){
        var id = target.parentNode.id;
        var filter = id.split('-')[0];
        var filterName = id.split('-')[1];
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
    }

}

function removeSelectedFilter(id){
    var elm  = document.getElementById(id);
    elm.parentNode.removeChild(elm);
}
