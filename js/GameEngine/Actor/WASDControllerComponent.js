
/* global InputManager, KEY, TransformComponent, ActorComponent, vec2, GameOptions */

var WASDControllerComponent = function(){
    this.transform = null;
    
    this.speed = 1;//should go to xml definition :), but not now, I need test it
    this.maxSpeed = 15;
    
    this.tick = 0;
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
    
    //this.tick += fDeltaTime;
//    if(this.tick > 5000){
//        console.log("player pos",this.transform.pos);
//        this.tick = 0;
//    }
    if(InputManager.IsKeyPressed(KEY.P)){
        console.log("player pos",this.transform.pos);
    }
    
    if(InputManager.IsKeyPressed(KEY.W) || InputManager.IsKeyPressed(KEY.UP)){
        var newVec = this.transform.pos;//vec2.create();
        var factor = vec2.fromValues(0, this.speed*fDeltaTime);
        vec2.sub(newVec, this.transform.pos, factor);
        this.transform.pos = newVec;
    }
    
    if(InputManager.IsKeyPressed(KEY.A) || InputManager.IsKeyPressed(KEY.LEFT)){
        this.transform.pos = vec2.sub(this.transform.pos, this.transform.pos, vec2.fromValues(this.speed*fDeltaTime,0));
    }
    
    if(InputManager.IsKeyPressed(KEY.S) || InputManager.IsKeyPressed(KEY.DOWN)){
        var newVec = this.transform.pos;//vec2.create();
        var factor = vec2.fromValues(0, this.speed*fDeltaTime);
        vec2.add(newVec, this.transform.pos, factor);
        this.transform.pos = newVec;
    }
    
    
    if(InputManager.IsKeyPressed(KEY.D) || InputManager.IsKeyPressed(KEY.RIGHT)){
        //var H = GameOptions.m_ScreenSize.height;
        
        var newVec = this.transform.pos;//vec2.create();
        var factor = vec2.fromValues(this.speed*fDeltaTime,0);
        vec2.add(newVec, this.transform.pos, factor);
        this.transform.pos = newVec;
        if(this.transform.pos[0] >= 800-40){
            vec2.set(this.transform.pos, 800-40, this.transform.pos[1]);
        }
    }
};