
/* global GameEvent, g_evtMgr */

var GameState = {
    Invalid: -1,
    Initializing : 0,
    LoadingGameEnvironment: 1,
    Running:  2,
    MainMenu: 3,
    WaitingForPlayers:4,
    WaitingForPlayersToLoadEnvironment:5,
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
    this.remotePlayerId = 0;
    
    this.expectedPlayers = 0;
    this.expectedRemotePlayers = 0;
    this.expectedAI = 0;
    this.humanPlayersAttached = 0;
    this.remotePlayersAttached = 0;
    this.AIPlayersAttached = 0;
    this.humanGamesLoaded = 0;
};

BaseGameLogic.prototype.Init = function(){
    this.actorFactory = new ActorFactory();
    this.actorFactory.RegisterComponentFactory();
    
    this.processMgr = new ProcessManager();
    
    g_evtMgr.Register(GameEvent.REQUEST_DESTROY_ACTOR, MAKEDELEGATE(this, RequestNewDestroyActorDelegate));
    
};

/**
 * That means we are joining an game already running
 * We are the remote player ?
 */
BaseGameLogic.prototype.SetProxy = function(){
    this.proxy = true;
    
    //TODO create websocket
    //https://www.html5rocks.com/en/tutorials/websockets/basics/
    //var connection = new WebSocket('ws://localhost/game');
    g_evtMgr.Register(GameEvent.REQUEST_NEW_ACTOR, MAKEDELEGATE(this, RequestNewActorDelegate));
    
    
    //this.physics = null;
};

var RequestNewActorDelegate = function(eventArgs){
    // This should only happen if the game logic is a proxy, 
    // and there's a server asking us to create an actor.
    if(!this.proxy){
        return;
    }
    
    //ok we are a remote player, let's do it
    
    var actorResource = eventArgs[0];
    var actorId = eventArgs[1];
    
    var actor = this.CreateActor(actorResource);
    if(actor){
        
        g_evtMgr.FireEvent(GameEvent.NEW_ACTOR, actor.GetId());
    }
};

var RequestNewDestroyActorDelegate = function(eventArgs){
    
};

BaseGameLogic.prototype.OnActorMoveDelegate = function(eventArgs){
    //this method should listen for an event fired from InputManager
    
};

BaseGameLogic.prototype.LoadGameDelegate = function(xmlData){
    // [rez] Override this function to do any game-specific loading.
    return true;
};

//called by GameApp::LoadGame on GameState.LoadingGameEnvironment
BaseGameLogic.prototype.LoadGame = function(levelName){
    var req = new FileSystem();
    var rootNode = req.ReadXMLFile(levelName);
    if(!rootNode){
        console.log("Failed to load level "+ levelName);
        return false;
    }    
    
    // load all initial actors
    var staticActorNode = rootNode.firstChild.firstElementChild;
    if(staticActorNode){
        var actors = staticActorNode.children;
        for(var i=0; i < actors.length; i++){
            var actorResource = actors[i].getAttribute("resource");
            var actor = this.CreateActor(actorResource);
            if(actor){
                g_evtMgr.FireEvent(GameEvent.NEW_ACTOR, actor.GetId());
            }
        }
    }
    
    //init all the human view
    for(var i=0; i < this.gameViewList.length; i++){
        var view = this.gameViewList[i];
        if(view.GetType() === GameView.HUMAN_VIEW){
            view.LoadGame(staticActorNode);
        }
    }
    
    if(!this.LoadGameDelegate(staticActorNode)){
        return false;
    }
    
    // trigger the Environment Loaded Game event 
    // - only then can player actors and AI be spawned!
    if(this.proxy){
        g_evtMgr.FireEvent(GameEvent.REMOTE_ENVIRONMENT_LOADED, levelName);
    }
    else{
        g_evtMgr.FireEvent(GameEvent.ENVIRONMENT_LOADED, levelName);
    }
    return true;
};

