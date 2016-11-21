

var AssetManager = function(){
    this.request = null;
    this.assets = {};
};


AssetManager.prototype.LoadTexture = function(fileName){
    var $this = this;
    if(this.assets[fileName]){
        return $this.assets[fileName];
    }
    
    $this.request.load(fileName, function(resp){
        $this.assets[fileName] = "somecontent";
        
        //fire an event ?  content loaded ?
    });
    
    
};