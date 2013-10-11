var app = app || {};
var hours;
var minutes;

document.addEventListener("deviceready", function() {
    (function(a) {   
        a.timeRun = {
            
            init:function() {
            },
            close: function() {            
            },
            run: function() {
                var that=this;
                var seconds = parseInt(document.getElementById("variableSecondsInput").value) || 0;
                var minutes = parseInt(document.getElementById("variableMinutesInput").value) || 0;
                var hours = parseInt(document.getElementById("variableHoursInput").value) || 0;
                var time = ((hours * 60) + minutes) * 60000+seconds*1000; //miliseconds
                var resultBox = document.getElementById("result");
                
                var currentTime = new Date().toLocaleTimeString().split(" ")[0];
                resultBox.innerHTML = 'Entered hours [  ' + hours + ' ], entered minutes [  ' + minutes + ' ] current time[' + currentTime + '] Total miliseconds [' +
                                      time + ' ]';
                
                setTimeout (a.timeRun.beep, time);

            },
            beep:function(){
                var resultBox = document.getElementById("result");
                resultBox.innerHTML="Time finished!"
                navigator.notification.beep(10);
            }
            
        };
    }(app));
});