BaseGameLogic.prototype.AddView = function(view, /*optional?*/actorId){
    //++this.lastViewId
    view.Attach(actorId || 0, "view-"+UUID());
    this.gameViewList.push(view);
    
    //
    switch(view.GetType()){
        case GameView.HUMAN_VIEW:
           this.humanPlayersAttached++;
           break;
        case GameView.NETWORK_VIEW:
           this.remotePlayersAttached++;
           break;
        case GameView.AI_VIEW:
           this.AIPlayersAttached++;
           break;
    }
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

BaseGameLogic.prototype.CreateActor = function(actorResource, overridesXML/*optional*/, initialTransform/*optional*/, serversActorId/*optional*/){
    var overrides = overridesXML || null;
    var transform = initialTransform || null;
    var serverId  = serversActorId || null;
    /*
    if (!this.proxy && serverId !== null){
        return new Actor(serverId);
    }*/
    if (this.proxy /*&& serverId === null*/){
        return null;
    }
    
    
    //create the actor provided and fire an event
    var actor = this.actorFactory.CreateActor(actorResource);
    if(actor){
        this.actorsMap[actor.GetId()] = actor;
        if(!this.proxy && (this.gameState === GameState.SpawningPlayerActors || this.gameState === GameState.Running)){
            g_evtMgr.FireEvent(GameEvent.REQUEST_NEW_ACTOR, actorResource, actor.GetId());
        }
    }
    else{
        console.log("GameLogic.CreateActor failed: "+actorResource);
        return null;
    }
    return actor;
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
            //this.ChangeState(GameState.MainMenu);
            this.ChangeState(GameState.WaitingForPlayers);//we dont have a menu view yet
            break;
        case GameState.MainMenu:
            
            break;
        case GameState.WaitingForPlayers:
            
            if(this.expectedPlayers + this.expectedRemotePlayers === this.humanPlayersAttached){
                // The server sends us the level name as a part of the login message. 
                // We have to wait until it arrives before loading the level
                if(g_GameApp.gameOptions.level !== ""){
                    this.ChangeState(GameState.LoadingGameEnvironment);
                }
            }
            break;
        case GameState.Running:
            this.processMgr.Update(fDeltaTime);
            
            break;
        case GameState.WaitingForPlayersToLoadEnvironment:
            if(this.expectedPlayers + this.expectedRemotePlayers <= this.humanGamesLoaded){
                this.ChangeState(GameState.SpawningPlayerActors);
            }
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
        case GameState.WaitingForPlayers:
            
            //this.gameViewList pop menu view from the list 
            this.expectedPlayers = 1;
            this.expectedRemotePlayers = 0;//g_GameApp.gameOptions.expectedPlayers -1;
            if(g_GameApp.gameOptions.gameHost !== ""){
                this.SetProxy();
                this.expectedAI=0;// the server will create these
                this.expectedRemotePlayers =0;// the server will create these
                
                //attempt attach as client, if fails then redirect to MainMenu game state
                
            }
            else if(this.expectedPlayers > 0){
                //so, we will need prepare the environment to support remote players
                //we need to initialize the sockets
                
                
            }
            
            //extracted from TeapoWarsHumanView
            //spawn all local players 
            for(var i=0; i < this.expectedPlayers; i++){
                var humanView = new HumanView(g_GameApp.Renderer);
                this.AddView(humanView);
                if(this.proxy){
                    return;
                }
            }
            
            //spawn all remote players 
            for(var i=0; i < this.expectedRemotePlayers; i++){
                
            }
            
            //spawn all AI players 
            for(var i=0; i < this.expectedAI; i++){
                
            }
            
            break;
        case GameState.LoadingGameEnvironment:
            var status = g_GameApp.LoadGame();
            
            if(status){
                this.ChangeState(GameState.WaitingForPlayersToLoadEnvironment);
            }
            else{
                console.log("g_GameApp.LoadGame Failed to Load");
            }
            break;
        
        case GameState.SpawningPlayerActors:
            if(this.proxy){
                return;
            }
            
            for(var i=0; i < this.gameViewList.length; i++){
                switch(view.GetType()){
                    case GameView.HUMAN_VIEW:
                      
                       break;
                    case GameView.NETWORK_VIEW:
                       
                       break;
                    case GameView.AI_VIEW:
                       
                       break;
                }
            }
            break;
        case GameState.WaitingForPlayersToLoadEnvironment:
            
            
            break;
    }
    
    this.gameState = newGameState;
};

