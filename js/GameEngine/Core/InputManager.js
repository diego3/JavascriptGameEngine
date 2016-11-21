var KEY = {
    BACKSPACE: 8,
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    SPACE: 32,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48, 
    ONE: 49, 
    TWO: 50, 
    THREE: 51, 
    FOUR: 52, 
    FIVE: 53, 
    SIX: 54, 
    SEVEN: 55, 
    EIGHT: 56,
    NINE: 57,
    A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    TILDA: 192
};


var InputManager = {
    
    lastPressedKey: null,
    
    Init: function(){
        document.addEventListener('keydown', function(ev) { 
            return InputManager.OnKey(ev, ev.keyCode, true);  
        }, false);

        document.addEventListener('keyup', function(ev) { 
            return InputManager.OnKey(ev, ev.keyCode, false); 
        }, false);
        
        document.getElementById("start").addEventListener("click", function(evt){
            
        }, false);
        
        document.getElementById("stop").addEventListener("click", function(evt){
            
        }, false);
    },
    OnKey: function(ev, key, pressed) {
        switch(key) {
            case KEY.LEFT: 
                //document.trigger("Actor:MoveLeft");
                
                console.log("left key");
                ev.preventDefault(); 
            break;
            case KEY.RIGHT: 
                console.log("right key");
                ev.preventDefault(); 
                break;
            case KEY.SPACE: 

                ev.preventDefault(); 
            break;
        }
    }

};