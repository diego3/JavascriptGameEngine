
//http://codeincomplete.com/posts/javascript-game-foundations-state-management/
var EventManager = function(){
    this.delegates = {};
    this.queue = {};
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
 * @param {type} event
 * @returns {undefined}
 */
EventManager.prototype.Queue = function(event){
    
};


var GameEvent = {
    LEVEL_LOADING: "LEVEL_LOADING",
    ACTOR_MOVE: "ACTOR_MOVE",
    ACTOR_JUMP: "ACTOR_JUMP",
    ACTOR_FIRE: "ACTOR_FIRE",
    ACTOR_TURNLEFT: "ACTOR_TURNLEFT",
    ACTOR_TURNRIGHT: "ACTOR_TURNRIGHT",
    ACTOR_ACELLERATE:"ACTOR_ACELLERATE",
    ACTOR_BREAK: "ACTOR_BREAK"
};

var EditorEvent = {
    START_GAME: "START_GAME",
    PAUSE_GAME: "PAUSE_GAME",
    ADVANCE_FRAME: "ADVANCE_FRAME"
};