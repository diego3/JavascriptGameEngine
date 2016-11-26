


var ActorManager = function(){
    //strategy 1: by actor identification
    this.actors_tag = {};//system internal identity
    this.actors_id = {};//human readable identity
    
    //In games with a big number of actor objects
    //may we need to consider implement some memory pool
    //this link is a great resource
    //MemoryPool https://www.html5rocks.com/en/tutorials/speed/static-mem-pools/
    
    //strategy 2: by actory type
    this.enemies = {};
    this.players = [];
    
    g_evtMgr.Register(GameEvent.NEW_ACTOR, MAKEDELEGATE(this, NewActorDeletate));
};

var NewActorDeletate = function(eventArgs){
    var actorId = eventArgs[0];
    var actor = g_GameApp.GameLogic.GetActor(actorId);
    if(actor){
        //if(actor.tag === "player"){
            //this.players.push(actor);
        //}
        //else{
            this.AddActor(actor);
        //}
    }
};

var DestroyActorDelegate = function(eventArgs){
    var actorId = eventArgs[0];
    var actor = g_GameApp.GameLogic.GetActor(actorId);
    if(actor){
        this.RemoveActor(actor);
    }
};

ActorManager.prototype.AddActor = function(actor){
    //var actorkey = actor.tag+":"+actor.GetId(); 
    //maybe a HashTable would resolve this ?
    
    this.actors_tag[actor.tag] = actor;
    this.actors_id[actor.GetId()] = actor;
};

ActorManager.prototype.RemoveActor = function(actor){
    
    //remove from tag and id maps
    
};

/**
 * 
 * @param {string} tag Tag name to look for
 * @returns {Actor|Actor[]|null}
 */
ActorManager.prototype.GetActorByTag = function(tag){
    if(this.actors_tag[tag]){
        return this.actors_tag[tag];
    }
    return null;
};

/**
 * 
 * @param {string} actorId The id to looking for
 * @returns {Actor|null} null if not found
 */
ActorManager.prototype.GetActorById = function(actorId){
    if(this.actors_id[actorId]){
        return this.actors_id[actorId];
    }
    return null;
};


