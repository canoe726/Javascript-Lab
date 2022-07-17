class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  get count() {
    return this.getAttribute('count');
  }

  set count(val) {
    this.setAttribute('count', val);
  }

  static get observedAttributes() {
    return ["count"];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === 'count') {
      this.render();
      const btn = this.shadow.querySelector('#btn');
      btn.addEventListener('click', this.increment.bind(this));
    }
  }

  increment() {
    this.count = parseInt(this.count) + 1;
  }

  connectedCallback() {
    this.render();
    const btn = this.shadow.querySelector('#btn');
    btn.addEventListener('click', this.increment.bind(this));
  }

  render() {
    this.shadow.innerHTML = `
      <h1>Counter</h1>
      ${this.count}
      <button id="btn">Increment</button>
    `;
  }
}

customElements.define('my-counter', MyCounter);
