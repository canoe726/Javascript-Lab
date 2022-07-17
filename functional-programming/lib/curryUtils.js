export const go = (...args) => reduce((a, f) => f(a), args);

export const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

export const curry = f => (first, ...args) => args.length
  ? f(first, ...args)
  : (...args) => f(first, ...args);

export const filter = curry((f, iter) => {
  const result = [];
  for (const a of iter) {
    if (f(a)) {
      result.push(a);
    }
  }
  return result;
});

export const map = curry((f, iter) => {
  const result = [];
  for (const a of iter) {
    result.push(f(a));
  }
  return result;
});

export const reduce = curry((fn, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = fn(acc, a);
  }
  return acc;
});

export const log = (input) => console.log(input);
