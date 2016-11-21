

var SceneNode = function(){
    this.child = null;
    this.parentNode = null;
};
SceneNode.prototype.AddChild = function(node){
    this.child = node;
};

SceneNode.prototype.RenderChildren = function(){
    
};

var Scene = function(){
    this.nodes = [];
    
};

Scene.prototype.OnRender = function(){
    
    
};