export const go = (...args) => reduce((a, f) => f(a), args);

export const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

export const curry =
  (f) =>
  (first, ...args) =>
    args.length ? f(first, ...args) : (...args) => f(first, ...args);

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

export const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

export const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == l) {
      return res;
    }
  }
  return res;
});

/* -------------------------------------------------------------------------- */
/*                                    LAZY                                    */
/* -------------------------------------------------------------------------- */
export const L = {};

L.filter = curry((f, iter) => {
  const result = [];

  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) {
      result.push(a);
    }
  }
  return result;
});

L.map = curry((f, iter) => {
  const result = [];

  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    result.push(f(a));
  }

  // for (const a of iter) {
  //   result.push(f(a));
  // }
  return result;
});

L.reduce = curry((fn, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = fn(acc, a);
  }
  return acc;
});

L.range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

L.take = curry((l, iter) => {
  let res = [];

  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length == l) {
      return res;
    }
  }
  return res;
});

export const log = (input) => console.log(input);
