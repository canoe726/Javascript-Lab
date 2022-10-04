(() => {
  let yOffset = 0;
  let prevScrollHeight = 0;
  let currentScene = 0;
  let enterNewScene = false;

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
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: [],
      },
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],

        canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],

        messageOne_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageTwo_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageThree_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageFour_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],

        messageOne_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageTwo_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageThree_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageFour_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],

        messageOne_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageTwo_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageThree_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageFour_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],

        messageOne_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageTwo_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageThree_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageFour_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      }
    },
    {
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-1'),
        content: document.querySelector('#scroll-section-1 .description'),
      }
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-2'),
        messageOne: document.querySelector('#scroll-section-2 .one-message'),
        messageTwo: document.querySelector('#scroll-section-2 .two-message'),
        messageThree: document.querySelector('#scroll-section-2 .three-message'),
        pinTwo: document.querySelector('#scroll-section-2 .two-message .pin'),
        pinThree: document.querySelector('#scroll-section-2 .three-message .pin'),
        canvas: document.querySelector('#video-canvas-2'),
        context: document.querySelector('#video-canvas-2').getContext('2d'),
        videoImages: [],
      },
      values: {
        videoImageCount: 960,
        imageSequence: [0, 959],
        
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],

        messageOne_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageTwo_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageThree_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],

        messageOne_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageTwo_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        messageThree_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],

        messageOne_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageTwo_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        messageThree_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],

        messageOne_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        messageTwo_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        messageThree_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],

        pinTwo_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinThree_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],

        pinTwo_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinThree_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],

        pinTwo_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        pinThree_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
      },
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption'),
        canvas: document.querySelector('.image-blend-canvas'),
        context: document.querySelector('.image-blend-canvas').getContext('2d'),
        imagesPath: [
          '../assets/images/blend-image-1.jpg',
          '../assets/images/blend-image-2.jpg',
        ],
        images: [],
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        rectStartY: 0,
      }
    },
  ];

  function setCanvasImages() {
    let imgElement;
    for (let index = 0; index < sceneInfo[0].values.videoImageCount; index++) {
      imgElement = new Image();
      imgElement.src = `../assets/scene001/IMG_${6726 + index}.JPG`;
      sceneInfo[0].objects.videoImages.push(imgElement);
    }

    for (let index = 0; index < sceneInfo[2].values.videoImageCount; index++) {
      imgElement = new Image();
      imgElement.src = `../assets/scene002/IMG_${7027 + index}.JPG`;
      sceneInfo[2].objects.videoImages.push(imgElement);
    }

    for (let index = 0; index < sceneInfo[3].objects.imagesPath.length; index++) {
      imgElement = new Image();
      imgElement.src = sceneInfo[3].objects.imagesPath[index];
      sceneInfo[3].objects.images.push(imgElement);
    }
  }

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let index = 0; index < sceneInfo.length; index++) {
      const { type } = sceneInfo[index];
      
      if (type === 'sticky') {
        sceneInfo[index].scrollHeight = sceneInfo[index].heightNum * window.innerHeight;
      } else if (type === 'normal') {
        sceneInfo[index].scrollHeight = sceneInfo[index].objects.container.offsetHeight;
      }
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

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objects.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objects.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function calcValues(values, currentYOffset) {
    let rv = null;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length > 2) {
      const partOfStart = values[2].start * scrollHeight;
      const partOfEnd = values[2].end * scrollHeight;
      const partOfScrollHeight = partOfEnd - partOfStart;
      const currentRatioOfPart = (currentYOffset - partOfStart) / partOfScrollHeight

      if (currentYOffset >= partOfStart && currentYOffset <= partOfEnd) {
        rv = currentRatioOfPart * (values[1] - values[0]) + values[0]
      } else if (currentYOffset < partOfStart) {
        rv = values[0];
      } else if (currentYOffset > partOfEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0]
    }

    return rv;
  }

  function playAnimation() {
    const { scrollHeight, objects, values } = sceneInfo[currentScene];
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        const scene1Sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objects.context.drawImage(objects.videoImages[scene1Sequence], 0, 0);

        if (scrollRatio <= 0.22) {
          const messageFirstOpacityIn = calcValues(values.messageOne_opacity_in, currentYOffset);
          const messageFirstTranslateYIn = calcValues(values.messageOne_translateY_in, currentYOffset);

          objects.messageOne.style.opacity = messageFirstOpacityIn;
          objects.messageOne.style.transform = `translateY(${messageFirstTranslateYIn}%)`;
        } else {
          const messageFirstOpacityOut = calcValues(values.messageOne_opacity_out, currentYOffset);
          const messageFirstTranslateYOut = calcValues(values.messageOne_translateY_out, currentYOffset);

          objects.messageOne.style.opacity = messageFirstOpacityOut;
          objects.messageOne.style.transform = `translateY(${messageFirstTranslateYOut}%)`;
        }

        if (scrollRatio <= 0.42) {
          objects.messageTwo.style.opacity = calcValues(values.messageTwo_opacity_in, currentYOffset);
          objects.messageTwo.style.transform = `translateY(${calcValues(values.messageTwo_translateY_in, currentYOffset)}%)`;
        } else {
          objects.messageTwo.style.opacity = calcValues(values.messageTwo_opacity_out, currentYOffset);
          objects.messageTwo.style.transform = `translateY(${calcValues(values.messageTwo_translateY_out, currentYOffset)}%)`;
        }

        if (scrollRatio <= 0.62) {
          objects.messageThree.style.opacity = calcValues(values.messageThree_opacity_in, currentYOffset);
          objects.messageThree.style.transform = `translateY(${calcValues(values.messageThree_translateY_out, currentYOffset)}%)`;
        } else {
          objects.messageThree.style.opacity = calcValues(values.messageThree_opacity_out, currentYOffset);
          objects.messageThree.style.transform = `translateY(${calcValues(values.messageThree_translateY_out, currentYOffset)}%)`;
        }

        if (scrollRatio <= 0.82) {
          objects.messageFour.style.opacity = calcValues(values.messageFour_opacity_in, currentYOffset);
          objects.messageFour.style.transform = `translateY(${calcValues(values.messageFour_translateY_out, currentYOffset)}%)`;
        } else {
          objects.messageFour.style.opacity = calcValues(values.messageFour_opacity_out, currentYOffset);
          objects.messageFour.style.transform = `translateY(${calcValues(values.messageFour_translateY_out, currentYOffset)}%)`;
        }

        objects.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
        break;

      case 1:
        break;

      case 2:
        const scene2Sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objects.context.drawImage(objects.videoImages[scene2Sequence], 0, 0);

        if (scrollRatio <= 0.5) {
          objects.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
        } else {
          objects.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
        }

        if (scrollRatio <= 0.25) {
          objects.messageOne.style.opacity = calcValues(values.messageOne_opacity_in, currentYOffset);
          objects.messageOne.style.transform = `translate3d(0, ${calcValues(values.messageOne_translateY_out, currentYOffset)}%, 0)`;
        } else {
          objects.messageOne.style.opacity = calcValues(values.messageOne_opacity_out, currentYOffset);
          objects.messageOne.style.transform = `translate3d(0, ${calcValues(values.messageOne_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.57) {
          objects.messageTwo.style.opacity = calcValues(values.messageTwo_opacity_in, currentYOffset);
          objects.messageTwo.style.transform = `translate3d(0, ${calcValues(values.messageTwo_translateY_out, currentYOffset)}%, 0)`;
          objects.pinTwo.style.transform = `scaleY(${calcValues(values.pinTwo_scaleY, currentYOffset)})`;
        } else {
          objects.messageTwo.style.opacity = calcValues(values.messageTwo_opacity_out, currentYOffset);
          objects.messageTwo.style.transform = `translate3d(0, ${calcValues(values.messageTwo_translateY_out, currentYOffset)}%, 0)`;
          objects.pinTwo.style.transform = `scaleY(${calcValues(values.pinTwo_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.83) {
          objects.messageThree.style.opacity = calcValues(values.messageThree_opacity_in, currentYOffset);
          objects.messageThree.style.transform = `translate3d(0, ${calcValues(values.messageThree_translateY_out, currentYOffset)}%, 0)`;
          objects.pinThree.style.transform = `scaleY(${calcValues(values.pinThree_scaleY, currentYOffset)})`;
        } else {
          objects.messageThree.style.opacity = calcValues(values.messageThree_opacity_out, currentYOffset);
          objects.messageThree.style.transform = `translate3d(0, ${calcValues(values.messageThree_translateY_out, currentYOffset)}%, 0)`;
          objects.pinThree.style.transform = `scaleY(${calcValues(values.pinThree_scaleY, currentYOffset)})`;
        }

        break;

      case 3:
        const widthRatio = window.innerWidth / objects.canvas.width;
        const heightRatio = window.innerHeight / objects.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          canvasScaleRatio = heightRatio;
        } else {
          canvasScaleRatio = widthRatio;
        }
        objects.canvas.style.transform = `scale(${canvasScaleRatio})`
        objects.context.fillStyle = 'white';
        objects.context.drawImage(objects.images[0], 0, 0);

        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;

        if (!values.rectStartY) {
          // values.rectStartY = objects.canvas.getBoundingClientRect().top;
          values.rectStartY = objects.canvas.offsetTop + (objects.canvas.height - objects.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
          values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objects.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth; 

        objects.context.fillRect(
          parseInt(calcValues(values.rect1X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objects.canvas.height,
        );
        objects.context.fillRect(
          parseInt(calcValues(values.rect2X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objects.canvas.height,
        );

        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;

    prevScrollHeight = 0;
    for (let index = 0; index < currentScene; index++) {
      prevScrollHeight += sceneInfo[index].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene += 1;
      enterNewScene = true;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene > 0) {
        currentScene -= 1;
        enterNewScene = true;
        document.body.setAttribute('id', `show-scene-${currentScene}`);
      }
    }

    if (!enterNewScene) {
      playAnimation();
    }
  }
  
  setCanvasImages();
  window.addEventListener('resize', setLayout);
  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objects.context.drawImage(sceneInfo[0].objects.videoImages[0], 0, 0);
  });
  window.addEventListener('scroll', () => {
    yOffset = window.scrollY;
    scrollLoop();
  });

})();