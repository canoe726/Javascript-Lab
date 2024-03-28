import App from '../client/src/App.js'

function render() {
  console.log('render : ', App())
  return App()
}

export default {
  render,
}
