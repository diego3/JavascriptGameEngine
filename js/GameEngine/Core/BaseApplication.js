

var BaseApplication = function(){
    this.IsRunning = false;
    this.RequestAnimId = 0;
    this.actors = [];
    this.GameViews = [];
    this.GameLogic = null;
    
    this.LastUpdate = 0;
    this.LastError = "";
};

BaseApplication.prototype.Initialize = function(){
    
    
    //initialize the canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');//Convas2DRenderer
    if(!ctx){
        this.LastError = "your browser do not support html5 canvas!";
        return false;
    }
    
    this.GameLogic = new BaseGameLogic();
    if(this.GameLogic === null){
        this.LastError = "GameLogic was not initialized";
    }
    
    return true;
};

BaseApplication.prototype.Start = function() {
    if(!this.RequestAnimId) {
        if(this.Initialize()){
            this.GameUpdate();
        }
        else{
            this.LastError = "Game Initialization error";
        }
    }
};

BaseApplication.prototype.StopFrame = function() {
    if(this.RequestAnimId){
        window.cancelAnimationFrame(this.RequestAnimId);
        this.RequestAnimId = undefined;
    }  
};

BaseApplication.prototype.GameUpdate = function(){
    var t = new Date().getTime();
    var delta = t - this.LastUpdate;
    this.Update(delta);
    this.Render();
    this.LastUpdate = new Date().getTime();
    this.RequestAnimId = window.requestAnimationFrame(this.GameUpdate);
};

BaseApplication.prototype.Update = function(fDeltaTime){
    for(var Actor in this.actors){
        Actor.Update(fDeltaTime);
    }
};