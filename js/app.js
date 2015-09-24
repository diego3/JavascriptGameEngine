/**
 * 
 * 
 * canvas docs -> http://www.rgraph.net/reference/fillrect.html 
 * 
 * sobre game loop -> https://developer.mozilla.org/en-US/docs/Games/Anatomy
 */

window.onload = function() {
var A = 97;
var D = 100;
var S = 115;
var W = 119;
var BOOTSTRAP_GREEN = "#419641";
var BOOTSTRAP_RED   = "#d9534f";
var JQUERY_BLUE = "#25649F";

var GE_rect = function(x, y, w, h) {
    var x = x || 0;
    var y = y || 0;
    var width = w || 40;
    var height = h || 40;
    var speed = randomIntFromInterval(3, 10);
    var color = "#000000";
    
    this.update = function(delta) {
        console.log("y = " + y + " height = " + canvas.height);
        if(y >= canvas.height){
            console.log("passou por baixo");
            x = randomIntFromInterval(width, canvas.width - width);
            y = -50;
            speed = randomIntFromInterval(3, 10);
            color = colors[randomIntFromInterval(0, color.length-1)];
        }
        else if(y <= canvas.height){
            y += speed;
        }
        
    };
    
    this.render = function (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    };
    
    this.setColor = function(newColor){
        color = newColor;
    };
    
    this.getColor = function() {
        return this.color;
    };
};


    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    
    var objetos = [];
    var colors = [BOOTSTRAP_GREEN, BOOTSTRAP_RED, JQUERY_BLUE];
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
        
        for(var i =0; i< objetos.length; i++){
            objetos[i].update(delta);
        }
    };
    
    
    var render = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for(var i =0; i< objetos.length; i++){
            objetos[i].render(ctx);
        }
    };
    
    /**
     * Inicialização de todos os recursos do game.
     * criacao de objetos iniciais, imagens, sons etc...
     */
    var init = function() {
        var rec = new GE_rect(randomIntFromInterval(1, 800));
        objetos.push(rec);
        
        var rec2 = new GE_rect(randomIntFromInterval(1, 800));
        rec2.setColor("blue");
        objetos.push(rec2);
    };
    
    var start = function() {
        if(!requestId) {
            init();
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

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
} 