

var BaseApplication = function(){
    this.IsRunning = false;
    this.RequestAnimId = 0;
    this.actors = [];
    
};

BaseApplication.prototype.GameUpdate = function(){
    var t = new Date().getTime();
    var delta = t - lastUpdate;
    this.Update(delta);
    this.Render();
    lastUpdate = new Date().getTime();
    this.RequestAnimId = window.requestAnimationFrame(this.GameUpdate);
};

BaseApplication.prototype.Update = function(fDeltaTime){
    for(var Actor in this.actors){
        //Actor.Update(fDeltaTime);
    }
};