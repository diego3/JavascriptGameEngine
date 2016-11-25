# Description

An simple javascript game engine.

I'am developing this engine only for learning some principles 
and patterns applicables to the game development!

The main aim is decoupling between all the game systems as possible


Features and todos
===================================
- [X]  Actor Component Architecture

- [X]  Game Looping pattern

- [X]  Application, Game Logic and View layers

- [ ]  Asset Manager for caching the game resources

- [ ]  Tile mapping 

- [ ]  Level loading screen


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
