(function(global) {  
    var HistoryViewModel,
        app = global.app = global.app || {};
    
    HistoryViewModel = kendo.data.ObservableObject.extend({
        historyDataSource: null,
        
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
        }        
    });  
    
    app.historyService = {
        viewModel: new HistoryViewModel()
    };
})(window);