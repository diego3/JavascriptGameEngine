
var SpriteComponent = function(){
    this.m_sceneNode = null;
    /**
     * @property {HTMLImageElement} texture The Image instance to be used into a renderer draw call
     */
    this.texture = null;
};
SpriteComponent.Extends(ActorComponent);
SpriteComponent.prototype.VOnRender = function(){
    
};
SpriteComponent.NAME = "SpriteComponent";
SpriteComponent.prototype.GetName = function() { return SpriteComponent.NAME;};
SpriteComponent.prototype.CreateSceneNode = function(){//factory method
    var transform= this.GetOwner().GetComponent(TransformComponent.NAME);
    return new SpriteSceneNode(this.GetOwner().GetId(), this, transform);
};
SpriteComponent.prototype.GetSceneNode=function(){
    if(!this.m_sceneNode){
        this.m_sceneNode = this.CreateSceneNode();
    }
    return this.m_sceneNode;
};

SpriteComponent.prototype.Init = function(xmlData){
    var texture = xmlData.getElementsByTagName("Texture")[0];
    if(!texture){
        console.log("Are you missing Texture tag for render component?");        
        return false;
    }
    
    var textureSource = texture.getAttribute("src");
    
    //load and set this.texture with a Image instance
    var amg = new AssetManager();
    this.texture = amg.GetImage(textureSource);
    return true;
};

SpriteComponent.prototype.PosInit = function(){
    var sceneNode = this.GetSceneNode();
    g_evtMgr.FireEvent("NEW_RENDER_COMPONENT", this.GetOwner().GetId(), sceneNode);
    //principal listener is Scene class
};
