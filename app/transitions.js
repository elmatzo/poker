export default function(){
  this.transition(
    this.childOf('.dice'),
    this.use('toLeft')
  );
  this.transition(
    this.childOf('.game'),
    this.use('toRight')
  );
};
