

/* global g_GameApp, InputManager, GameEvent, EditorEvent, GameView */

var BaseApplication = function(){
    this.IsRunning = false;
    this.IsInitialized = false;
    this.RequestAnimId = 0;
    this.GameLogic = null;
    this.Renderer = null;
    this.EventManager = null;
    this.LastUpdate = 0;
    this.LastError = "";
    
    this.gameOptions = [];
};

BaseApplication.prototype.CreateGameAndView = function(){
    var logic = new BaseGameLogic();
    logic.Init();
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
        return false;
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
    g_evtMgr.Register(EditorEvent.START_GAME, MAKEDELEGATE(this, StartGameDelegate));
    g_evtMgr.Register(EditorEvent.PAUSE_GAME, MAKEDELEGATE(this, StopFrameDelegate));
    g_evtMgr.Register(EditorEvent.ADVANCE_FRAME, MAKEDELEGATE(this, AdvanceOneFrameDelegate));
    
};

//BaseApplication.prototype.
var StartGameDelegate = function() {
    console.log("start game delegated successfully");
    if(!this.RequestAnimId) {
        if(this.IsInitialized){
            this.GameLoop();
        }
        else{
            this.LastError = "Game Initialization error";
        }
    }
};

//BaseApplication.prototype.
var StopFrameDelegate = function() {
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
    
    //g_evtMgr.Update(20);
    
    //this.socketManager.Update();
    
    this.GameLogic.Update(fDeltaTime);
};

BaseApplication.prototype.RenderFrame = function(fDeltaTime){
    console.log("RenderFrame", fDeltaTime);
    
    var viewList = g_GameApp.GameLogic.gameViewList;
    for(var i=0; i < viewList.length; i++){
        viewList[i].OnRender(fDeltaTime);
    }
};

BaseApplication.prototype.GetHumanView = function(){
    var gameViewList = this.GameLogic.gameViewList;
    for(var i=0; i < gameViewList.length; i++){
        if(gameViewList[i].GetType() === GameView.HUMAN_VIEW){
            return gameViewList[i];
        }
    }
    return null;
};

BaseApplication.prototype.GetNetworkView = function(){
    var gameViewList = this.GameLogic.gameViewList;
    for(var i=0; i < gameViewList.length; i++){
        if(gameViewList[i].GetType() === GameView.NETWORK_VIEW){
            return gameViewList[i];
        }
    }
    return null;
};

BaseApplication.prototype.GetAIView = function(){
    var gameViewList = this.GameLogic.gameViewList;
    for(var i=0; i < gameViewList.length; i++){
        if(gameViewList[i].GetType() === GameView.AI_VIEW){
            return gameViewList[i];
        }
    }
    return null;
};

BaseApplication.prototype.GameLoop = function(){
    var t = new Date().getTime();
    var delta = t - g_GameApp.LastUpdate;
    g_GameApp.UpdateFrame(delta);
    g_GameApp.RenderFrame(delta);
    g_GameApp.LastUpdate = new Date().getTime();
    g_GameApp.RequestAnimId = window.requestAnimationFrame(g_GameApp.GameLoop);
};

var AdvanceOneFrameDelegate = function(){
    g_GameApp.UpdateFrame(1000/60);
    g_GameApp.RenderFrame(1000/60);
};


BaseApplication.prototype.LoadGame = function(){
    this.GameLogic.LoadGame("../../Assets/level1_test");
    
};
