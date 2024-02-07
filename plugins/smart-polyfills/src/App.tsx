import './App.css'
import logo from './logo.svg'

function App() {
  /**
   * URL.canParse 브라우저 API 는 Chrome 117 버전에는 없음
   */
  console.log('URL.canParse: ', (URL as any)?.canParse('https://www.example.com'))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
