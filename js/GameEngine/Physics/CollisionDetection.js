
//nice tutorial about collision detection and spatial partitioning
//http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/

//this is a nice collistion detection lib implementing spatial partitioning
//https://github.com/RonenNess/SSCD.js

var Collision = {
    
    overlap: function(box1, box2) {
        return !((box1.right  < box2.left)  ||
                (box1.left   > box2.right)  ||
                (box1.top    > box2.bottom) ||
                (box1.bottom < box2.top));
    }
    
};