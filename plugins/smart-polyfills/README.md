# Smart polyfills

## 구형 브라우저를 지원하기 위한 폴리필 서버 입니다.

1. 브라우저 UserAgent에 따라 폴리필 코드를 가져와 빌드한 결과를 서버에 띄웁니다.

2. 하나의 프론트엔드 프로젝트에서 사용하려면 배포 파이프라인 스크립트에 `npm run server` 명령어를 추가해야합니다.

3. 또는 Node.js 서버를 따로 만들어서 동적으로 폴리필 한 스크립트를 가져올 수 있도록 합니다.

[참고링크](https://toss.tech/article/smart-polyfills)
