let currentObserver = null;

// const state = {
//   a: 10,
//   b: 20,
// };
// const keys = Object.keys(state);
// for (const key of keys) {
//   let _value = state[key];
//   const observers = new Set();
//   Object.defineProperty(state, key, {
//     get: () => {
//       if (currentObserver) observers.add(currentObserver);
//       return _value;
//     },
//     set: (value) => {
//       _value = value;
//       observers.forEach(observer => observer());
//     },
//   });
// }

// const add = () => {
//   currentObserver = add;
//   console.log(`a + b = ${state.a + state.b}`);
// }
// add();

// const multiply = () => {
//   currentObserver = multiply;
//   console.log(`a * b = ${state.a * state.b}`);
// }
// multiply();

// state.a = 100;
// state.b = 200;

const observe = fn => {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

const observable = obj => {
  Object.keys(obj).forEach(key => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get: () => {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set: (value) => {
        _value = value;
        observers.forEach(fn => fn());
      },
    });
  });
  return obj;
}

const store = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${store.a}`));
observe(() => console.log(`b = ${store.b}`));
observe(() => console.log(`a + b = ${store.a + store.b}`));
observe(() => console.log(`a * b = ${store.a * store.b}`));

store.a = 100;
store.b = 200;
