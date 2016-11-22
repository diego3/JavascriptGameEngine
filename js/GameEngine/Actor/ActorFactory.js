
//specific actor factory
var ActorFactory = function(){
    this.actorMap = {};
    this.lastActorId = 0;
};
    
ActorFactory.prototype.GetNextActorId = function(){
    return ++this.lastActorId;
};

ActorFactory.prototype.CreateActor = function(actorResource){
    //load actor from xml
    var factory = this;
    var req = new Request();
    req.ReadFile(actorResource, function(rootNode){
        //console.log("rootNode", rootNode);
        
        var actorNode = rootNode.firstChild;
        if(actorNode.nodeName !== "Actor"){
            console.log("No Actor node found in "+actorResource);
            return;
        }
        
        //create the Actor instance
        var existingActorId = actorNode.getAttribute("id");
        var actor = new Actor(existingActorId || factory.GetNextActorId());
        factory.actorMap[actor.GetId()] = actor;
        
        //g_evtMgr.FireEvent("ACTOR_CREATED", actor.GetId());
        
        var children = actorNode.children;
        for(var i=0; i < children.length; i++){
            var component = children[i];
            factory.CreateComponent(component);
        }
    });
};

ActorFactory.prototype.CreateComponent = function(xmlNode){
   //create component from xml
   console.log("CreateComponent node", xmlNode);
   //xmlNode.getAttribute("type");
   
   
   
   //g_evtMgr.FireEvent("ACTORCOMPONENT_CREATED", component.GetId());
};

/**
 * This is just for quick test
 * 
 * @returns {ActorFactory.actorMap}
 */
ActorFactory.prototype.CreateBall = function(){ 
    //TODO  load all the actor from a json or xml
    var ball = new Ball(this.GetNextActorId());
    
    var brender = new BallRendererComponent();
    ball.AddComponent(brender);
    
    this.actorMap[ball.m_id] = ball;
    
    return this.actorMap;
};