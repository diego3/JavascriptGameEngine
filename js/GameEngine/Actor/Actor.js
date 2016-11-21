
var IComponent = function(){};
IComponent.prototype.Update = function(fDeltaTime){};
IComponent.prototype.GetName = function(){};

var TransformComponent = function(/*Vector2*/ v2pos){
    this.position = v2pos;
};
TransformComponent.Extends(IComponent);
TransformComponent.prototype.Update = function(fDeltaTime){};
TransformComponent.prototype.GetName = function() { return "TransformComponent";};

var RenderComponent = function(){};
RenderComponent.Extends(IComponent);
RenderComponent.prototype.VOnRender = function(){};
RenderComponent.prototype.GetName = function() { return "RenderComponent";};

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

Actor.prototype.AddComponent = function(/*IComponent*/ component){
    this.components[component.getName()] = component;
};

Actor.prototype.GetComponent = function(componentName){
    if(this.components[componentName]){
       return this.components[componentName];
    }
    return null;
};