

var FileSystem = function(){};

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
    var http = new XMLHttpRequest();
    http.onprogress = this._OnProgress;
    http.usercallback = callback || null;
    http.onload  = this._OnComplete;
    http.onerror = this._OnError;
    http.myapp = this;
    
    http.onreadystatechange = function() {
      //if ((request.readyState == 4) && (request.status == 200)) // if DONE and SUCCESS
        //onsuccess(JSON.parse(request.responseText));
    };
    http.open("GET", resource + ".xml", true);//async
    http.send(null);
};

FileSystem.prototype.ReadXMLFile = function(resource){
    var fs = new XMLHttpRequest();
    fs.open("GET", resource + ".xml", false);//syncronous
    fs.send(null);
    
    return fs.responseXML;
};

 

