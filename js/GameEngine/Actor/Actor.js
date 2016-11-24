
var ActorComponent = function(){
    this.m_owner = null;//the actor who is parent from this component
};
ActorComponent.prototype.Update = function(fDeltaTime){};
ActorComponent.NAME = "INVALID_ACTOR_COMPONENT";
ActorComponent.prototype.GetName = function(){ return ActorComponent.NAME;};
ActorComponent.prototype.Init = function(xmlData){ return true;};
ActorComponent.prototype.PosInit = function(){};
ActorComponent.prototype.SetOwner = function(owner){ this.m_owner = owner;};
ActorComponent.prototype.GetOwner = function(){return this.m_owner;};

var TransformComponent = function(){
    this.position = vec2.create();
};
TransformComponent.Extends(ActorComponent);
TransformComponent.prototype.Update = function(fDeltaTime){};
TransformComponent.NAME = "TransformComponent";
TransformComponent.prototype.GetName = function() { return TransformComponent.NAME;};
TransformComponent.prototype.Init = function(xmlData){
    var posElement = xmlData.getElementsByTagName("Position")[0];
    if(!posElement){
        console.log("Are you missing Position tag for transform component?");        
        return false;
    }
    var x = posElement.getAttribute("x") || 0;
    var y = posElement.getAttribute("y") || 0;
    
    vec2.set(this.position, x, y);
    return true;
};

var BaseRenderComponent = function(){
    this.m_sceneNode = null;
    this.color = null;
};
BaseRenderComponent.Extends(ActorComponent);
BaseRenderComponent.prototype.VOnRender = function(){
    
};
BaseRenderComponent.NAME = "BaseRenderComponent";
BaseRenderComponent.prototype.GetName = function() { return BaseRenderComponent.NAME;};
BaseRenderComponent.prototype.CreateSceneNode = function(){//factory method
    return new SceneNode(this.GetOwner(), this);
};
BaseRenderComponent.prototype.GetSceneNode=function(){
    if(!this.m_sceneNode){
        this.m_sceneNode = this.CreateSceneNode();
    }
    return this.m_sceneNode;
};
BaseRenderComponent.prototype.Init = function(xmlData){
    var colorElement = xmlData.getElementsByTagName("Color")[0];
    if(!colorElement){
        console.log("Are you missing Color tag for render component?");        
        return false;
    }
    
    var color = {};
    color.r = colorElement.getAttribute("r");
    color.g = colorElement.getAttribute("g");
    color.b = colorElement.getAttribute("b");
    color.a = colorElement.getAttribute("a");
    this.color = color;
    return true;
};
BaseRenderComponent.prototype.PosInit = function(){
    var sceneNode = this.GetSceneNode();
    g_evtMgr.FireEvent("NEW_RENDER_COMPONENT", this.GetOwner().GetId(), sceneNode);
    //principal listener is Scene class
};


var Actor = function(id){
    this.m_id = id || null;
    this.components = [];// {name:"", instance:}
};

Actor.prototype.Update = function(fDeltaTime){
    for(var key in this.components){
        this.components[key].Update(fDeltaTime);
    }
};

Actor.prototype.Init = function(xmlNode){
    
};

Actor.prototype.PosInit = function(){
    for(var key in this.components){
        this.components[key].PosInit();
    }
};

Actor.prototype.GetId = function(){
    return this.m_id;
};

Actor.prototype.AddComponent = function(/*ActorComponent*/ component){
    this.components[component.GetName()] = component;
};

Actor.prototype.GetComponent = function(componentName){
    if(this.components[componentName]){
       return this.components[componentName];
    }
    return null;
};