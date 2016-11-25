
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

/*
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};*/

function Rotate(vector2, degrees) {
    var sin = Math.sin(degrees * (180 / Math.PI));
    var cos = Math.cos(degrees * (180 / Math.PI));

    var tx = vector2[0];
    var ty = vector2[1];
    vector2[0] = (cos * tx) - (sin * ty);
    vector2[1] = (sin * tx) + (cos * ty);
    return vector2;
};

WASDControllerComponent.prototype.Update = function(fDeltaTime){
    if(!this.transform){
        console.warn("Missing transform component to WASDController ");
        return;
    }
    
    this.tick += fDeltaTime;
    if(this.tick > 5000){
        console.log("player pos",this.transform.pos);
        this.tick = 0;
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
    
    var target = InputManager.GetMouseClickPosVec2();
    
    //http://stackoverflow.com/questions/2625021/game-enemy-move-towards-player
    var dist = vec2.distance(this.transform.pos, target);
    var dir  = vec2.normalize(vec2.create(), target);
    
    if(InputManager.IsMouseDown){
        console.log("distance", dist, "dir", dir);
        //console.log("rotation", Rotate(this.transform.pos, dir));
    }
    
    //var moveTo = vec2.fromValues(this.speed*dir[0],this.speed*dir[1]);
    //this.transform.pos = vec2.add(this.transform.pos, this.transform.pos, moveTo);
    
    
    this.transform.pos = vec2.add(this.transform.pos, this.transform.pos, Rotate(this.transform.pos, 45));
    
    
    //this.transform.pos = vec2.lerp(vec2.create(), vec2.create(), mpVec, fDeltaTime);
   
};