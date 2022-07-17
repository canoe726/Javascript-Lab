import './App.css'
import CurationModelGraph from './CurationModelGraph'
import DataTestResultGraph, { DataResult } from './DataTestResultGraph'

const data: DataResult[] = [
  {
    testsetTitle: '테스트',
    configTitle: '옵션 1',
    testResultAverage: 1,
    testResultNumOfSuccess: 40,
    testResultNumOfTotal: 40,
    execTime: 0.17,
    createdAt: '2021-05-03:11:22:33'
  },
  {
    testsetTitle: '테스트',
    configTitle: '옵션 2',
    testResultAverage: 1,
    testResultNumOfSuccess: 32,
    testResultNumOfTotal: 32,
    execTime: 0.16,
    createdAt: '2021-05-03:11:22:34'
  },
  {
    testsetTitle: '테스트',
    configTitle: '옵션 3',
    testResultAverage: 0.4,
    testResultNumOfSuccess: 40,
    testResultNumOfTotal: 100,
    execTime: 0.15,
    createdAt: '2021-05-03:11:22:35'
  },
  {
    testsetTitle: '테스트',
    configTitle: '옵션 4',
    testResultAverage: 0.6,
    testResultNumOfSuccess: 6,
    testResultNumOfTotal: 10,
    execTime: 0.27,
    createdAt: '2021-05-03:11:22:36'
  },
  {
    testsetTitle: '테스트',
    configTitle: '옵션 5',
    testResultAverage: 0.67,
    testResultNumOfSuccess: 20,
    testResultNumOfTotal: 30,
    execTime: 0.10,
    createdAt: '2021-05-03:11:22:37'
  }
]

function App() {
  return (
    <>
      <CurationModelGraph></CurationModelGraph>
      {/* <DataTestResultGraph
        data={data}
        showDataKeys={['execTime', 'testResultAverage']}
      ></DataTestResultGraph> */}
    </>
  )
}

export default App
