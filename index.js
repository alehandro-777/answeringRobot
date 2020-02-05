// get the reference of EventEmitter class of events module
var events = require('events');

class State {
    constructor (name) {
        this.name = name;
    }
    stateChanging(sm, newState)
    {
        sm.em.emit('StateChanging', {from : sm.state, to : newState});
        let old = sm.state;
        sm.state = newState; 
        sm.em.emit('StateChanged', {from : old, to : newState});

    }
    moveUp () {
    }
    moveDown () {
    }
}

class StateA extends State {
   constructor () {
        super("A");
   }
   moveUp (sm) {
        super.stateChanging(sm, new StateB());
   }
    moveDown (sm) {
        super.stateChanging(sm, new StateC());
   }
}
class StateB extends State {
    constructor () {
        super("B");
    }
    moveUp (sm) {
        super.stateChanging(sm, new StateC());
      }
     moveDown (sm) {
        super.stateChanging(sm, new StateA());
      }
  }
 class StateC extends State {
    constructor () {
        super("C");
    }
    moveUp (sm) {
        super.stateChanging(sm, new StateA());
      }
     moveDown (sm) {
        super.stateChanging(sm, new StateB());
      }
  }
 


class SM {
    constructor ( initState ) {
        this.state = initState;
        this.em = new events.EventEmitter(); 
    }
    moveUp () {
        this.state.moveUp(this);
    }
    moveDown () {
        this.state.moveDown(this);
    }
}


let testSM = new SM(new StateA() );

testSM.em.on('StateChanged', function (data) {
    console.log('onStateChanging: ', data.from.name,"->", data.to.name);
});  

debugger;

let timerId = setInterval(() => testSM.moveUp(), 2000);