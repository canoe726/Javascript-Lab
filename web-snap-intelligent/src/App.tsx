import classNames from 'classnames'
import { MouseEvent, useRef, useState } from 'react';
import './index.css';

interface Position {
  x: number;
  y: number;
}

interface ElementMeta {
  className: string
  position: Position
  isSelected: boolean
}

function App() {
  const canvasRef = useRef<HTMLDivElement>(null)

  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 })

  const elementList: ElementMeta[] = [
    {
      className: 'w-[10rem] h-[10rem] bg-blue-300',
      position: { x: 0, y: 0 },
      isSelected: false,
    },
    {
      className: 'w-[5rem] h-[8rem] bg-yellow-300',
      position: { x: 500, y: 120 },
      isSelected: false,
    },
  ]

  const handleCanvasMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { x, y } = canvasRef.current?.getClientRects()[0] ?? {}
    const { clientX, clientY } = event

    const baseX = clientX - (x ?? 0);
    const baseY = clientY - (y ?? 0);
    setMousePosition({ x: baseX, y: baseY })
  }

  return (
    <div className="relative w-full h-full flex justify-center items-center p-[5rem]">
      <div className='absolute left-[2rem] top-[2rem] w-max h-fit border-gray-600 border border-solid rounded-md px-[0.6rem] py-[0.1rem] bg-gray-50 flex text-black gap-x-[0.8rem]'>
        <span>{`X: ${mousePosition.x}`}</span>

        <span>{`Y: ${mousePosition.y}`}</span>
      </div>

      <div
        ref={canvasRef}
        className='relative w-full h-full overflow-hidden text-center border border-red-600 border-solid'
        onMouseMove={handleCanvasMouseMove}
      >
        {elementList.map(({ className, position, isSelected }, index) => {
          return (
            <div
              key={`rectangle-${index}`}
              className={
                classNames('transition-all absolute', className, {
                  'bg-black': isSelected,
                })
              }
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`
              }}
            />
          )
        })}
        

        <div className='w-[5rem] h-[8rem] bg-yello-300'/>
      </div>
    </div>
  );
}

export default App;
