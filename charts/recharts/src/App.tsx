import { Chart, registerables } from 'chart.js/auto'
import { useEffect } from 'react'
import BigChart from './BigChart/BigChart'

const SIZE = 500000
const data = {
  labels: Array.from({ length: SIZE }, (_, index) => `${index}`),
  datasets: [
    {
      label: 'My First Dataset 3',
      data: Array.from({ length: SIZE }, () => Math.floor(Math.random() * 10000)),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    },
  ],
}

Chart.register(...registerables)

function App() {
  useEffect(() => {
    // BigChart
    const ctx = document.getElementById('chart') as HTMLCanvasElement
    const bigChart = new BigChart(ctx, {
      type: 'bar',
      data,
    })

    // Chart.js
    const myCtx = document.getElementById('myChart') as HTMLCanvasElement
    const bigChart2 = new BigChart(myCtx, {
      type: 'bar',
      data,
    })
    // const chart = new Chart(myCtx, {
    //   type: 'bar',
    //   data: data,
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // })

    return () => {
      bigChart.destroy()
      bigChart2.destroy()
      // chart.destroy()
    }
  }, [])

  return (
    <div className="App" style={{ padding: '24px' }}>
      <div style={{ width: '1200px' }}>
        <canvas
          id="chart"
          style={{
            backgroundColor: 'white',
            border: '1px solid lightgray',
            padding: '10px',
          }}
        />
      </div>

      <div style={{ width: '1200px' }}>
        <canvas
          id="myChart"
          style={{
            marginTop: '48px',
            backgroundColor: 'white',
            border: '1px solid lightgray',
            padding: '10px',
          }}
        />
      </div>
    </div>
  )
}

export default App
