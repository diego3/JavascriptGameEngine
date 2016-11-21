/**
 * This is the entry point to your game!
 * 
 */
define(function(require){ 
    require("./GameEngine/Core/Heranca1");
    require("./GameEngine/Core/InputManager");
    require("./GameEngine/Actor/Actor");
    require("./GameEngine/Actor/ActorFactory");
    require("./GameEngine/Actor/BallActors");//just for testings
    require("./GameEngine/Scene/Scene");
    require("./GameEngine/UserInterface/HumanView");
    require("./GameEngine/Core/BaseGameLogic");
    require("./GameEngine/Core/BaseApplication");
    
    var g_GameApp = new BaseApplication();
    //console.log(g_GameApp);
    
    g_GameApp.Initialize();
    
    
});