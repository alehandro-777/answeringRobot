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
    ring(sm) {
    }
    noCarrier(sm) {
    }
    press1(sm) {
    }
    press2(sm) {
    }
    press3(sm) {
    }
    press4(sm) {
    }
    press5(sm) {
    }
    press6(sm) {
    }
    press7(sm) {
    }
    press8(sm) {
    }
    press9(sm) {
    }
    press0(sm) {
    }
}


//исходное состояние - ожидание звонка, трубка опущена, нет проигрывания файла
class State0 extends State {
   constructor () {
        super("0");
   }
    ring(sm) {
        super.stateChanging(sm, new State1());
    }
}

//проигрывание основого меню 1, переход в пункты 1..9, 0 - прослушать еще раз
class State1 extends State {
    constructor () {
         super("1");
    }
    ring(sm) {
        super.stateChanging(sm, new State1());
    }
     noCarrier(sm) {
        super.stateChanging(sm, new State0());
     }
     press1(sm) {
        super.stateChanging(sm, new State1_1());
     }
     press2(sm) {
        super.stateChanging(sm, new State1_2());
     }
     press3(sm) {
        super.stateChanging(sm, new State1_3());
     }
     press0(sm) {
        super.stateChanging(sm, new State1());
     }
 }

 //выполнение пункта 1.1
 class State1_1 extends State {
    constructor () {
         super("1.1");
    }
    ring(sm) {
        super.stateChanging(sm, new State1());
    }
    press1(sm) {
        super.stateChanging(sm, new State1_1());
     }
     noCarrier(sm) {
        super.stateChanging(sm, new State0());
     }
     press0(sm) {
        super.stateChanging(sm, new State1());
     }
 }
 //выполнение пункта 1.2
 class State1_2 extends State {
    constructor () {
         super("1.2");
    }
    ring(sm) {
        super.stateChanging(sm, new State1());
    }
     press2(sm) {
        super.stateChanging(sm, new State1_2());
     }
     noCarrier(sm) {
        super.stateChanging(sm, new State0());
     }
     press0(sm) {
        super.stateChanging(sm, new State1());
     }
 }
 //выполнение пункта 1.1
 class State1_3 extends State {
    constructor () {
         super("1.3");
    }
    ring(sm) {
        super.stateChanging(sm, new State1());
    }
     press3(sm) {
        super.stateChanging(sm, new State1_3());
     }
     noCarrier(sm) {
        super.stateChanging(sm, new State0());
     }
     press0(sm) {
        super.stateChanging(sm, new State1());
     }
 }
 



class SM {
    constructor ( initState ) {
        this.state = initState;
        this.em = new events.EventEmitter(); 
    }
    ring() {
        this.state.ring(this);
    }
    noCarrier() {
        this.state.noCarrier(this);
    }
    press1() {
        this.state.press1(this);
    }
    press2() {
        this.state.press2(this);
    }
    press3() {
        this.state.press3(this);
    }
    press4() {
        this.state.press4(this);
    }
    press5() {
        this.state.press5(this);
    }
    press6() {
        this.state.press6(this);
    }
    press7() {
        this.state.press7(this);
    }
    press8() {
        this.state.press8(this);
    }
    press9() {
        this.state.press9(this);
    }
    press0() {
        this.state.press0(this);
    }
}

exports.create = ()=>{
    return new SM(new State0() );
}

