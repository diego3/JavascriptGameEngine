
var A = 97;
var D = 100;
var S = 115;
var W = 119;

window.onload = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    //console.log(ctx);
    
    
    var requestId;
    var lastUpdate;
    var loop = function() {
        var t = new Date().getTime();
        var delta = t - lastUpdate;
        update(delta);
        render();
        lastUpdate = new Date().getTime();
        requestId = window.requestAnimationFrame(loop);
    };
    
    
    var update = function (delta) {
        console.log("delta", delta);
        
    };
    
    
    var render = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
    };
    
    var start = function(){
        if(!requestId){
            loop();
        }
    };
    
    var stop = function() {
       if(requestId){
           window.cancelAnimationFrame(requestId);
           requestId = undefined;
       }  
    };
    
    document.getElementById("start").addEventListener("click", function(){
       start(); 
    });
    document.getElementById("stop").addEventListener("click", function(){
       stop();
    });
};