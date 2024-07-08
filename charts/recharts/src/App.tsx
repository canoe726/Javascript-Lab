import { useEffect, useState } from 'react'
import BigChart from './BigChart/BigChart'

function generateRandomData(size = 1000, range = 100) {
  const length = size
  const randData = Array.from({ length }, (_, index) => {
    const name = `Page [${index}]`
    const uv = Math.floor(Math.random() * range)
    const pv = Math.floor(Math.random() * range)

    return { name, uv, pv }
  })

  return randData
}

const SIZE = 50
const data = {
  labels: Array.from({ length: SIZE }, (_, index) => `${index}`),
  datasets: [
    {
      label: 'My First Dataset',
      data: Array.from({ length: SIZE }, () => Math.floor(Math.random() * 100)),
      // backgroundColor: [
      //   'rgba(255, 99, 132, 0.2)',
      //   'rgba(255, 159, 64, 0.2)',
      //   'rgba(255, 205, 86, 0.2)',
      //   'rgba(75, 192, 192, 0.2)',
      //   'rgba(54, 162, 235, 0.2)',
      //   'rgba(153, 102, 255, 0.2)',
      //   'rgba(201, 203, 207, 0.2)',
      // ],
      // borderColor: [
      //   'rgb(255, 99, 132)',
      //   'rgb(255, 159, 64)',
      //   'rgb(255, 205, 86)',
      //   'rgb(75, 192, 192)',
      //   'rgb(54, 162, 235)',
      //   'rgb(153, 102, 255)',
      //   'rgb(201, 203, 207)',
      // ],
      // borderWidth: 1,
    },
  ],
}

function App() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    } else {
      const ctx = document.getElementById('chart') as HTMLCanvasElement
      const bigChart = new BigChart(ctx, {
        type: 'bar',
        data,
      })
      // const stackedBar = new Chart(ctx, {
      //   type: 'bar',
      //   data,
      // })
    }
  }, [isMounted])

  return (
    <div className="App" style={{ padding: '24px' }}>
      <canvas
        id="chart"
        width={900}
        height={400}
        style={{
          backgroundColor: 'white',
          border: '1px solid lightgray',
          padding: '10px',
        }}
      />
    </div>
  )
}

export default App
