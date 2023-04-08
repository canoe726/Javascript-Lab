import React, { MouseEvent, useState } from "react";
import "./App.css";

let isMouseDown = false;

function App() {
  const [shapes, setShapes] = useState([
    {
      x: 0,
      y: 0,
      width: 200,
      height: 150,
      backgroundColor: "lightblue",
      info: {
        top: 0,
        left: 0,
        right: 200,
        bottom: 0,
      },
    },
    {
      x: 250,
      y: 200,
      width: 150,
      height: 150,
      backgroundColor: "gray",
      info: {
        top: 0,
        left: 0,
        right: 200,
        bottom: 0,
      },
    },
    {
      x: 120,
      y: 300,
      width: 100,
      height: 220,
      backgroundColor: "cornflowerblue",
      info: {
        top: 0,
        left: 0,
        right: 200,
        bottom: 0,
      },
    },
  ]);

  return (
    <div className="App">
      <div id="snap-grid">
        {shapes.map(({ width, height, x, y, backgroundColor }, index) => {
          return (
            <div
              key={index}
              className="rectangle"
              style={{
                width,
                height,
                backgroundColor,
                transform: `translate(${x}px, ${y}px)`,
              }}
              onMouseDown={() => {
                isMouseDown = true;
              }}
              onMouseUp={() => {
                isMouseDown = false;
              }}
              onMouseMove={(event: MouseEvent<HTMLDivElement>) => {
                if (isMouseDown) {
                  shapes[index].x += event.movementX;
                  shapes[index].y += event.movementY;

                  setShapes([...shapes]);
                }
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
