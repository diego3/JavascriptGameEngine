

var AssetManager = function(){
    this.assets = {};
    this.loadedItens = 0;
    this.totalItens = 0;
    this.loaded = false;
};

AssetManager.prototype.OnLoadImage = function(e){
    var $this = this.assetManager;
     
    $this.loadedItens++;
    
    if($this.loadedItens === $this.totalItens){
        $this.loaded = true;
        g_evtMgr.FireEvent("PRELOADED_RESOURCE_CACHE");
    }
};

AssetManager.prototype.PreLoadImages = function(itensList){
    this.totalItens += itensList.length;
    for(var i=0; i < itensList.length; i++){
        this.LoadImage(itensList[i]);
    }
};

AssetManager.prototype.PreLoadSounds = function(soundList){
    this.totalItens += soundList.length;
    for(var i=0; i < soundList.length; i++){
        this.LoadSound(soundList[i]);
    }
};

AssetManager.prototype.GetSound = function(soundFilePath){
    var key = soundFilePath.substr(soundFilePath.lastIndexOf("/")+1, soundFilePath.length);//.replace(".xml","");
    
    if(this.assets[key]){//key is the file name :)
        return this.assets[key];
    }
    
    var s = new Audio(soundFilePath);
    s.src = soundFilePath;
    //s.onload = this.OnLoadSound;
    this.assets[key] = s;
    return s;
};

AssetManager.prototype.GetImage = function(resourcePath){
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