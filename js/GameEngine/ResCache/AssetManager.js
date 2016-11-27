

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

AssetManager.prototype.OnLoadSound = function(e){
    var $this = this.assetManager;
     
    $this.loadedItens++;
    
    if($this.loadedItens === $this.totalItens){
        $this.loaded = true;
        g_evtMgr.FireEvent("PRELOADED_AUDIORESOURCE_CACHE");
    }
};

AssetManager.prototype.PreLoadImages = function(itensList){
    this.totalItens += itensList.length;
    for(var i=0; i < itensList.length; i++){
        this.GetImage(itensList[i]);
    }
};

AssetManager.prototype.PreLoadSounds = function(soundList){
    this.totalItens += soundList.length;
    for(var i=0; i < soundList.length; i++){
        this.GetSound(soundList[i]);
    }
};

AssetManager.prototype.GetSound = function(soundFilePath){
    var key = soundFilePath.substr(soundFilePath.lastIndexOf("/")+1, soundFilePath.length);//.replace(".xml","");
    
    if(this.assets[key]){//key is the file name :)
        return this.assets[key];
    }
    
    var audio = new Audio(soundFilePath);
    audio.src = soundFilePath;
    audio.addEventListener("canplaythrough", this.OnLoadSound, false);
    this.assets[key] = audio;
    return audio;
};

AssetManager.prototype.GetImage = function(resourcePath){
    var key = resourcePath.substr(resourcePath.lastIndexOf("/")+1, resourcePath.length);//.replace(".xml","");
    
    if(this.assets[key]){//key is the file name :)
        return this.assets[key];
    }
    
    var img = new Image();
    img.src = resourcePath;
    img.assetManager = this;
    img.onload = this.OnLoadImage;
    this.assets[key] = img;
    return img;
};