(function(global) {  
    var CarViewModel,
        app = global.app = global.app || {};
    
    CarViewModel = kendo.data.ObservableObject.extend({
        carsDataSource: null,
        
        init: function () {
            var that = this,
                dataSource;
            
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "data/cars.json",
                        dataType: "json"
                    }
                }
            });
            
            that.set("carsDataSource", dataSource);           
        }        
    });  
    
    app.carsService = {
        viewModel: new CarViewModel()
    };
})(window);