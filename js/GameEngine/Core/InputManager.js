/* global GameEvent, g_evtMgr, EditorEvent, vec2 */
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
    
    keys: [],
    mouse:{
        x:0,
        y:0
    },
    
    IsKeyPressed:function(key){
        return this.keys[key];  
    },
    
    GetMousePosVec2:function(){
        var vpos = vec2.create();
        vec2.set(vpos, this.mouse.x, this.mouse.y);
        return vpos;
    },
    
    MouseIntersectVec2:function(/*Rectangle*/ point2D){
        if(this.mouse.x >= point2D.x &&
           this.mouse.x <= point2D.x + point2D.width && //point2D.x + point2D.width = right     
           this.mouse.y <= point2D.y &&
           this.mouse.y >= point2D.y + point2D.height){
            return true;
        }
        return false;
    },
    MouseIntersect:function(x, y){
        
    },
    Init: function(){
        var canvas = document.getElementById("canvas");
        document.addEventListener('keydown', function(ev) { 
            InputManager.OnKey(ev, ev.keyCode, true);  
        }, false);

        document.addEventListener('keyup', function(ev) { 
            InputManager.OnKey(ev, ev.keyCode, false); 
        }, false);
        
        
        //element.addEventListener("mousedown", this.OnMouseDown, false);
        //element.addEventListener("mouseup", this.OnMouseUp, false);
       // element.addEventListener("mouseout", this.OnMouseOut, false);
        canvas.addEventListener("mousemove", this.OnMouseMove, false);
        canvas.addEventListener("click", function(evt){
            console.log("click target", evt);
        }, false);
        
        document.getElementById("start").addEventListener("click", function(evt){
            g_evtMgr.FireEvent(EditorEvent.START_ENGINE);
        }, false);
        
        document.getElementById("stop").addEventListener("click", function(evt){
            g_evtMgr.FireEvent(EditorEvent.PAUSE_FRAME);
        }, false);
        document.getElementById("advanceframe").addEventListener("click", function(evt){
            g_evtMgr.FireEvent(EditorEvent.ADVANCE_FRAME);
        }, false);
    },
    OnMouseMove:function(evt){
        InputManager.mouse.x = evt.x;
        InputManager.mouse.y = evt.y;
    },
    OnKey: function(ev, key, pressed) {
        this.keys[key] = pressed;
        switch(key) {
            case KEY.LEFT: 
                
                //g_evtMgr.FireEvent(GameEvent.ACTOR_MOVE, -1);
                ev.preventDefault(); 
            break;
            case KEY.RIGHT:
                //this.lastPressedKey = pressed ? KEY.RIGHT : null;
                //g_evtMgr.FireEvent(GameEvent.ACTOR_MOVE, 1);
                ev.preventDefault(); 
                break;
            case KEY.SPACE: 
                //this.lastPressedKey = pressed ? KEY.SPACE : null;
                
                ev.preventDefault(); 
            break;
        }
        console.log(this.keys);
    }

};