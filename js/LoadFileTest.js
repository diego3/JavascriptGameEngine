
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
    console.log(factoryInstance);
           
    document.getElementById("load").addEventListener("click",function(evt){
        console.log("button LOAD work");
        
        //var req = new Request();
        //req.ReadFile("../Assets/Actor/Ball");
        factory.CreateActor("../Assets/Actor/Ball");
        
    });
});