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
var time = [];
var dimension = [];

function addFilter(event){
    target = event.target;
    if (target.tagName === "INPUT"){
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
            } else if (filter === "Time") {
                time.push(filterName);
            }
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
            } else if (filter === "Time") {
                index = source.indexOf(filterName);
                time.splice(index, 1);
            }
        }

        console.log(source,area,category,time,dimension);

    }
}
