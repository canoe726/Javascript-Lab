import Component from "../../cores/Component.js";

class MyListMain extends Component {
  template () {
    const { filteredItems } = this.$props;
    return `
      <ul>
        ${filteredItems.map(({ seq, contents, active }) => {
          return `
            <li data-seq="${seq}">
              ${contents}
              <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
                ${active ? '활성' : '비활성'}
              </button>
              <button class="deleteBtn">삭제</button>
            </li>
          `;
        }).join('')}
      </ul>
    `;
  }

  setEvent () {
    const { deleteItem, toggleItem } = this.$props;

    this.addEvent('click', '.deleteBtn', ({ target }) => {
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      deleteItem(seq);
    });

    this.addEvent('click', '.toggleBtn', ({ target }) => {
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      toggleItem(seq);
    });
  }
}

export default MyListMain;
