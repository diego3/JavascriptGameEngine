
define(function(require){
    //require("./GameEngine/3rdParty/toji-gl-matrix-2aa7274/dist/gl-matrix");
    require("./GameEngine/Core/Heranca1");
    require("./GameEngine/Core/EventManager");
    require("./GameEngine/Core/InputManager");
    require("./GameEngine/Utils/Random");
    require("./GameEngine/Utils/XMLHttpRequest");
    require("./GameEngine/Actor/Actor");
    require("./GameEngine/Actor/ActorFactory");
    
    var factory = new ActorFactory();
    factory.RegisterComponentFactory();
    
    document.getElementById("load").addEventListener("click",function(evt){
        
        var ball = factory.CreateActor("../Assets/Actor/Ball");
        console.log("ball", ball);
    });
});