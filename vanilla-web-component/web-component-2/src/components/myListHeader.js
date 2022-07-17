import Component from "../../cores/Component.js";

class MyListHeader extends Component {
  template () {
    return `<input type="text" class="appender" placeholder="아이템 내용 입력"/>`;
  }

  setEvent () {
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      console.log('state: ',this.$state)
      this.$props.addItem(target.value)
    });
  }
}

export default MyListHeader;
