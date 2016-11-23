
define(function(require){
    require("./GameEngine/Core/Heranca1");
    require("./GameEngine/Core/EventManager");
    require("./GameEngine/Core/InputManager");
    require("./GameEngine/Utils/Random");
    require("./GameEngine/Utils/XMLHttpRequest");
    require("./GameEngine/Actor/Actor");
    require("./GameEngine/Actor/ActorFactory");
    
    var factory = new ActorFactory();
    
    //http://robdodson.me/javascript-design-patterns-factory/
    var factoryClassName = "ActorFactory";
    var factoryInstance = Object.create(ActorFactory);
    
    
    //map interator
    var map = {};
    var p1 = new ActorFactory();
    var p2 = new ActorFactory();
    var p3 = new ActorFactory();
    var p4 = new ActorFactory();
    var p5 = new ActorFactory();
    map["p1"] = p1;
    map["p2"] = p2;
    map["p3"] = p3;
    map["p4"] = p4;
    map["p5"] = p5;
    
    for(var actorKey in map){
        map[actorKey].GetNextActorId();
    }
    
    document.getElementById("load").addEventListener("click",function(evt){
        console.log("button LOAD work");
        
        //var req = new Request();
        //req.ReadFile("../Assets/Actor/Ball");
        factory.CreateActor("../Assets/Actor/Ball");
        
    });
});