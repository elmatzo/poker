export default function(){
  this.transition(
    this.childOf('.dice'),
    this.use('toLeft')
  );
  this.transition(
    this.childOf('.game'),
    this.use('toRight')
  );
  this.transition(
    this.childOf('.settings-prop'),
    this.toValue(function(toValue, fromValue) {
      return toValue && fromValue && toValue > fromValue;
    }),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
