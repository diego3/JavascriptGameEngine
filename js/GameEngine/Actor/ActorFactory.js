
//specific actor factory
var ActorFactory = function () {
    this.actorMap = {};
    this.lastActorId = 1;
    this.componentFactory = {};
};

ActorFactory.prototype.RegisterComponentFactory = function () {
    this.componentFactory[TransformComponent.NAME]  = TransformComponent;
    this.componentFactory[BaseRenderComponent.NAME] = BaseRenderComponent;
    
    
    //http://robdodson.me/javascript-design-patterns-factory/
};

ActorFactory.prototype.GetNextActorId = function () {
//    this.lastActorId++;
//    return this.lastActorId;
    return UUID();
};

ActorFactory.prototype.CreateActor = function (actorResource) {
    var factory = this;
    var req = new FileSystem();
    
    var rootNode = req.ReadXMLFile(actorResource);
    var actorNode = rootNode.firstChild;
    if (actorNode.nodeName !== "Actor") {
        console.log("Actor node not found in " + actorResource);
        return;
    }

    //create the Actor instance
    var existingActorId = actorNode.getAttribute("id");
    var actor = new Actor(existingActorId || factory.GetNextActorId());
    factory.actorMap[actor.GetId()] = actor;

    var children = actorNode.children;
    for (var i = 0; i < children.length; i++) {
        var componentXmlNode = children[i];
        var actorComponent = factory.CreateComponent(componentXmlNode);
        if (actorComponent) {
            actor.AddComponent(actorComponent);
            actorComponent.SetOwner(actor);
        }
        else {
            console.log("component is null " + componentXmlNode);
        }
    }
    actor.PosInit();
    return actor;
};

ActorFactory.prototype.CreateComponent = function (xmlNode) {
    //console.log("CreateComponent node", xmlNode);
    //xmlNode.getAttribute("type");
    var name = xmlNode.nodeName;
    
    //console.log("this.componentFactory", this.componentFactory);
    if (!this.componentFactory[name]) {
        return null;
    }

    var component = new this.componentFactory[name]();
    if (!component) {
        console.log("componentFactory method failed: " + name);
        return null;
    }
    if (!component.Init(xmlNode)) {
        console.log("Failed to init component: " + name);
        return null;
    }
    return component;
};

/**
 * This is just for quick test
 * 
 * @returns {ActorFactory.actorMap}
 */
ActorFactory.prototype.CreateBall = function () {
    //TODO  load all the actor from a json or xml
    var ball = new Ball(this.GetNextActorId());

    var brender = new BallRendererComponent();
    ball.AddComponent(brender);

    this.actorMap[ball.m_id] = ball;

    return ball;
};