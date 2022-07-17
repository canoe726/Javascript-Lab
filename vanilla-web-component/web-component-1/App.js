import './counter.js';
import './component.js';
import './toggle.js';

const title = ['😀 first change', '👏👏👏 second change', '🙇‍♂️ hello'];

function changeElement () {
  const newTitle = title[Math.floor((Math.random() * title.length))];
  const elem = document.getElementById('mycomp');
  elem.attributes.title.value = newTitle;
}

function App () {
  const app = document.createElement('div');

  const br = document.createElement('br');

  const counter = document.createElement('my-counter');
  counter.setAttribute('count', 10);

  const component = document.createElement('my-component');
  component.id = 'mycomp';
  component.setAttribute('title', 'hello world');
  const compBtn = document.createElement('button');
  compBtn.innerText = 'Change Title';
  compBtn.addEventListener('click', changeElement);
  
  const myToggle = document.createElement('my-toggle');
  myToggle.setAttribute('todos', '[1,2,3]');
  
  app.append(counter);
  app.append(br);
  app.append(br);

  app.append(component);
  app.append(compBtn);
  app.append(br);
  app.append(br);
  
  app.append(myToggle);
  app.append(br);
  app.append(br);
  
  return app;
}

export default App;
