# Commit linter

1. devDependencies에 패키지를 설치한다.

```bash
npm i --save-dev husky lint-staged
```

2. package.json 에 스크립트를 추가하고 실행한다.

```bash
# package.json
...
"scripts": {
    ...
    "prepare": "husky install"
},
...
```

```bash
npx husky init
```

3. .husky 디렉터리가 생성되면 필요한 파일을 추가한다.

- commit-msg: 커밋 전 메시지 유효성 검사
- prepare-commit-msg: 브랜치 명 검사

4. 참고 문서

https://typicode.github.io/husky/#/

https://ohgyun.com/746

https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks

https://techblog.woowahan.com/2530/

https://library.gabia.com/contents/8492/
