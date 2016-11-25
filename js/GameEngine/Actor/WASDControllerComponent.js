
/* global InputManager, KEY, TransformComponent, ActorComponent, vec2, GameOptions */

var WASDControllerComponent = function(){
    this.transform = null;
    
    this.speed = 0.8;//should go to xml definition :), but not now, I need test it
    this.maxSpeed = 15;
};
WASDControllerComponent.Extends(ActorComponent);
WASDControllerComponent.NAME = "WASDControllerComponent";
WASDControllerComponent.prototype.GetName = function() { return WASDControllerComponent.NAME;};
WASDControllerComponent.prototype.PosInit = function(){
    var actor = this.GetOwner();
    if(!actor){
        return false;
    }
    this.transform = actor.GetComponent(TransformComponent.NAME);
};
WASDControllerComponent.prototype.Update = function(fDeltaTime){
    if(!this.transform){
        console.warn("Missing transform component to WASDController ");
        return;
    }
    
    var isW = InputManager.IsKeyPressed(KEY.W);
    var isA = InputManager.IsKeyPressed(KEY.A);
    var isS = InputManager.IsKeyPressed(KEY.S);
    var isD = InputManager.IsKeyPressed(KEY.D);
    
    var isUP    = InputManager.IsKeyPressed(KEY.UP);
    var isLEFT  = InputManager.IsKeyPressed(KEY.LEFT);
    var isDOWN  = InputManager.IsKeyPressed(KEY.DOWN);
    var isRIGHT = InputManager.IsKeyPressed(KEY.RIGHT);
    
    if(isW || isUP){
        //this.transform.pos
    }
    if(isA || isLEFT){
        
    }
    
    if(isS || isDOWN){
        
    }
    
    var mousePosition = InputManager.GetMouseClickPosVec2();
    
    if(isD || isRIGHT){
        //var H = GameOptions.m_ScreenSize.height;
        
        var newVec = this.transform.pos;//vec2.create();
        var factor = vec2.fromValues(this.speed*fDeltaTime,0);
        vec2.add(newVec, this.transform.pos, factor);
        this.transform.pos = newVec;
        if(this.transform.pos[0] >= 800-40){
            vec2.set(this.transform.pos, 800-40, this.transform.pos[1]);
        }
        //vec2.lerp(this.transform.pos, this.transform.pos, vec2.fromValues(10,15), fDeltaTime);
    }
};