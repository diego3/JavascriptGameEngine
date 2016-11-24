

var FileSystem = function(){
    this.http = new XMLHttpRequest();
};

FileSystem.prototype._OnComplete = function(resp){
    //console.log("_OnComplete resp", resp);
    var xml = resp.target.responseXML;
    
    var xhr = this;//this here is NOT the Request class instance **caution**
    if(xhr.usercallback){
        xhr.usercallback(xml);
    }
    
    
};

FileSystem.prototype._OnError = function(e){
    console.log("_OnError", e);
};

FileSystem.prototype.ReadFile = function(resource, callback){
    this.http.onprogress = this._OnProgress;
    this.http.usercallback = callback || null;
    this.http.onload  = this._OnComplete;
    this.http.onerror = this._OnError;
    this.http.myapp = this;
    
    this.http.onreadystatechange = function() {
      //if ((request.readyState == 4) && (request.status == 200)) // if DONE and SUCCESS
        //onsuccess(JSON.parse(request.responseText));
    };
    this.http.open("GET", resource + ".xml", true);
    this.http.send(null);
};

FileSystem.prototype.ReadXMLFile = function(resource){
    var fs = new XMLHttpRequest();
    fs.open("GET", resource + ".xml", false);
    fs.send(null);
    
    return fs.responseXML;
};

 
