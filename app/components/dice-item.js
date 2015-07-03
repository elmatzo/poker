import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    rollDice: function(dice){
      dice.set('score', Math.floor(Math.random() * dice.get('faces'))+1);
    },
    deleteDice: function(dice){
      dice.deleteRecord();
    }
  }
});
