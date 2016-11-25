

var IScreenElement = function(){
    this.zorder = 0;
    this.visible = true;
};
IScreenElement.prototype.OnUpdate = function(fDeltaTime){};
IScreenElement.prototype.OnRender = function(fDeltaTime){};
IScreenElement.prototype.SetZOrder = function(z){ this.zorder = z;};
IScreenElement.prototype.GetZOrder = function(){ return this.zorder;};
IScreenElement.prototype.IsVisible = function(){ return this.visible;};
IScreenElement.prototype.SetVisible = function(boolValue){ this.visible = boolValue || true;};
IScreenElement.prototype.ProcessInput = function(){};
IScreenElement.prototype.compare = function(otherScreenElement){
    if(this.zorder < otherScreenElement.GetZOrder()){
        return -1;
    }
    else if(this.zorder > otherScreenElement.GetZOrder()){
        return 1;
    }
    return 0;
};
IScreenElement.prototype.OnLostDevice = function(){};
IScreenElement.prototype.OnRestore = function(){};