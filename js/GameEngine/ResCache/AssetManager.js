

var AssetManager = function(){
    this.assets = {};
    this.loadedItens = 0;
    this.totalItens = 0;
    this.loaded = false;
};

AssetManager.prototype.OnLoadImage = function(e){
    var $this = this.assetManager;
     
    $this.loaded = true;
    $this.loadedItens++;
    
    if($this.loadedItens === $this.totalItens){
        //g_evtMgr.FireEvent("PRELOADED_RESOURCE_CACHE", e);
    }
};

AssetManager.prototype.PreLoadImages = function(itensList){
    this.totalItens = itensList.length;
    for(var i=0; i < itensList.length; i++){
        this.LoadImage(itensList[i]);
    }
};

AssetManager.prototype.LoadImage = function(resourcePath){
    var key = resourcePath.substr(resourcePath.lastIndexOf("/")+1, resourcePath.length);//.replace(".xml","");
    
    if(this.assets[key]){//key is the file name :)
        return this.assets[key];
    }
    
    var img = new Image();
    img.src = resourcePath;
    img.onload = this.OnLoadImage;
    this.assets[key] = img;
    return img;
};