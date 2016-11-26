
var ActorManager = function(){
    this.actors = {};
    this.enemies = {};
    
};

ActorManager.prototype.AddActor = function(actor){
    this.actors[actor.tag] = actor;
};

/**
 * 
 * @param {string} tag
 * @returns {Actor|Actor[]|null}
 */
ActorManager.prototype.GetActor = function(tag){
    if(this.actors[tag]){
        return this.actors[tag];
    }
    return null;
};


