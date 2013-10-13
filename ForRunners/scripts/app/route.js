var app = app || {};

document.addEventListener("deviceready", function() {
    (function(a) { 
        a.routeTrack = {
            init:function(e) {
                var data = (JSON.parse(window.localStorage.getItem("History")))[0].rundata;
                var myLatLng = new google.maps.LatLng(data[0].lat, data[0].lon);

                // Google Map options
                var myOptions = {
                    zoom: 15,
                    center: myLatLng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                // Create the Google Map, set options
                var map = new google.maps.Map(document.getElementById("route-holder"), myOptions);

                var trackCoords = [];
    
                // Add each GPS entry to an array
                for (i=0; i < data.length; i++) {
                    trackCoords.push(new google.maps.LatLng(data[i].lat, data[i].lon));
                }
    
                // Plot the GPS entries as a line on the Google Map
                var trackPath = new google.maps.Polyline({
                    path: trackCoords,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                // Apply the line to the map
                trackPath.setMap(map);
            },
            navigate:function(){
                app.application.navigate("views/route-view.html#route-view")
            }
            
            
        };
    }(app));
});