

var SceneNode = function(){
    this.childs = [];
    this.parentNode = null;
};

SceneNode.prototype.AddChild = function(node){
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
    for(var child in childs){
        
        if(child.PreRender(Scene)){
            
            if(child.IsVisible(Scene)){
                child.Render(Scene);
                child.RenderChildren(Scene);
            }
        }
        child.PosRender(Scene);
    }
};

SceneNode.prototype.Update = function(Scene, fDeltaTime){
    for(var child in childs){
        child.Update(Scene, fDeltaTime);
    }
};




var RootNode = function(){};
RootNode.Extends(SceneNode);

/**
 * The top-level management of the entire scene node hierarchy rests in the capable
 * hands of the Scene class. It serves as the top-level entry point for updating, render-
 * ing, and adding new SceneNode objects to the scene hierarchy. It also keeps track of
 * which scene nodes are visible components of dynamic actors in your game.
 * 
 */
var Scene = function(){
    this.nodes = [];
    this.rootNode = new RootNode();
    this.cameraNode = null;
    this.Renderer = null;
    this.sceneActorMap = {};//map["actorid"] = SceneNodeInstance
};

Scene.prototype.RegisterDelegates = function(){
    g_evtMgr.Register("NEW_RENDER_COMPONENT", MAKEDELEGATE(this, NewRenderComponentDelegate));
    
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
    
    //this.rootNode.AddChild(SceneNode);
};

Scene.prototype.RemoveChild = function(ActorID){
    
    var sceneNode = this.FindActor(ActorID);
    
    //rootNode.RemoveChild(ActorID);
    //this.nodes.push(SceneNode);
};

Scene.prototype.Render = function(scene){
    
    for(var node in nodes){
        
    }
};

Scene.prototype.OnUpdate = function(fDeltaTime){
    
    
};

/**
 * The BaseRenderComponent send out and SceneNode that was
 * created by a factory method calling GetSceneNode -> CreateSceneNode direction
 * just right the actor has been created
 * 
 * Specific Render Component should extends BaseRenderComponent and implement
 * CreateSceneNode
 */
var NewRenderComponentDelegate = function(actorId, sceneNode){
    console.log("NewRenderComponentDelegate", actorId, sceneNode);
    
    this.AddChild(actorId, sceneNode);
};