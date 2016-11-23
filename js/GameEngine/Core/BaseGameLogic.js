
var GameState = {
    Invalid: -1,
    Initializing : 0,
    LoadingGameEnvironment: 1,
    Running:  2,
    MainMenu: 3,
    WaintingForPlayers:4,
    WaintingForPlayersToLoadEnvironment:5,
    SpawningPlayerActors:6
};


var BaseGameLogic = function(){
    this.actorsMap = {};
    this.gameViewList = [];
    this.actorFactory = null;
    this.gameState   = GameState.Initializing;
    this.lastViewId  = 0;
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

BaseGameLogic.prototype.AddView = function(view, actorId){
    view.Attach(++this.lastViewId, actorId);
    this.gameViewList.push(view);
};

BaseGameLogic.prototype.RemoveView = function(view){
    //TODO  need unit test, maybe consider using array.indexOf + array.slice
    for(var i=0; i < this.gameViewList.length; i++){
        if(this.gameViewList[i].Type === view.Type){
            this.gameViewList[i] = null;
        }
    }
    return false;    
};

//Create, Move and Destroy actors using the ActorFactory

BaseGameLogic.prototype.CreateActor = function(actorId, overridesXML/*optional*/, initialTransform/*optional*/, serverActorId/*optional*/){
    var overrides = overridesXML || null;
    var transform = initialTransform || null;
    var serverId  = serverActorId || null;
    
    //create the actor provided and fire an event
    
    
};

BaseGameLogic.prototype.GetActor = function(actorId){
    if(this.actorsMap[actorId]){
        return this.actorsMap[actorId];
    }
    return null;
};


BaseGameLogic.prototype.Update = function(fDeltaTime){
    switch(this.gameState){
        case GameState.Initializing:
            this.ChangeState(GameState.MainMenu);
            break;
        case GameState.MainMenu:
            break;
        case GameState.Running:
            
            break;
        default:
            console.log("invalid game state: ", this.gameState);
    }
};

BaseGameLogic.prototype.ChangeState = function(newGameState){
    
    switch(newGameState){
        case GameState.LoadingGameEnvironment:
            var status = g_GameApp.LoadGame();
            
            if(status){
                this.ChangeState(GameState.WaintingForPlayersToLoadEnvironment);
            }
            else{
                console.log("Game Failed to Load");
            }
            break;
    }
    
};

