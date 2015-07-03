import DS from 'ember-data';

export default DS.Model.extend({
  faces: DS.attr('number'),
  score: DS.attr('number')
}).reopenClass({
    FIXTURES: [
    ]
});
