class MyComponent extends HTMLElement {
  connectedCallback () {
    this.render();
  }

  static get observedAttributes () {
    return ['title'];
  }

  attributeChangedCallback (props, oldValue, newValue) {
    this.render();
  }

  render () {
    const title = this.attributes.title.value;
    const titleElem = `<h1>${title}</h1>`;
    this.innerHTML = `
      ${titleElem}
    `;
  }

  disconnectedCallback () {
    console.log('I am leaving');
  }
}

customElements.define('my-component', MyComponent);
