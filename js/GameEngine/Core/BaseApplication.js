

var BaseApplication = function(){
    this.IsRunning = false;
    this.IsInitialized = false;
    this.RequestAnimId = 0;
    this.GameLogic = null;
    this.Renderer = null;
    this.EventManager = null;
    this.LastUpdate = 0;
    this.LastError = "";
    
};

BaseApplication.prototype.CreateGameAndView = function(){
    var logic = new BaseGameLogic();
    var humanView = new HumanView(this.Renderer);
    logic.AddView(humanView);
    return logic;
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
    
    this.GameLogic = this.CreateGameAndView(); 
    if(this.GameLogic === null){
        this.LastError = "GameLogic was not initialized";
    }
    
    //create the EventManager over here
    this.EventManager = new EventManager();
    g_evtMgr = this.EventManager;
    
    InputManager.Init();
    
    this.RegisterDelegates();
    
    this.IsInitialized = true;
    return true;
};

BaseApplication.prototype.RegisterDelegates = function(){
    g_evtMgr.Register(GameEvent.START_GAME, MAKEDELEGATE(this, Start));
    
};

//BaseApplication.prototype.
var Start = function() {
    if(!this.RequestAnimId) {
        if(this.IsInitialized){
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

BaseApplication.prototype.UpdateFrame = function(fDeltaTime){
    console.log("UpdateFrame", fDeltaTime);
    /*for(var Actor in this.actors){
        Actor.Update(fDeltaTime);
    }*/
};

BaseApplication.prototype.RenderFrame = function(fDeltaTime){
    console.log("RenderFrame", fDeltaTime);
    
};

BaseApplication.prototype.GameLoop = function(){
    var t = new Date().getTime();
    var delta = t - g_GameApp.LastUpdate;
    g_GameApp.UpdateFrame(delta);
    g_GameApp.RenderFrame(delta);
    g_GameApp.LastUpdate = new Date().getTime();
    g_GameApp.RequestAnimId = window.requestAnimationFrame(g_GameApp.GameLoop);
};



