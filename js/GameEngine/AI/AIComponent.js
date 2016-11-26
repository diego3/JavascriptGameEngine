/* global InputManager, KEY, TransformComponent, ActorComponent, vec2, GameOptions */

var AIComponent = function(){
    this.transform = null;
    
    this.speed = 1;//should go to xml definition :), but not now, I need test it
    this.maxSpeed = 15;
    
    this.tick = 0;
    this.right = vec2.fromValues(1,0);
    this.left = vec2.fromValues(-1,0);
    this.dot = vec2.fromValues(1,0);
    
    this.player = null;
    this.playerTransform = null;
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
    
    this.player = g_actMgr.GetActorByTag("player");
    if(this.player){
        this.playerTransform = this.player.GetComponent(TransformComponent.NAME);
    }
};

AIComponent.prototype.Update = function(fDeltaTime){
    
    this.RotationTest(fDeltaTime);
};

AIComponent.prototype.RotationTest = function(fDeltaTime){
    if(!this.playerTransform){
        return;
    }
    
    //var target = InputManager.GetMouseMovePosVec2();
    var target = this.playerTransform.pos;
    
    //http://stackoverflow.com/questions/2625021/game-enemy-move-towards-player
    //var dist = vec2.distance(this.transform.pos, target);
    var dir  = vec2.normalize(vec2.create(), target);
    var dot;
    
    if(target[0] > this.transform.pos[0]){
        dot = vec2.dot(this.right, dir);
    }
    else{
        dot = vec2.dot(this.left, dir);
    }
    
    //if(dir[0] < 0){
    //    dot = -dot;
    //}
    
    this.transform.rotation = Math.acos(dot);
};

AIComponent.prototype.LerpTest = function(fDeltaTime){
    //this.transform.pos = vec2.lerp(vec2.create(), vec2.create(), mpVec, fDeltaTime);
};

