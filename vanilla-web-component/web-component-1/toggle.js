class Toggle extends HTMLElement {
  constructor () {
    super();
  }

  connectedCallback () {
    this.render();
  }

  static get observedAttributes () {
    return ['todos'];
  }

  setTodos (todos) {
    this.todos = todos;
    this.render();
  }

  render () {
    const todos = JSON.parse(this.attributes.todos.value);
    const toggles = todos.map((todo) => {
      const input = document.createElement('input');    
      input.type = 'checkbox'

      const li = document.createElement('li');
      li.append(input);
      li.append(todo);
  
      return li;
    });

    const ul = document.createElement('ul');
    toggles.map(toggle => {
      ul.appendChild(toggle);
    })

    this.appendChild(ul);
  }


  disconnectedCallback () {
    console.log('detach from dom');
  }
}

customElements.define('my-toggle', Toggle);

export default Toggle;
