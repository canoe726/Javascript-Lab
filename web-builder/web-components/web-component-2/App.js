import Component from './cores/Component.js';
import MyListHeader from './src/components/myListHeader.js';
import MyListMain from './src/components/myListMain.js';
import MyListFooter from './src/components/myListFooter.js';

class App extends Component {
  get filteredItems () {
    const { isFilter, items } = this.$state;
    return items.filter(({ active }) => (isFilter === 1 && active) ||
                                        (isFilter === 2 && !active) ||
                                        (isFilter === 0));
  }

  init () {
    this.$state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: 'item1',
          active: false,
        },
        {
          seq: 2,
          contents: 'item2',
          active: true,
        },
        {
          seq: 3,
          contents: 'item3',
          active: false,
        },
      ]
    };
  }
  
  template () {
    return `
      <header data-component="item-appender"></header>
      <main data-component="item-main"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  mounted () {
    const { addItem, filteredItems, deleteItem, toggleItem, filterItems } = this;

    const $myListHeader = this.$target.querySelector('[data-component="item-appender"]');
    new MyListHeader($myListHeader, {
      addItem: addItem.bind(this),
    });

    const $myListMain = this.$target.querySelector('[data-component="item-main"]');
    new MyListMain($myListMain, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });

    const $myListFooter = this.$target.querySelector('[data-component="item-filter"]');
    new MyListFooter($myListFooter, {
      filterItems: filterItems.bind(this),
    });
  }

  addItem (contents) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map(item => item.seq));
    const active = false;
    this.setState({
      ...this.$state,
      items: [
        ...items,
        { seq, contents, active }
      ],
    });
  }

  deleteItem (index) {
    const { items } = this.$state;
    items.splice(items.findIndex(item => item.seq === index), 1);
    this.setState({
      ...this.$state,
      items: [
        ...items
      ]
    })
  }

  toggleItem (idx) {
    const { items } = this.$state;
    const index = items.findIndex(item => item.seq === idx);
    items[index].active = !items[index].active;
    this.setState({
      ...this.$state,
      items: [
        ...items,
      ]
    })
  }

  filterItems (target) {
    this.setState({
      ...this.$state,
      isFilter: Number(target.dataset.isFilter),
    })
  }
}

export default App;
