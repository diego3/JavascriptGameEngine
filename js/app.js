/**
 * 
 * 
 *  
 * 
 * 
 */

define(function(require){
    
    require("./GameEngine/Core/Heranca1");
    require("./GameEngine/Core/InputManager");
    require("./GameEngine/Scene/Scene");
    require("./GameEngine/UserInterface/HumanView");
    require("./GameEngine/Core/BaseGameLogic");
    require("./GameEngine/Core/BaseApplication");
    
    var g_GameApp = new BaseApplication();
    console.log(g_GameApp);
    
    g_GameApp.Initialize();
    
    
});