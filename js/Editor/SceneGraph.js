

/**
 * The goal is be able to visualizate the scene graph hierarchy in real-time 
 * 
 */

var SceneGraph = function(){
    this.rootElement = document.getElementById("rootGraphElement");//ul or div
    
};

SceneGraph.prototype.RegisterDelegates = function(){
    g_evtMgr.Register("NEW_RENDER_COMPONENT", MAKEDELEGATE(this, OnNewNodeAdded));
};

var OnNewNodeAdded = function(actorId, sceneNode){
    //TODO... add the node into DOM
    
    //load de icon depending the actor type :)
    
    
};

var OnNodeRemoved = function(actorId, sceneNode){
    //TODO... remove the node from the DOM
    
};

