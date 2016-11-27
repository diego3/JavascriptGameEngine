
//specific actor factory
var ActorFactory = function () {
    this.actorMap = {};
    this.lastActorId = 1;
    this.componentFactory = {};
};

ActorFactory.prototype.RegisterComponentFactory = function () {
    this.componentFactory[TransformComponent.NAME]  = TransformComponent;
    this.componentFactory[BaseRenderComponent.NAME] = BaseRenderComponent;
    this.componentFactory[WASDControllerComponent.NAME] = WASDControllerComponent;
    this.componentFactory[AIComponent.NAME] = AIComponent;
    this.componentFactory[SpriteComponent.NAME] = SpriteComponent;
    
    
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
    var actorTag = actorNode.getAttribute("tag");
    var actor = new Actor(existingActorId || factory.GetNextActorId(),actorTag);
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
            console.log("component is null " + componentXmlNode.nodeName);
        }
    }
    actor.PosInit();
    return actor;
};

ActorFactory.prototype.CreateComponent = function (xmlNode) {
    var name = xmlNode.nodeName;
    
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