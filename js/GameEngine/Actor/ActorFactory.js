
//specific actor factory
var ActorFactory = function(){
    this.actorMap = {};
    this.lastActorId = 0;
};
    
ActorFactory.prototype.GetNextActorId = function(){
    return ++this.lastActorId;
};

ActorFactory.prototype.CreateActor = function(actorResource){
    var factory = this;
    var req = new Request();
    req.ReadFile(actorResource, function(rootNode){
        var actorNode = rootNode.firstChild;
        if(actorNode.nodeName !== "Actor"){
            console.log("Actor node not found in "+actorResource);
            return;
        }
        
        //create the Actor instance
        var existingActorId = actorNode.getAttribute("id");
        var actor = new Actor(existingActorId || factory.GetNextActorId());
        factory.actorMap[actor.GetId()] = actor;
        
        //g_evtMgr.FireEvent("ACTOR_CREATED", actor.GetId());
        
        var children = actorNode.children;
        for(var i=0; i < children.length; i++){
            var componentXmlNode = children[i];
            var actorComponent = factory.CreateComponent(componentXmlNode);
            if(actorComponent){
                actor.AddComponent(actorComponent);
                actorComponent.SetOwner(actor);
            }
            else{
                console.log("component is null "+componentXmlNode);
            }
        }
        
        actor.PosInit();
    });
};

ActorFactory.prototype.CreateComponent = function(xmlNode){
   //create component from xml
   console.log("CreateComponent node", xmlNode);
   //xmlNode.getAttribute("type");
   var name = xmlNode.nodeName;
   //new name;
   
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