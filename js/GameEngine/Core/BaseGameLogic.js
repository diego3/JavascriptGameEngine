

var BaseGameLogic = function(){
    this.actorsMap = {};
    this.gameViewList = [];
    this.actorFactory = null;
};

BaseGameLogic.prototype.Init = function(){
    this.actorFactory = new ActorFactory();
};

BaseGameLogic.prototype.OnActorMoveDelegate = function(actorId, vec2){
    //this method should listen for an event fired from InputManager
    
};


//load game
BaseGameLogic.prototype.LoadGame = function(levelName){
    
    //for each view we should call LoadGame too
    
};

//add and remove view
BaseGameLogic.prototype.AddView = function(view){
    this.gameViewList.push(view);
};

BaseGameLogic.prototype.RemoveView = function(view){
    for(var i=0; i < this.gameViewList.length; i++){
        if(this.gameViewList[i].Type === view.Type){
            this.gameViewList[i] = null;
        }
    }
    return false;    
};

//Create, Move and Destroy actors using the ActorFactory

BaseGameLogic.prototype.CreateActor = function(actorId){
    
    //create the actor provided and fire an event
    
    
};

BaseGameLogic.prototype.GetActor = function(actorId){
    if(this.actorsMap[actorId]){
        return this.actorsMap[actorId];
    }
    return null;
};


