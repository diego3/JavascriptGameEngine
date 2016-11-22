//http://phrogz.net/js/classes/OOPinJS2.html

Function.prototype.Extends = function( parentClassOrObject ){ 
    if ( parentClassOrObject.constructor === Function){ 
        //Normal Inheritance 
        this.prototype = new parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    } 
    else { 
        //Pure Virtual Inheritance 
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    } 
    return this;
}; 

// Useful for making the "arguments" object a true array and also for creating a
// copy of an existing array.
function _toArray8484dssds254(obj) {
    return Array.prototype.slice.call(obj);
}
//http://fitzgeraldnick.com/2010/05/20/javascript-bind-and-this.html
function MAKEDELEGATE(scope, fn) {
    return function () {
        return fn.apply(scope, _toArray8484dssds254(arguments));
    };
}