
//http://stackoverflow.com/questions/16919601/html5-canvas-camera-viewport-how-to-actally-do-it
//http://jsfiddle.net/gfcarv/QKgHs/

var Camera2DNode = function(actorId, renderComponent, transformComponent){
    this.actorId = actorId;
    this.renderComponent = renderComponent;
    this.transformComponent = transformComponent;
    this.target = null;
};
Camera2DNode.Extends(SceneNode);

Camera2DNode.prototype.Follow = function(targetActor, xDeadZone, yDeadZone){
    
};

//https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D
Camera2DNode.prototype.Render = function(scene){
	
};
