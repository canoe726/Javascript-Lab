import classNames from "classnames";
import { MouseEvent, useRef, useState } from "react";

import useElement from "./hooks/useElement";

import "./index.css";
import { Position } from "./interface/common.type";

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });

  const { elementList, dispatchElementList } = useElement();

  const handleCanvasMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { x, y } = canvasRef.current?.getClientRects()[0] ?? {};
    const { clientX, clientY } = event;

    const baseX = clientX - (x ?? 0);
    const baseY = clientY - (y ?? 0);
    setMousePosition({ x: baseX, y: baseY });
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center p-[5rem]">
      <div className="absolute left-[2rem] top-[2rem] w-max h-fit border-gray-600 border border-solid rounded-md px-[0.6rem] py-[0.1rem] bg-gray-50 flex text-black gap-x-[0.8rem]">
        <span>{`X: ${mousePosition.x}`}</span>

        <span>{`Y: ${mousePosition.y}`}</span>
      </div>

      <div
        ref={canvasRef}
        className="relative w-full h-full overflow-hidden text-center border border-red-600 border-solid"
        onMouseMove={handleCanvasMouseMove}
      >
        {elementList.map(
          ({ id, className, state: { position, isSelected } }) => {
            return (
              <div
                id={id}
                key={id}
                className={classNames(
                  "transition-all absolute hover:opacity-80 hover:border hover:border-solid hover:border-gray-600",
                  className,
                  {
                    "bg-black": isSelected,
                  }
                )}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                }}
                onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
                  const { clientX, clientY } = event;
                  const { x, y } = mousePosition;

                  dispatchElementList({
                    type: "UPDATE_POSITION",
                    payload: {
                      id,
                      data: {
                        x: clientX - x,
                        y: clientY - y,
                      },
                    },
                  });
                }}
              />
            );
          }
        )}

        <div className="w-[5rem] h-[8rem] bg-yello-300" />
      </div>
    </div>
  );
}

export default App;
