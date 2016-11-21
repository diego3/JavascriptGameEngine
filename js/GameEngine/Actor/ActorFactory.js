
//specific actor factory
var ActorFactory = {
    
    Create: function(){ //TODO  load all the actor from a json or xml
        var actors = [];
        
        var ball = new Ball();
        var brender = new BallRendererComponent();
        ball.AddComponent(brender);
        actors.push(ball);
        
        return actors;
    }
    
};