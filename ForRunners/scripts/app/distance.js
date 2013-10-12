var app = app || {};

(function(a) {
    /*var states = null;
    function initStates() {
    states = {};
    states[Connection.UNKNOWN] = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI] = 'WiFi';
    states[Connection.CELL_2G] = 'Cell 2G';
    states[Connection.CELL_3G] = 'Cell 3G';
    states[Connection.CELL_4G] = 'Cell 4G';
    states[Connection.CELL] = 'Cell generic';
    states[Connection.NONE] = 'No network';
    }*/
    var distanceAPI = {
        init: function(e) {
            /*if (!states) {
            initStates();
            }*/
            var vm = kendo.observable({
                distance:"Run Distance",
                               
                onSuccess:function(position) {
                    var position = ('Latitude: ' + position.coords.latitude + '\n' +
                                    'Longitude: ' + position.coords.longitude + '\n' +
                                    'Altitude: ' + position.coords.altitude + '\n' +
                                    'Accuracy: ' + position.coords.accuracy + '\n' +
                                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                                    'Heading: ' + position.coords.heading + '\n' +
                                    'Speed: ' + position.coords.speed + '\n' +
                                    'Timestamp: ' + position.timestamp + '\n');
                    vm.set("distance", position);
                },
                
                onError:function (error) {
                    alert('code: ' + error.code + '\n' +
                          'message: ' + error.message + '\n');
                },
                
                getCurrentPosition:function() {
                    navigator.geolocation.getCurrentPosition(onSuccess, onError);
                }
            });
            
            distanceAPI.timer = setInterval(vm.getCurrentPosition, 5000);            
            kendo.bind(e.view.element, vm, kendo.mobile.ui);       
        },
        close: function() {
            clearInterval(distanceAPI.timer);
        }
    }
    
    a.distanceApi = distanceAPI;
}(app));