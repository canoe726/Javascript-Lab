(() => {
  let yOffset = 0;
  let prevScrollHeight = 0;
  let currentScene = 0;

  const sceneInfo = [
    {
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-0'),
        messageOne: document.querySelector('#scroll-section-0 .one-message'),
        messageTwo: document.querySelector('#scroll-section-0 .two-message'),
        messageThree: document.querySelector('#scroll-section-0 .three-message'),
        messageFour: document.querySelector('#scroll-section-0 .four-message'),
      },
      values: {
        messageOneOpacity: [0, 1],
      }
    },
    {
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-1'),
      }
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-2'),
      }
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-3'),
      }
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let index = 0; index < sceneInfo.length; index++) {
      sceneInfo[index].scrollHeight = sceneInfo[index].heightNum * window.innerHeight;
      sceneInfo[index].objects.container.style.height = `${sceneInfo[index].scrollHeight}px`;
    }
    
    yOffset = window.scrollY;
    let totalScrollHeight = 0;
    for (let index = 0; index < sceneInfo.length; index++) {
      totalScrollHeight += sceneInfo[index].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = index;
        document.body.setAttribute('id', `show-scene-${currentScene}`);
        break;
      }
    }
  }

  function playAnimation() {
    switch (currentScene) {
      case 0:
        
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    for (let index = 0; index < currentScene; index++) {
      prevScrollHeight += sceneInfo[index].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene += 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene > 0) {
        currentScene -= 1;
        document.body.setAttribute('id', `show-scene-${currentScene}`);
      }
    }

    playAnimation();
  }
  
  window.addEventListener('resize', setLayout);
  window.addEventListener('load', setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.scrollY;
    scrollLoop();
  });

  setLayout();

})();