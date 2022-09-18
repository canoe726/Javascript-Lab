(() => {
  const sceneInfo = [
    {
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-0'),
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
  }

  setLayout();
  window.addEventListener('resize', setLayout);

})();