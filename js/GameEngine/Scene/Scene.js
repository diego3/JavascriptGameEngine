

/* global g_evtMgr */

var SceneNode = function(actorId, renderComponent){
    this.childs = [];
    this.actorId = actorId;
    this.parentNode = null;
    this.renderComponent = renderComponent || null;
};

SceneNode.prototype.AddChild = function(node){
    node.parentNode = this;
    this.childs.push(node);
};

SceneNode.prototype.PreRender = function(Scene){
  
    return true;//by default
};

SceneNode.prototype.Render = function(Scene){
    
};

SceneNode.prototype.PosRender = function(Scene){
    
};

SceneNode.prototype.IsVisible = function(Scene){
    //tests against a camera to see if the node is offscreen or cameraoff set
    
    return true;//by default
};

SceneNode.prototype.RenderChildren = function(Scene){
    for(var i=0; i < this.childs.length; i++){
        var sceneNode = this.childs[i];
        if(sceneNode.PreRender(Scene)){
            if(sceneNode.IsVisible(Scene)){
                sceneNode.Render(Scene);
                sceneNode.RenderChildren(Scene);
            }
        }
        sceneNode.PosRender(Scene);
    }
};

SceneNode.prototype.Update = function(Scene, fDeltaTime){
    for(var i=0; i < this.childs.length; i++){
        var sceneNode = this.childs[i];
        sceneNode.Update(Scene, fDeltaTime);
    }
};



/*
 * Manages children as separate render passes for different
 * kinds of scene nodes.
 * 
 * The root node is the top-level scene node 
 * in the entire scene graph. There is some special code 
 * associated with the root node. 
 * For now, you can consider the root node as the same kind of 
 * object that all tree-like data structures have. 
 */
var RootNode = function(){};
RootNode.Extends(SceneNode);

RootNode.prototype.Render = function(){
    
};

/*
RootNode.prototype.AddChild = function(){
    
};*/

//Just for Test and learning
var TestSceneNode = function(){
    
};
TestSceneNode.Extends(SceneNode);

//https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D
TestSceneNode.prototype.Render = function(scene){
    var ctx = scene.GetRenderer();
    
    ctx.clearRect(0, 0, 800, 600);//clear the entire canvas view
    
    ctx.fillStyle = "blue";//"rgba(255,0,0,1)";
    ctx.fillRect(0,0,40,40);
    
};

/**
 * The top-level management of the entire scene node hierarchy rests in the capable
 * hands of the Scene class. It serves as the top-level entry point for updating, render-
 * ing, and adding new SceneNode objects to the scene hierarchy. It also keeps track of
 * which scene nodes are visible components of dynamic actors in your game.
 * 
 */
var Scene = function(Renderer){
    this.rootNode   = new RootNode();
    this.cameraNode = null;
    this.Renderer   = Renderer;
    this.sceneActorMap = {};//map["actorid"] = SceneNodeInstance
    
    g_evtMgr.Register("NEW_RENDER_COMPONENT", MAKEDELEGATE(this, NewRenderComponentDelegate));
};

/*
Scene.prototype.RegisterDelegates = function(){
    g_evtMgr.Register("NEW_RENDER_COMPONENT", MAKEDELEGATE(this, NewRenderComponentDelegate));
    
};*/

Scene.prototype.GetRenderer = function(){
    return this.Renderer;
};

Scene.prototype.SetRenderer = function(newRenderer){
    this.Renderer = newRenderer;
};

Scene.prototype.SetCamera = function(cameraNode){
    this.cameraNode = cameraNode;
};
Scene.prototype.GetCamera = function(){
    return this.cameraNode; 
};

Scene.prototype.FindActor = function(actorID){
    if(this.sceneActorMap[actorID]){
        return this.sceneActorMap[actorID];
    }
    return null;
};

Scene.prototype.AddChild = function(ActorID, SceneNode){
    
    this.sceneActorMap[ActorID] = SceneNode;
    
    this.rootNode.AddChild(SceneNode);
};

Scene.prototype.RemoveChild = function(ActorID){
    
    var sceneNode = this.FindActor(ActorID);
    
    //rootNode.RemoveChild(ActorID);
    //this.nodes.push(SceneNode);
};

Scene.prototype.Render = function(){
    //var ctx = this.Renderer;
    //ctx.clearRect();
    
    if(this.rootNode/* && this.cameraNode*/){
        if(this.rootNode.PreRender(this)){
            this.rootNode.Render(this);
            this.rootNode.RenderChildren(this);
            this.rootNode.PosRender(this);
        }
    }
    
    
};

Scene.prototype.OnUpdate = function(fDeltaTime){
    
    
};


//
// [note] An instance of this class is assinged to HumanView into its constructor
// [note] The Scene constructor create and assing a RootNode to a Scene
//
var ScreenElementScene = function(Renderer){
    this.scene = new Scene(Renderer);
};

//ScreenElementScene.Extends(Scene);
ScreenElementScene.Extends(IScreenElement);

ScreenElementScene.prototype.OnRender = function(fDeltaTime){
    this.scene.Render();
};

ScreenElementScene.prototype.OnUpdate = function(fDeltaTime){
    this.scene.OnUpdate(fDeltaTime);
};

ScreenElementScene.prototype.SetZOrder = function(z){};
ScreenElementScene.prototype.GetZOrder = function(){ return 0;};
ScreenElementScene.prototype.ProcessInput = function(){};//don't handle any messages
ScreenElementScene.prototype.IsVisible  = function(){ return true;};
ScreenElementScene.prototype.SetVisible = function(boolValue){};
ScreenElementScene.prototype.AddChild = function(ActorID, SceneNode){
    this.scene.AddChild(ActorID, SceneNode);
};

/**
 * The BaseRenderComponent send out and SceneNode that was
 * created by a factory method calling GetSceneNode -> CreateSceneNode direction
 * just right the actor has been created
 * 
 * Specific Render Component should extends BaseRenderComponent and implement
 * CreateSceneNode
 */
var NewRenderComponentDelegate = function(eventArgs){
    console.log("NewRenderComponentDelegate", eventArgs);
    
    var actorId = eventArgs[0];
    var sceneNode = eventArgs[1];
    this.AddChild(actorId, sceneNode);
};