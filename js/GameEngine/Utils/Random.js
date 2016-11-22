var Random = {

  Get: function(min, max) {
    return (min + (Math.random() * (max - min)));
  },

  Int: function(min, max) {
    return Math.round(this.random(min, max));
  },

  Choise: function(choices) {
    return choices[this.randomInt(0, choices.length-1)];
  },

  Bool: function() {
    return this.Choise([true, false]);
  }
  
};