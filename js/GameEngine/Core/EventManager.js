
//http://codeincomplete.com/posts/javascript-game-foundations-state-management/
var EventManager = function(){
    this.delegates = {};
    this.queue = [];
    this.tickCount = 0;
};

EventManager.prototype.Register = function(event, callback){
    this.delegates = this.delegates || {};
    this.delegates[event] = this.delegates[event] || [];
    this.delegates[event].push(callback);
};

/**
 * Fire a Event imediatly
 * 
 * @param {type} event
 * @returns {void}
 */
EventManager.prototype.FireEvent = function(event){
    if (this.delegates && this.delegates[event]) {
        var subs = this.delegates[event];
        var args = [].slice.call(arguments, 1);
        var n; 
        var max;
        
        for(n = 0, max = subs.length ; n < max ; n++){
            subs[n](args);
            //subs[n].apply(target, args);
        }
    }
};

/**
 * Queue an Event to be fired after
 * 
 * @param {Function.bind} event delegate function
 */
EventManager.prototype.QueueEvent = function(event){
    this.queue.push(event);
};

EventManager.prototype.Update = function(fDeltaTime, frequency){
    this.tickCount += fDeltaTime;
    if(this.tickCount >= frequency){
        
    }
};


var GameEvent = {
    LEVEL_LOADING: "LEVEL_LOADING",
    
    REQUEST_NEW_ACTOR: "REQUEST_NEW_ACTOR",
    REQUEST_DESTROY_ACTOR:"REQUEST_DESTROY_ACTOR",
    NEW_ACTOR:"NEW_ACTOR",
    
    ENVIRONMENT_LOADED: "ENVIRONMENT_LOADED",
    REMOTE_ENVIRONMENT_LOADED: "REMOTE_ENVIRONMENT_LOADED",
    
    ACTOR_MOVE: "ACTOR_MOVE",
    ACTOR_JUMP: "ACTOR_JUMP",
    ACTOR_FIRE: "ACTOR_FIRE",
    ACTOR_TURNLEFT: "ACTOR_TURNLEFT",
    ACTOR_TURNRIGHT: "ACTOR_TURNRIGHT",
    ACTOR_ACELLERATE:"ACTOR_ACELLERATE",
    ACTOR_BREAK: "ACTOR_BREAK"
};

var EditorEvent = {
    START_ENGINE: "START_ENGINE",
    PAUSE_FRAME: "PAUSE_FRAME",
    ADVANCE_FRAME: "ADVANCE_FRAME",
    ADD_ACTOR_TEST:"ADD_ACTOR_TEST"
};