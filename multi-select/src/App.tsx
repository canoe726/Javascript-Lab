import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import IntervalTree from './utils/IntervalTree';

function App() {
  useEffect(() => {
    // 10개의 사각형 정보 (예시)
    const rectangles = [
      { x1: 50, y1: 50, x2: 150, y2: 150 },
      { x1: 10, y1: 10, x2: 20, y2: 20 },
      { x1: 180, y1: 30, x2: 220, y2: 80 },
      // 다른 사각형 정보를 추가해주세요.
    ];
    
    // 새로 그려진 1개의 사각형 정보 (예시)
    const newRectangle = { x1: 100, y1: 100, x2: 200, y2: 200 };
    
    const tree = new IntervalTree();
    
    // 10개의 사각형들을 영역 트리에 삽입
    for (const rect of rectangles) {
      tree.insert(rect.x1, rect.y1, rect.x2, rect.y2);
    }
    
    // 새로 그려진 사각형의 좌표를 이용하여 겹치는 사각형들을 찾음
    const isOverlapping = tree.isOverlapping(newRectangle.x1, newRectangle.y1, newRectangle.x2, newRectangle.y2);
    
    // 결과 출력
    console.log('isOverlapping : ', isOverlapping)
    // if (isOverlapping) {
    //   console.log('겹침');
    //   // 겹치는 사각형이 있다면 여기에서 처리하거나 해당 사각형을 표시할 수 있습니다.
    // } else {
    //   console.log('겹치지 않음');
    //   // 겹치지 않는 사각형이 있다면 여기에서 처리하거나 해당 사각형을 표시할 수 있습니다.
    // }
  }, [])

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
  );
}

export default App;
