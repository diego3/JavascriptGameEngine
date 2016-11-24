
/* global g_evtMgr */

var GameView = {
    HUMAN_VIEW : "HUMAN_VIEW",
    NETWORK_VIEW: "NETWORK_VIEW",
    AI_VIEW:"AI_VIEW"
};

var HumanView = function(Renderer){
    this.type = GameView.HUMAN_VIEW;
    this.ctx = null;
    this.scene = null;/*ScreenElementScene*/
    this.cameraNode = null;
    this.processMgr = new ProcessManager();
    this.actorId = 0;
    this.viewId = 0;
    this.gameState = null;
    this.screenElementList = []; //list
    
    this.lastDraw = 0;
    this.currentTick = 0;
    
    this.console = null;
    
    this.needRevertSortScreenElements = true;
    
    if(Renderer){
        this.ctx = Renderer;//canvas contex
        this.scene = new Scene(Renderer);//for a while, it should be removed
        this.scene.RegisterDelegates();
        
        //this.scene = new ScreenElementScene(Renderer);//this is the correct Scene class, but that is not implemented yet
        this.scene.AddChild(null/*cameraNode*/);
        //this.Scene.SetCamera(cameraNode);
    }
};

var PlaySoundDelegate = function(){
    
};
var GameStateDelegate = function(newState){
    this.gameState = newState;
};

HumanView.prototype.InitAudio = function(){};

HumanView.prototype.RegisterDelegates = function(){
    g_evtMgr.Register("GAME_STATE", MAKEDELEGATE(this, GameStateDelegate));
    g_evtMgr.Register("SOUND", MAKEDELEGATE(this, PlaySoundDelegate));
    
};

HumanView.prototype.Attach = function(actorId, viewId){
    this.actorId = actorId;
    this.viewId = viewId;
};

HumanView.prototype.GetId = function(){
    return this.viewId;
};

HumanView.prototype.GetType = function(){
    return this.type;
};

HumanView.prototype.PushElement = function(screenElement){
    this.screenElementList.push(screenElement);
    this.needRevertSortScreenElements = true;
};

HumanView.prototype.RemoveElement = function(screenElement){
    //TODO need unit test 
    var index = this.screenElementList.indexOf(screenElement);
    if(index > -1){
        this.screenElementList.slice(index, 1);
    }
    //this.screenElementList.pop();
    this.needRevertSortScreenElements = true;
};

HumanView.prototype.GetProcessManager = function(){
    return this.processMgr;
};

HumanView.prototype.ProcessInputEvents = function(){
    
};

HumanView.prototype.Update = function(fDeltaTime){
    this.processMgr.Update(fDeltaTime);
    
    for(var i=0; i < this.screenElementList.length; i++){
        this.screenElementList[i].OnUpdate(fDeltaTime);
    }
};

HumanView.prototype.RenderText = function(fDeltaTime){
    //var ctx = this.ctx;
    
    
};

HumanView.prototype.OnRender = function(fDeltaTime){
    this.currentTick = new Date().getTime();
    
    if(this.needRevertSortScreenElements){
        this.screenElementList.sort();//.reverse();
        this.needRevertSortScreenElements = false;
    }
    
    //PreRender();
    
    for(var i=0; i < this.screenElementList.length; i++){
        if(this.screenElementList[i].IsVisible()){
            this.screenElementList[i].OnRender(fDeltaTime);
        }
    }
    
    this.scene.Render();
    
    this.RenderText(fDeltaTime);
    
    //this.console.Render(fDeltaTime);
    
    this.lastDraw = this.currentTick;
    
    //PosRender();
};
