
/* global g_evtMgr */

var HumanView = function(Renderer){
    this.type = "HumanView";
    this.ctx = null;
    this.scene = null;/*ScreenElementScene*/
    this.cameraNode = null;
    this.processMgr = null;
    this.actorId = 0;
    this.viewId = 0;
    this.gameState = null;
    this.screenElementList = []; //list
    
    if(Renderer){
        this.ctx = Renderer;//canvas contex
        //this.scene = new Scene(Renderer);
        //this.scene = new ScreenElementScene(Renderer);
        
        this.scene.AddChild(cameraNode);
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

HumanView.prototype.PushElement = function(screenElement){
    this.screenElementList.push(screenElement);
};

HumanView.prototype.RemoveElement = function(screenElement){
    //TODO need unit test 
    var index = this.screenElementList.indexOf(screenElement);
    if(index > -1){
        this.screenElementList.slice(index, 1);
    }
    //this.screenElementList.pop();
};

HumanView.prototype.GetProcessManager = function(){
    return this.processMgr;
};

HumanView.prototype.ProcessInputEvents = function(){
    
};

HumanView.prototype.c = function(){};

HumanView.prototype.OnRender = function(){
    
    
    
};
