class Subscriber {
  #fn;

  constructor (observerChanged) {
    this.#fn = observerChanged;
  }

  subscribe (publisher) {
    publisher.register(this.#fn);
  }
}

export default Subscriber;
