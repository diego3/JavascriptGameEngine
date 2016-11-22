
var ActorComponent = function(){
    this.m_owner = null;//the actor who is parent from this component
};
ActorComponent.prototype.Update = function(fDeltaTime){};
ActorComponent.prototype.GetName = function(){};
ActorComponent.prototype.Init = function(xmlData){};
ActorComponent.prototype.PosInit = function(){};
ActorComponent.prototype.SetOwner = function(owner){ this.m_owner = owner;};
ActorComponent.prototype.GetOwner = function(){return this.m_owner;};

var TransformComponent = function(/*Vector2*/ v2pos){
    this.position = v2pos;
};
TransformComponent.Extends(ActorComponent);
TransformComponent.prototype.Update = function(fDeltaTime){};
TransformComponent.prototype.GetName = function() { return "TransformComponent";};

var BaseRenderComponent = function(){
    this.m_sceneNode = null;
};
BaseRenderComponent.Extends(ActorComponent);
BaseRenderComponent.prototype.VOnRender = function(){};
BaseRenderComponent.prototype.GetName = function() { return "BaseRenderComponent";};
BaseRenderComponent.prototype.CreateSceneNode = function(){};//factory method
BaseRenderComponent.prototype.GetSceneNode=function(){
    if(!this.m_sceneNode){
        this.m_sceneNode = this.CreateSceneNode();
    }
    return this.m_sceneNode;
};
BaseRenderComponent.prototype.PosInit = function(){
    var sceneNode = this.GetSceneNode();
    g_evtMgr.FireEvent("NEW_RENDER_COMPONENT", this.GetOwner().GetId(), sceneNode);
    //principal listener is Scene class
};


var Actor = function(id){
    this.m_id = id;
    this.components = [];// {name:"", instance:}
};

Actor.prototype.Update = function(fDeltaTime){
    if(this.components.length >0){
        for(var comp in components){
            comp.Update(fDeltaTime);
        }
    }
};

Actor.prototype.Init = function(xmlNode){
    
};

Actor.prototype.PosInit = function(){
    if(this.components.length >0){
        for(var comp in components){
            comp.PosInit();
        }
    }
};

Actor.prototype.GetId = function(){
    return this.m_id;
};

Actor.prototype.AddComponent = function(/*ActorComponent*/ component){
    this.components[component.getName()] = component;
};

Actor.prototype.GetComponent = function(componentName){
    if(this.components[componentName]){
       return this.components[componentName];
    }
    return null;
};