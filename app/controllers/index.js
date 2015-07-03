import Ember from 'ember';

export default Ember.Controller.extend({
  diceFaces: 6,

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

  actions: {
    createDice: function(newFaces) {
      var dice = this.store.createRecord('dice', {
        faces: newFaces,
        score: Math.floor(Math.random() * newFaces)+1,
        css: this.get('isEven')
      });
    },
    incrementFaces: function() {
      if(this.get('diceFaces')<6){
        this.incrementProperty('diceFaces');
      }
    },
    decrementFaces: function() {
      if(this.get('diceFaces')>2){
        this.decrementProperty('diceFaces');
      }
    },
    rollAll: function() {
      var allDices = this.get('model');
      allDices.forEach(function(dice) {
        var newScore = Math.floor(Math.random() * dice.get('faces'))+1;
        dice.set('score', newScore);
      });
    }
  }
});
