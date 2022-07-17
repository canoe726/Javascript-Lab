import Publisher from './publisher.js';
import Subscirber from './subscriber.js';

const store = new Publisher({
  a: 10,
  b: 20,
});

const add = new Subscirber(() => console.log(`a + b : ${store.a + store.b}`));
const multiply = new Subscirber(() => console.log(`a * b : ${store.a * store.b}`));

add.subscribe(store);
multiply.subscribe(store);

store.notify();

store.setState({
  a: 100,
  b: 200,
});
