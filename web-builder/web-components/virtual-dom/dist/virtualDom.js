"use strict";

function h(type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    type: type,
    props: props,
    children: children.flat()
  };
}

{
  /* Real DOM
  <ul>
   <li>
     <input type="checkbox" class="toggle"/>
     todo list item 1
     <button class="remove">삭제</button>
   </li>
   <li class="completed">
     <input type="checkbox" class="toggle"/>
     todo list item 2
     <button class="remove">삭제</button>
   </li>
  </ul>
  <form>
   <input type="text"/>
   <button type="submit">추가</button>
  </form>
  */
}
var state = [{
  id: 1,
  completed: false,
  content: 'todo list item 1'
}, {
  id: 2,
  completed: true,
  content: 'todo list item 2'
}];
var vDom = h('div', {
  id: 'app'
}, h('ul', null, state.map({
  completed: completed,
  content: content
}, function () {
  return h('li', completed ? {
    completed: true
  } : null, h('input', {
    type: 'checkbox',
    "class": 'toggle',
    checked: completed
  }), content, h('button', {
    "class": 'remove'
  }, '삭제'));
}), // h('li', null,
//   h('input', { type: 'checkbox', class: 'toggle' },
//     'todo list item 1',
//     h('button', { class: 'remove' }, '삭제'),
//   )
// ),
// h('li', { class: 'completed' },
//   h('input', { type: 'checkbox', class: 'toggle' },
//     'todo list item 2',
//     h('button', { class: 'remove' }, '삭제')
//   )
// ),
h('form', null, h('input', {
  type: 'text'
}), h('button', {
  type: 'submit'
}, '추가'))));
console.log(vDom);