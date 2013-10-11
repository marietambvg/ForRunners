var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        categories:[],
        selectedCategory:null,
        change:onCategoryChanged
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
        httpRequest.getJSON("http://localhost:62354/api/" + "categories")
        .then(function (categories) {
            viewModel.set("categories", categories);            
        });        
    }
    
    function onCategoryChanged(e) {             
        console.log(e.sender._selectedValue);
        
        httpRequest.getJSON("http://localhost:62354/api/" + "categories/" + e.sender._selectedValue)
        .then(function(category) {
            viewModel.set("selectedCategory", category);
            console.log(category);
        });
    }
    
    a.categories = {
        init:init          
    };
}(app));