import BigChart from "./BigChart/BigChart";

function generateRandomData() {
  const length = 10000;
  const randData = Array.from({ length }, (_, index) => {
    const name = `Page [${index}]`;
    const uv = Math.floor(Math.random() * 1000);
    const pv = Math.floor(Math.random() * 10000 + 1000);

    return { name, uv, pv };
  });

  return randData;
}

const data = generateRandomData();

function App() {
  new BigChart(document.getElementById("chart") as HTMLCanvasElement);

  return (
    <div className="App" style={{ padding: "24px" }}>
      <canvas
        id="chart"
        width={800}
        height={500}
        style={{
          backgroundColor: "white",
          border: "1px solid lightgray",
          padding: "10px",
        }}
      />
    </div>
  );
}

export default App;
