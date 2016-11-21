var Collision = {
    
    overlap: function(box1, box2) {
        return !((box1.right  < box2.left)  ||
                (box1.left   > box2.right)  ||
                (box1.top    > box2.bottom) ||
                (box1.bottom < box2.top));
    }
    
};