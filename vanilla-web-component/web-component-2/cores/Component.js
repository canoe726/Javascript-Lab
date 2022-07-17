import { observe, observable } from './observer.js';

class Component {
  $target;
  $props;
  $state;
  constructor ($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.init();
  }
  init () {
    this.$state = observable(this.initState());
    observe(() => {
      this.setEvent();
      this.render();
    });
  }
  initState () { return {}; }
  template () { return ''; }
  render () {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  mounted () {}
  setEvent () {}
  setState (newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
  addEvent (eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;
      callback(event);
    })
  }
}

export default Component;
