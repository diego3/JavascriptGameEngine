

var SoundComponent = function(){
    /**
     * @property {HTMLAudioElement} sound The sound instance 
     */
    this.sound = null;
};
SoundComponent.Extends(ActorComponent);

SoundComponent.NAME = "SoundComponent";
SoundComponent.prototype.GetName = function(){return SoundComponent.NAME;};
SoundComponent.prototype.Init = function(xmlData){
    var sound = xmlData.getElementsByTagName("Sound")[0];
    if(!sound){
        console.log("Are you missing Sound tag for sound component?");        
        return false;
    }
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
    var source = sound.getAttribute("src");
    
    var amg = new AssetManager();
    this.sound = amg.LoadSound(source);
    return true;
};





