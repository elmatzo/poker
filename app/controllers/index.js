import Ember from 'ember';

export default Ember.Controller.extend({
  diceFaces: 6,

  randomMode: false,

  maxDices: 2,

  showError: function() {
    return false;
  }.property(),

  showProgressBar: function() {
    return this.get('diceCounter') > 0;
  }.property('diceCounter'),

  diceCounter: function() {
    var allDices = this.get('model');
    return allDices.get('length');
  }.property('model.@each'),

  diceSum: function() {
    var allDices = this.get('model');
    var sum = 0;
    allDices.forEach(function(dice) {
      sum+=dice.get('score');
    });
    return sum;
  }.property('model.@each.score'),

  game: function() {
    var games = ['crazy swagapple', 'holdem', 'omaha'];
    var pos = Math.floor(Math.random()*3);
    return games[pos];
  }.property('model.@each.score'),

  maxSum: function() {
    var allDices = this.get('model');
    var sum = 0;
    allDices.forEach(function(dice) {
      sum+=dice.get('faces');
    });
    return sum;
  }.property('model.@each.faces'),

  sumPercent: function() {
    if(this.get('diceCounter') > 0){
      var percent = 'width: ' + Math.round(this.get('diceSum') / (this.get('maxSum')/100)) + "%";
      return percent.htmlSafe();
    }
    return 0;
  }.property('diceSum', 'maxSum'),

  deleteAllDices: function() {
    var allDices = this.get('model');
    allDices.forEach(function(dice) {
      dice.deleteRecord();
    });
  },

  actions: {
    createDice: function(newFaces) {
      if(!this.get('randomMode')){
        var dice = this.store.createRecord('dice', {
          faces: newFaces,
          score: Math.floor(Math.random() * newFaces)+1
        });
        this.set('showError', false);
      }
    },
    incrementFaces: function() {
        this.incrementProperty('diceFaces');
    },
    decrementFaces: function() {
      if(this.get('diceFaces')>2){
        this.decrementProperty('diceFaces');
      }
    },
    incrementDices: function() {
      this.incrementProperty('maxDices');
    },
    decrementDices: function() {
      if(this.get('maxDices')>1){
        this.decrementProperty('maxDices');
      }
    },
    rollAll: function() {
      if(this.get('randomMode')){
        var randomDiceAmount = Math.floor(Math.random() * this.get('maxDices'))+1;
        if(randomDiceAmount !== this.get('model').get('length')){
          this.deleteAllDices();
          var faces = this.get('diceFaces');
          for(var i=0; i<randomDiceAmount; i++){
            var dice = this.store.createRecord('dice', {
                faces: faces,
                score: Math.floor(Math.random() * faces)+1
            });
          }
          return;
        }
      }
      else{
        if(this.get('model').get('length') === 0){
          this.set('showError', true);
          return;
        }
      }
      var allDices = this.get('model');
      allDices.forEach(function(dice) {
        var newScore = Math.floor(Math.random() * dice.get('faces'))+1;
        dice.set('score', newScore);
      });
    },
    toggleMode: function() {
      this.set('showError', false);
      this.deleteAllDices();
      this.toggleProperty('randomMode');
    }
  }
});
