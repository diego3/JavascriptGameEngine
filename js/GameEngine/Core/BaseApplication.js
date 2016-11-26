

/* global g_GameApp, InputManager, GameEvent, EditorEvent, GameView, GameOptions */

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
    //var mainMenuView = new MainMenuView(this.Renderer);
    //logic.AddView(mainMenuView);
    return logic;
};

BaseApplication.prototype.Initialize = function(){
    GameOptions.Init("Asset/options");
    this.gameOptions = GameOptions;
    
    //initialize the canvas
    var canvas = document.getElementById("canvas");
    canvas.setAttribute("height", this.gameOptions.m_ScreenSize.height);
    canvas.setAttribute("width", this.gameOptions.m_ScreenSize.width);
    var ctx = canvas.getContext('2d');//Convas2DRenderer
    if(!ctx){
        this.LastError = "your browser do not support html5 canvas!";
        return false;
    }
    this.Renderer = ctx;
    
    this.EventManager = new EventManager();
    g_evtMgr = this.EventManager;
    
    this.GameLogic = this.CreateGameAndView(); 
    if(this.GameLogic === null){
        this.LastError = "GameLogic was not initialized";
        return false;
    }
    
    InputManager.Init();
    
    g_actMgr = new ActorManager();
    
    this.RegisterDelegates();
    
    this.IsInitialized = true;
    return true;
};

BaseApplication.prototype.RegisterDelegates = function(){
    g_evtMgr.Register(EditorEvent.START_ENGINE, MAKEDELEGATE(this, StartGameEngineDelegate));
    g_evtMgr.Register(EditorEvent.PAUSE_FRAME, MAKEDELEGATE(this, StopFrameDelegate));
    g_evtMgr.Register(EditorEvent.ADVANCE_FRAME, MAKEDELEGATE(this, AdvanceOneFrameDelegate));
    g_evtMgr.Register(EditorEvent.ADD_ACTOR_TEST, MAKEDELEGATE(this, AddActorTestDelegate));
    
};

var AddActorTestDelegate=function(){
    var ball = this.GameLogic.CreateActor("../../../Assets/Actor/Ball");
    console.log(ball);
};

//BaseApplication.prototype.
var StartGameEngineDelegate = function() {
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
    
    //g_evtMgr.Update(fDeltaTime, 20);
    
    //this.socketManager.Update();
    
    this.GameLogic.Update(fDeltaTime);
};

BaseApplication.prototype.RenderFrame = function(fDeltaTime){
    //console.log("RenderFrame", fDeltaTime);
    
    var viewList = g_GameApp.GameLogic.gameViewList;
    for(var i=0; i < viewList.length; i++){
        viewList[i].OnRender(fDeltaTime);
    }
};

BaseApplication.prototype.AttachAsClient = function(){
    //create the socket
    
    //try connect: if any error return false;
    //if connected assign the socket to a this.socketManager
    
    //create CreateNetworkEventForwarder
    console.log("networking not implemented yet");
    return false;//networking not implemented yet
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
    console.log("+ frame");
};


BaseApplication.prototype.LoadGame = function(){
    return this.GameLogic.LoadGame("../../Assets/level1_test");
    
};
