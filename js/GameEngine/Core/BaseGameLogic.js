
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
    this.processMgr = null;
    this.proxy = false;
    
    this.expectedPlayers = 0;
    this.expectedRemotePlayers = 0;
    this.expectedAI = 0;
    this.humanPlayersAttached = 0;
    this.AIPlayersAttached = 0;
    this.humanGamesLoaded = 0;
};

BaseGameLogic.prototype.Init = function(){
    this.actorFactory = new ActorFactory();
    
    this.processMgr = new ProcessManager();
    
};

/**
 * That means we are joining an game already running
 * We are the remote player ?
 */
BaseGameLogic.prototype.SetProxy = function(){
    this.proxy = true;
    
    //TODO create websocket
    //https://www.html5rocks.com/en/tutorials/websockets/basics/
    //var connection = new WebSocket('ws://localhost/game', ['soap', 'xmpp']);
    
};
BaseGameLogic.prototype.OnActorMoveDelegate = function(actorId, vec2){
    //this method should listen for an event fired from InputManager
    
};


//load game
BaseGameLogic.prototype.LoadGame = function(levelName, callback){
    var req = new Request();
    req.ReadFile(levelName, function(rootNode){
        
        // load all initial actors
        
        
        //for each view we should call LoadGame too
        
        // trigger the Environment Loaded Game event 
        // - only then can player actors and AI be spawned!
        if(this.proxy){
            
        }
        
        if(callback){
            callback();
        }
    });
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

BaseGameLogic.prototype.AttachProcess = function(process){
    this.processMgr.Attach(process);
    
};

BaseGameLogic.prototype.Update = function(fDeltaTime){
    switch(this.gameState){
        case GameState.Initializing:
            this.ChangeState(GameState.MainMenu);
            break;
        case GameState.MainMenu:
            
            break;
        case GameState.WaintingForPlayers:
            
            
            
            break;
        case GameState.Running:
            this.processMgr.Update(fDeltaTime);
            
            break;
        case GameState.WaintingForPlayersToLoadEnvironment:
            
            //this.ChangeState(GameState.SpawningPlayerActors);
            break;
        case GameState.SpawningPlayerActors:
            this.ChangeState(GameState.Running);
            break;
        default:
            console.log("invalid game state: ", this.gameState);
    }
    
    for(var i=0; i < this.gameViewList.length; i++){
        this.gameViewList[i].Update(fDeltaTime);
    }
    
    for(var actorIDKey in this.actorsMap){
        this.actorsMap[actorIDKey].Update(fDeltaTime);
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
        case GameState.WaintingForPlayersToLoadEnvironment:
            
            
            break;
    }
    
};

