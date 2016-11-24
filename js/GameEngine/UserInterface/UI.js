
/* global IScreenElement, vec2 */

var ButtonScreenElement = function(){
    this.width = 100;
    this.height = 40;
    this.pos = vec2.create();
    this.textLabel = "Button";
    
};
ButtonScreenElement.Extends(IScreenElement);


ButtonScreenElement.prototype.OnRender = function(fDeltaTime){
    
};

