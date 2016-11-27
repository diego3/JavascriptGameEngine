# Description

An simple javascript game engine.

I'am developing this engine only for learning some principles 
and patterns applicables to the game development!


# Game Coding Complete 4th

The architecture used by me int this engine is absolutly hard based on this book,

but this project is web, so some things I am adapting and try to use the new HTML5

components, as such WebSockets, WebWorkers, WebAudio etc.

There are too some pieces that are not possible to reproduce in a web environment, such like 

Scripting, because we are already in a scripting language.

Other thing is memory management! Javascript is a managed script language, so it has a 

garbage collector. I think it is an plus for every one who is beggining to game development, basically

you don't need to worry abount memory.


The main aim is learn the tools on game dev in a professional level!

Some cool things to learn:

* All the engine should be in a good and decent OOP way, allowing a code flexible and 

easy to mantain.

* HTML5 Tech, yeah, there are a lot of fun APIs to explore, that a big world :)




Features and todos
===================================
- [X]  Actor Component Architecture

- [X]  Game Looping pattern

- [X]  Application, Game Logic and View layers

- [ ]  Asset Manager for caching the game resources

- [ ]  Tile mapping 

- [ ]  Level loading screen

- [ ]  WebSound API

- [ ]  WebSocket API

- [ ]  Fullscreen API

- [ ]  2D Camera scrolling




Links
=========

http://codeincomplete.com/posts/javascript-game-foundations-the-game-loop/

http://sol.gfxile.net/interpolation/index.html

canvas docs -> http://www.rgraph.net/reference/fillrect.html

sobre game loop -> https://developer.mozilla.org/en-US/docs/Games/Anatomy


Server config
===================================

* Apache

```html
<VirtualHost *:80>
     ServerName jsengine.local
     DocumentRoot "D:\DIEGO\site\www\gameloop"
     SetEnv APPLICATION_ENV "development"
     <Directory "D:\DIEGO\site\www\gameloop">
         DirectoryIndex index.php index.html index.htm
         AllowOverride All
         Order allow,deny
         Allow from all
     </Directory>
  </VirtualHost>
```
