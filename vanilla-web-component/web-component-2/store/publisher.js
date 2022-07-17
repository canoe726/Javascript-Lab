class Publisher {
  #state;
  #observers = new Set();

  constructor (state) {
    this.#state = state;
    Object.keys(state).forEach(key => Object.defineProperty(this, key, {
      get: () => this.#state[key],
    }));
  }

  setState (newState) {
    this.#state = { ...this.#state, ...newState };
    this.notify();
  }

  register (subscriber) {
    this.#observers.add(subscriber);
  }

  notify () {
    this.#observers.forEach(fn => fn())
  }
}

export default Publisher;
