var app = app || {};
var hours;
var minutes;

document.addEventListener("deviceready", function() {
    function onStartSuccess(position) {
        startLat = position.coords.latitude;
        startLon = position.coords.longitude 
    }

    // onError Callback receives a PositionError object
    //
    function onStartError(error) {
        navigator.notification.alert('code: ' + error.code + '\n' +
                                     'message: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onStartSuccess, onStartError);
    
    (function(a) { 
        a.timeRun = {
            
            init:function(e) {
                var data = [];
                var startPosition = {"lat":startLat,"lon":startLon};
                data.push(startPosition);
                
                var vm = kendo.observable({
                    distance:"Run Distance",
                    
                    gpsDistance:function(lat1, lon1, lat2, lon2) {
                        // http://www.movable-type.co.uk/scripts/latlong.html
                        var R = 6371; // km
                        var dLat = (lat2 - lat1) * (Math.PI / 180);
                        var dLon = (lon2 - lon1) * (Math.PI / 180);
                        var lat1 = lat1 * (Math.PI / 180);
                        var lat2 = lat2 * (Math.PI / 180);

                        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
                        var d = R * c;
    
                        return d;
                    },     
                    
                    onSuccess:function(position) {
                        var currentLat = position.coords.latitude;
                        var currentLon = position.coords.longitude;
                        data.push({"lat":currentLat,"lon":currentLon});
                        var runDistance = vm.calculateCurrentDistance(data);
                        vm.set("distance", runDistance);
                    },
                    
                    calculateCurrentDistance:function(data) {
                        var totalDistance = 0;
                        if (data.length == 0) {
                            return 0;
                        }
                        else {
                            for (i = 0; i < data.length; i++) {
                                if (i == (data.length - 1)) {
                                    break;
                                }
                                totalDistance += vm.gpsDistance(data[i].lat, data[i].lon, data[i + 1].lat, data[i + 1].lon);
                            }
                        }
                        return totalDistance;
                    },
                
                    onError:
                    function (error) {
                        alert('code: ' + error.code + '\n' +
                              'message: ' + error.message + '\n');
                    },
                
                    getCurrentPosition
                    :function() {
                        navigator.geolocation.getCurrentPosition(vm.onSuccess, vm.onError);
                    }
                }
                );
                a.timeRun.timer = setInterval(vm.getCurrentPosition, 5000);            
                kendo.bind(e.view.element, vm, kendo.mobile.ui);     
            },
            close
            : function() { 
                clearInterval(distanceAPI.timer);
            },
            
            run
            : function() {
                var seconds = parseInt(document.getElementById("variable-seconds-input").value) || 0;
                var minutes = parseInt(document.getElementById("variable-minutes-input").value) || 0;
                var hours = parseInt(document.getElementById("variable-hours-input").value) || 0;
                var time = ((hours * 60) + minutes) * 60000 + seconds * 1000; //miliseconds
                var resultBox = document.getElementById("result-time");
                
                var currentTime = new Date().toLocaleTimeString().split(" ")[0];
                resultBox.innerHTML = 'Entered hours [  ' + hours + ' ], entered minutes [  ' + minutes + ' ] current time[' + currentTime + '] Total miliseconds [' +
                                      time + ' ]';
                
                setTimeout(a.timeRun.beep, time);
            },
            beep
            :function() {
                var resultBox = document.getElementById("result-time");
                resultBox.innerHTML = "Time finished!"
                navigator.notification.beep(10);
            }
        };
    }(app));
});