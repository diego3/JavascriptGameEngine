<?php


?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Game Engine project</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
    
    <link rel="stylesheet" href="css/app.css">
    
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
      <div id="topbar" class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <span id="engine-title">Js GameEngine</span>
        </div>
      </div>
    
    
    <div id="topbar" class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <a href="#" id="start" class="btn btn-default"><i class="glyphicon glyphicon-play"></i>START</a>
            <a href="#" id="stop" class="btn btn-default"><i class="glyphicon glyphicon-stop"></i>STOP</a>
            <a href="#" id="advframe" class="btn btn-default">FRAME</a>
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <canvas id="canvas" width="800" height="600" class=""></canvas>
        </div>
        
    </div>
    
    <script src="js/GameEngine/3rdParty/toji-gl-matrix-2aa7274/dist/gl-matrix.js"></script>
    <script data-main="js/app" src="js/GameEngine/3rdParty/requirejs.js"></script>
    
  </body>
</html>
