/* global InputManager, KEY, TransformComponent, ActorComponent, vec2, GameOptions */

var AIComponent = function(){
    this.transform = null;
    
    this.speed = 1;//should go to xml definition :), but not now, I need test it
    this.maxSpeed = 15;
    
    this.tick = 0;
};
AIComponent.Extends(ActorComponent);
AIComponent.NAME = "AIComponent";
AIComponent.prototype.GetName = function() { return AIComponent.NAME;};
AIComponent.prototype.PosInit = function(){
    var actor = this.GetOwner();
    if(!actor){
        return false;
    }
    this.transform = actor.GetComponent(TransformComponent.NAME);
};

AIComponent.prototype.Update = function(fDeltaTime){
    //var target = InputManager.GetMouseClickPosVec2();
    var target = vec2.fromValues(50,80);
    
    //http://stackoverflow.com/questions/2625021/game-enemy-move-towards-player
    var dist = vec2.distance(this.transform.pos, target);
    var dir  = vec2.normalize(vec2.create(), target);
    
    if(InputManager.IsMouseDown){
        //console.log("distance", dist, "dir", dir);
       
        
    }
     var dot = vec2.dot(target, this.transform.pos);
     //dot = dot < 0 ? dot : -dot;
    //console.log("dot", dot);
    this.transform.rotation = Math.atan(dot);
    
};

