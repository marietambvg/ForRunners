/*(function(global) {  
var HistoryViewModel,
app = global.app = global.app || {};
    
HistoryViewModel = kendo.data.ObservableObject.extend({
historyDataSource: null,
historyIsSelectable:true,
        
init: function () {
var that = this,
dataSource;
            
kendo.data.ObservableObject.fn.init.apply(that, []);
            
dataSource = window.localStorage.getItem("History");
if(dataSource){
dataSource=JSON.parse(dataSource);
} else{
dataSource=new Array();
}
            
that.set("historyDataSource", dataSource);  
that.set("historyIsSelectable", true);
}        
});  
    
app.historyService = {
viewModel: new HistoryViewModel()
};
})(window);*/
var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        runs:[],
        selectedRunData:[],
        change:onCategoryChanged
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel,kendo.mobile.ui);
        //var data = (JSON.parse(window.localStorage.getItem("History")))[0].rundata;
        var history = (JSON.parse(window.localStorage.getItem("History")));
        
        viewModel.set("runs", history);            
    }
    
    function onCategoryChanged(e) {             
        console.log(e.srcElement);
        //var runData=e.sender._selectedValue;
        //viewModel.set("selectedRunData", runData);
    }
    
    a.runs = {
        init:init          
    };
}(app));