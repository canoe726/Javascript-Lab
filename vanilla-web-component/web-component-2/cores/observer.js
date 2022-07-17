import { debounceFrame } from './debounceFrame.js'

let currentObserver = null;

const observe = fn => {
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
}

const observable = obj => {
  const observerMap = {};

  return new Proxy(obj, {
    get: (target, name) => {
      observerMap[name] = observerMap[name] || new Set();
      if (currentObserver) observerMap[name].add(currentObserver);
      return target[name];
    },
    set: (target, name, value) => {
      if (target[name] === value) return true;
      if (JSON.stringify(target[name]) === JSON.stringify(value)) return true;
      target[name] = value;
      observerMap[name].forEach(fn => fn());
      return true;
    },
  })
};

// const observable = obj => {
//   Object.keys(obj).forEach(key => {
//     let _value = obj[key];
//     const observers = new Set();

//     Object.defineProperty(obj, key, {
//       get: () => {
//         if (currentObserver) observers.add(currentObserver);
//         return _value;
//       },
//       set: (value) => {
//         if (_value === value) return; // primitive
//         if (JSON.stringify(_value) === JSON.stringify(value)) return; // object, array
//         if (_value instanceof Set && value instanceof Set) { // Set
//           const sameLength = _value.size === valule.size;
//           const sameValue = true;
//           for (const v of _value) {
//             if (!value.has(v)) {
//               sameValue = false;
//               break;
//             }
//           }
//           if (sameLength && sameValue) return;
//         }
//         // Map, WeekSet, WeekMap
//         _value = value;
//         observers.forEach(fn => fn());
//       },
//     });
//   });
//   return obj;
// }

export { observe, observable };
