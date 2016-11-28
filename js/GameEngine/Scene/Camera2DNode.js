
//http://stackoverflow.com/questions/16919601/html5-canvas-camera-viewport-how-to-actally-do-it
//http://jsfiddle.net/gfcarv/QKgHs/
var AXIS = {
    NONE: "none", 
    HORIZONTAL: "horizontal", 
    VERTICAL: "vertical", 
    BOTH: "both"
};

var Camera2DNode = function(actorId, renderComponent, transformComponent){
    this.actorId = actorId;
    this.renderComponent = renderComponent;
    this.transformComponent = transformComponent;

    // position of camera (left-top coordinate)
    this.xView = xView || 0;
    this.yView = yView || 0;

    this.xDeadZone = 0;
    this.yDeadZone = 0;

    // viewport dimensions
    this.wView = canvasWidth;
    this.hView = canvasHeight;          

    // allow camera to move in vertical and horizontal axis
    this.axis = AXIS.BOTH;  

    // object that should be followed
    this.target = null;

    // rectangle that represents the viewport
    this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);             

    // rectangle that represents the world's boundary (room's boundary)
    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
};

Camera2DNode.Extends(SceneNode);

Camera2DNode.prototype.Follow = function(targetActor, xDeadZone, yDeadZone){
    this.target = targetActor;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
};

//https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D
Camera2DNode.prototype.Render = function(scene){
	
};

Camera2DNode.prototype.Update = function(Scene, fDeltaTime){
	// keep following the player (or other desired object)
    if(this.target != null)
    {       
        if(this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH)
        {       
            // moves camera on horizontal axis based on followed object position
            if(this.target.x - this.xView  + this.xDeadZone > this.wView)
                this.xView = this.target.x - (this.wView - this.xDeadZone);
            else if(this.target.x  - this.xDeadZone < this.xView)
                this.xView = this.target.x  - this.xDeadZone;

        }
        if(this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH)
        {
            // moves camera on vertical axis based on followed object position
            if(this.target.y - this.yView + this.yDeadZone > this.hView)
                this.yView = this.target.y - (this.hView - this.yDeadZone);
            else if(this.target.y - this.yDeadZone < this.yView)
                this.yView = this.target.y - this.yDeadZone;
        }                       

    }       

    // update viewportRect
    this.viewportRect.set(this.xView, this.yView);

    // don't let camera leaves the world's boundary
    if(!this.viewportRect.within(this.worldRect))
    {
        if(this.viewportRect.left < this.worldRect.left)
            this.xView = this.worldRect.left;
        if(this.viewportRect.top < this.worldRect.top)                  
            this.yView = this.worldRect.top;
        if(this.viewportRect.right > this.worldRect.right)
            this.xView = this.worldRect.right - this.wView;
        if(this.viewportRect.bottom > this.worldRect.bottom)                    
            this.yView = this.worldRect.bottom - this.hView;
    }

};