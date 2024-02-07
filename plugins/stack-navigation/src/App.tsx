import './App.css'
import StackNavigation from './core/StackNavigation/StackNavigation'
import logo from './logo.svg'

export const APP_ACTIVITY = {
  MAIN_ACTIVITY: 'main',
}

function App() {
  // const activityRouteList: ActivityRoute[] = [
  //   {
  //     key: '/dashboard_home-activity',
  //     activityName: APP_ACTIVITY.MAIN_ACTIVITY,
  //     activity: <HomeActivity />,
  //   },
  // ]

  return (
    <div className="App">
      <StackNavigation show={true}>
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
      </StackNavigation>
    </div>
  )
}

export default App
