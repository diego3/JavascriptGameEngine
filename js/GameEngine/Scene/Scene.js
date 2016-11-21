

var SceneNode = function(){
    this.childs = [];
    this.parentNode = null;
};

SceneNode.prototype.AddChild = function(node){
    this.childs.push(node);
};

SceneNode.prototype.RenderChildren = function(){
    for(var child in childs){
        child.Render();
        if(child.childs){
            child.RenderChildren();
        }
    }
};

SceneNode.prototype.Render = function(){
    
};


var RootNode = function(){};
RootNode.prototype.Extends(SceneNode);


var Scene = function(){
    this.nodes = [];
    this.rootNode = new RootNode();
};

Scene.prototype.AddNode = function(SceneNode){
    this.nodes.push(SceneNode);
};

Scene.prototype.OnRender = function(){
    
    for(var node in nodes){
        
    }
};