

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
            subs[n].apply(target, args);
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


var Event = {
    START_GAME:1,
    PAUSE_GAME:2,
    LEVEL_LOADING:3
    
};