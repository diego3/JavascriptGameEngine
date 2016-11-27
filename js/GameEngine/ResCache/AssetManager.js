

var AssetManager = function(){
    this.assets = {};
};

AssetManager.prototype.OnLoadImage = function(e){
    var $this = this.assetManager;
    
    console.log("OnLoadImage evt", e);
    //$this.assets[] = 
    
    g_evtMgr.FireEvent("IMAGE_LOADED", e);
};

AssetManager.prototype.LoadImage = function(resourcePath){
    
    if(this.assets[resourcePath]){
        return this.assets[resourcePath];
    }
    
    var img = new Image();
    img.assetManager = this;
    img.src = resourcePath;
    img.onload = this.OnLoadImage;
    
   
    
    
};