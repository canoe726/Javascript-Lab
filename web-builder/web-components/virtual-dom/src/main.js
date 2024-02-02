/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const $elem = document.createElement(node.type);

  Object.entries(node.props || {})
        .filter(([attr, value]) => value)
        .forEach(([attr, value]) => (
          $elem.setAttribute(attr, value)
        ));

  const children = node.children.map(createElement);
  children.forEach(child => $elem.appendChild(child));
  return $elem;
}

/**
 * 1. oldNode만 있는 경우
 * - oldNode를 parent에서 제거한다.
 * 
 * 2. newNode만 있는 경우
 * - newNode를 parent에 추가한다.
 * 
 * 3. oldNode와 newNode 모두 text 타입일 경우
 * - oldNode, newNode의 내용이 다르다면 oldNode의 내용을 newNode의 내용으로 교체한다.
 * 
 * 4. oldNode와 newNode의 태그 이름이 다를 경우
 * - 둘 중 하나가 String일 경우에도 해당
 * - oldNode를 제거하고, 해당 위치에 newNode를 추가한다.
 * 
 * 5. oldNode와 newNode의 태그 이름이 같은 경우
 * - newNode와 oldNode의 attribute를 비교하여 변경된 부분만 반영한다.
 *   - oldNode의 attribute 중 newNode에 없는 것은 모두 제거한다.
 *   - newNode의 attribute 에서 변경된 내용한 oldNode의 attribute에 반영한다.
 * 
 * 6. newNode와 oldNode의 모든 자식 태그를 순회하여 1 ~ 5 내용을 반복한다.
 * 
 * @param {any} parent 
 * @param {any} newNode 
 * @param {any} oldNode 
 */
function updateElement (parent, newNode, oldNode, index = 0) {
  // 1. oldNode만 있는 경우
  if (!newNode && oldNode) {
    return parent.removeChild(parent.childNodes[index]);
  }

  // 2. newNode만 있는 경우
  if (newNode && !oldNode) {
    return parent.appendChild(createElement(newNode));
  }

  // 3. oldNode와 newNode 모두 text 타입일 경우
  if (typeof oldNode === 'string' && typeof newNode === 'string') {
    if (newNode === oldNode) return;
    return parent.replaceChild(
      createElement(newNode),
      parent.childNodes[index],
    );
  }

  // 4. oldNode와 newNode의 태그 이름이 다를 경우
  if (oldNode.type !== newNode.type) {
    return parent.replaceChild(
      createElement(newNode),
      parent.childNodes[index],
    )
  }

  // 5. oldNode와 newNode의 태그 이름이 같은 경우
  updateAttributes(
    parent.childNodes[index],
    newNode.props || {},
    oldNode.props || {},
  )

  // 6. newNode와 oldNode의 모든 자식 태그를 순회하여 1 ~ 5 내용을 반복한다.
  const maxLength = Math.max(newNode.children.length, oldNode.children.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parent.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i,
    );
  }
}

// 5-1. newNode와 oldNode의 attribute를 비교하여 변경된 부분만 반영한다.
function updateAttributes(target, newProps, oldProps) {
  // 5-1-2. newNode의 attribute 에서 변경된 내용한 oldNode의 attribute에 반영한다.
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === newProps[attr]) continue;
    target.setAttribute(attr, value);
  }
  // 5-1-1. oldNode의 attribute 중 newNode에 없는 것은 모두 제거한다.
  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    target.removeAttribute(attr);
  }
}

const oldState = [
  { id: 1, completed: false, content: 'todo list item 1' },
  { id: 2, completed: true, content: 'todo list item 2' },
]

const newState = [
  { id: 1, completed: true, content: 'todo list item 1 update' },
  { id: 2, completed: true, content: 'todo list item 2' },
  { id: 3, completed: false, content: 'todo list item 3' },
]

const render = (state) => (
  <div id="app">
    <ul>
      {state.map(({ id, completed, content }) => {
        return (
          <li id={id} class={completed ? 'completed' : null}>
            <input type="checkbox" class="toggle" checked={completed}/>
            {content}
            <button class="remove">삭제</button>
          </li>
        )
      })}
      {/* <li>
        <input type="checkbox" class="toggle"/>
        todo list item 1
        <button class="remove">삭제</button>
      </li>
      <li class="completed">
        <input type="checkbox" class="toggle"/>
        todo list item 2
        <button class="remove">삭제</button>
      </li> */}
    </ul>
    <form>
      <input type="text"/>
      <button type="submit">추가</button>
    </form>
  </div>
)

const oldNode = render(oldState);
const newNode = render(newState);

const $root = document.getElementById('root');
// $root.innerHTML = `
//   <pre>${JSON.stringify(vm, null, 2)}</pre>
// `
updateElement($root, oldNode);
setTimeout(() =>
  updateElement($root, newNode, oldNode),
  5000
);
