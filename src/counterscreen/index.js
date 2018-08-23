import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

var counterState = observable({
  counter: 0,
})

counterState.handleDec = () => {
  counterState.counter -= 1;
}

counterState.handleInc = () =>{
  counterState.counter += 1;
}

const CounterScreen = observer(class Counter extends React.Component{

  render(){
    return(
      <div>
        Counter: {counterState.counter} <br/>
        <button onClick={counterState.handleDec}> - </button>
        <button onClick={counterState.handleInc}> + </button>
      </div>
    )
  }
})

export default CounterScreen;
