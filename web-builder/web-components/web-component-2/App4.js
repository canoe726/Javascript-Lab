import Component from './cores/Component.js';
import { setA, setB, store } from './store/reduxStore.js';

const Result = () => {
  return `<p>a + b = ${store.getState().a + store.getState().b}</p>`;
}

const InputA = () => {
  return `<input id="stateA" value="${store.getState().a}"/>`;
}

const InputB = () => {
  return `<input id="stateB" value="${store.getState().b}"/>`;
}

class App4 extends Component {
  template () {
    return `
      ${Result()}
      ${InputA()}
      ${InputB()}
    `;
  }

  setEvent () {
    this.addEvent('keyup', '#stateA', ({ key, target }) => {
      if (key !== 'Enter') return false;
      store.dispatch(setA(Number(target.value)));
    });

    this.addEvent('keyup', '#stateB', ({ key, target }) => {
      if (key !== 'Enter') return false;
      store.dispatch(setB(Number(target.value)));
    });
  }
}

export default App4;
