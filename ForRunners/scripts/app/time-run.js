var app = app || {};

document.addEventListener("deviceready", function() {
    var totalRun = 0;
    var data = [];
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    
    function onStartSuccess(position) {
        startLat = position.coords.latitude;
        startLon = position.coords.longitude;
    }

    
    function onStartError(error) {
        navigator.notification.alert('code: ' + error.code + '\n' +
                                     'message: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onStartSuccess, onStartError);
    
    (function(a) { 
        a.timeRun = {
            init:function(e) {
                //ar data = [];
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
                        totalRun = runDistance;
                        vm.set("distance", runDistance + " km.");
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
                        return totalDistance.toFixed(2);
                    },
                
                    onError: function (error) {
                        navigator.notification.alert('code: ' + error.code + '\n' +
                                                     'message: ' + error.message + '\n');
                    },
                
                    getCurrentPosition:function() {
                        navigator.geolocation.getCurrentPosition(vm.onSuccess, vm.onError);
                    }
                });
                
                a.timeRun.timer = setInterval(vm.getCurrentPosition, 5000);
                
                kendo.bind(e.view.element, vm, kendo.mobile.ui);
            },
            
            close: function() { 
            },
            
            run: function() {
                seconds = parseInt(document.getElementById("variable-seconds-input").value) || 0;
                minutes = parseInt(document.getElementById("variable-minutes-input").value) || 0;
                hours = parseInt(document.getElementById("variable-hours-input").value) || 0;
                time = ((hours * 60) + minutes) * 60000 + seconds * 1000; //miliseconds
                
                setTimeout(function () {
                    a.timeRun.beep(hours, minutes, seconds);
                }, time);
            },
            
            beep: function(hours, minutes, seconds) {
                navigator.notification.beep(1); 
                var totalDistance = parseFloat(totalRun);
                //calculate time;
                var totalMinutes = (hours * 60 + minutes + seconds / 60);
                if (totalMinutes != 0) {
                    var averageSpeed = ((totalDistance * 60) / totalMinutes).toFixed(2) + " km/hour";
                }
                else {
                    averageSpeed = "0 km/hour"
                }
                
                var viewModel = kendo.observable({
                    isVisible:true,
                    distanceResult:0,
                    speed:0,
                    time:"",
                    isInvisible:true
                    
                });
                          
                kendo.bind($("#results"), viewModel, kendo.mobile.ui); 
                kendo.bind($("#current-distance"), viewModel, kendo.mobile.ui);
                viewModel.set("isInvisible", true);
                viewModel.set("isVisible", true);
                viewModel.set("speed", averageSpeed);
                viewModel.set("distanceResult", totalDistance + " km.");
                viewModel.set("time", "Time is finished!");
                clearInterval(a.timeRun.timer);
            },
            
            save:function() {
                var currentRun = {
                    "name":new Date().toDateString() + "/" + new Date().getMilliseconds(),
                    "distance":totalRun,
                    "hours":hours,
                    "minutes":minutes,
                    "seconds":seconds,
                }
                var localStorageData = new Array();
                localStorageData.push(currentRun);
                if (window.localStorage.getItem("History")) {
                    var history = window.localStorage.getItem("History");
                    var historyArray = JSON.parse(history);
                    historyArray.push(currentRun);
                    window.localStorage.setItem("History", JSON.stringify(historyArray));
                }
                else {
                    window.localStorage.setItem("History", JSON.stringify(localStorageData)); 
                }
            }
        };
    }(app));
});