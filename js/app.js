/**
 * This is the entry point to your game!
 * 
 */

var g_GameApp = null;
var g_evtMgr = null;

define(function(require){ 
    require("./GameEngine/Core/Heranca1");
    require("./GameEngine/Core/EventManager");
    require("./GameEngine/Core/InputManager");
    require("./GameEngine/Utils/Color");
    require("./GameEngine/Utils/MathUtils");
    require("./GameEngine/Utils/Random");
    require("./GameEngine/Utils/XMLHttpRequest");
    require("./GameEngine/Actor/Actor");
    require("./GameEngine/Actor/ActorFactory");
    require("./GameEngine/Actor/BallActors");//just for testings
    require("./GameEngine/Scene/Scene");
    require("./GameEngine/UserInterface/HumanView");
    require("./GameEngine/Core/BaseGameLogic");
    require("./GameEngine/Core/BaseApplication");
    
    g_GameApp = new BaseApplication();
    //console.log(g_GameApp);
    
    g_GameApp.Initialize();
    
    
});