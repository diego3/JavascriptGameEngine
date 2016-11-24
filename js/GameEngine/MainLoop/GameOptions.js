
var GameOptions = {
    // Level option
    level: "",
    
    // Rendering options
    renderer: "2d",//webgl
    runFullSpeed: false,
    m_ScreenSize: {width:800, height: 600},
    
    // Sound options
    soundEffectsVolume: 50,
    musicVolume: 90,
    
    //Multiplayer options
    expectedPlayers: 1,
    listenPort: 80,
    gameHost: "jsengine.local",
    numAIs: 0,
    maxAIs: 10,
    maxPlayers: 2,
    
    //resource cache options
    useDevelopmentDirectories: false,
    // TiXmlElement - look at this to find other options added by the developer
    xmlElement: null,
    
    Init: function (xmlFilePath, /*optional*/ cmdLine) {
        var cmd = cmdLine || null;

    }
};

