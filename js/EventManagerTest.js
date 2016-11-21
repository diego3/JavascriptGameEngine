

define(function(require){
   
    require("GameEngine/Core/Heranca1");
    require("GameEngine/Actor/Actor");
    require("GameEngine/Core/EventManager");
    require("GameEngine/Core/InputManager");
    
    var evtMgr = new EventManager();
    
    var Player = function(id){
        this.m_id = id;
    };
    Player.Extends(Actor);
    Player.prototype.DoSomethingCoolDelegate = function(params){
        console.log("I'am receiving ", params, "params");
    };
    
    var hero = new Player(123456);
    
    evtMgr.Register("EVENT1", hero.DoSomethingCoolDelegate);
    
    
    document.getElementById("fire").addEventListener("click",function(evt){
        console.log("button fire work");
        evtMgr.FireEvent("EVENT1", 88);
        console.log("EventManager instance", evtMgr);
    });
});