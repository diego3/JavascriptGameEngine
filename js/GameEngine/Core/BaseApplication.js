

var BaseApplication = function(){
    this.IsRunning = false;
    this.RequestAnimId = 0;
    this.GameLogic = null;
    this.Renderer = null;
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
    this.Renderer = ctx;
    
    this.GameLogic = CreateGameAndView(); 
    if(this.GameLogic === null){
        this.LastError = "GameLogic was not initialized";
    }
    
    
    return true;
};

BaseApplication.prototype.CreateGameAndView = function(){
    var logic = new BaseGameLogic();
    var humanView = new HumanView(this.Renderer);
    logic.AddView(humanView);
    return logic;
};

BaseApplication.prototype.Start = function() {
    if(!this.RequestAnimId) {
        if(this.Initialize()){
            this.GameLoop();
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

BaseApplication.prototype.GameLoop = function(){
    var t = new Date().getTime();
    var delta = t - this.LastUpdate;
    this.UpdateFrame(delta);
    this.RenderFrame();
    this.LastUpdate = new Date().getTime();
    this.RequestAnimId = window.requestAnimationFrame(this.GameLoop);
};

BaseApplication.prototype.UpdateFrame = function(fDeltaTime){
    /*for(var Actor in this.actors){
        Actor.Update(fDeltaTime);
    }*/
};

BaseApplication.prototype.RenderFrame = function(){
    
};