# 코드 컨벤션

- 참고 문서

https://github.com/airbnb/javascript

https://github.com/tipjs/javascript-style-guide

## 1. MR 전 확인 Todo List

1. [x] 변수, 함수, 커스텀 훅, 유틸함수 등의 이름을 직관적이고 쉬운 단어를 사용했는가?

2. [x] 여러 조건들을 하나의 변수로 묶어서 처리하였는가?

3. [x] 하나의 컴포넌트에 너무 많은 기능이 포함되어 있지 않은가? (컴포넌트 분리 기준 - [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/))

4. [x] 객체 속성 값을 사용할 때 dot operator 말고 destructuring assignment 를 잘 활용하였는가?

(a.b, a.c [X] → { b, c } = a [O])

5. [x] array, object 를 필터링 할 때 prototype 함수들(map, filter, some, reduce …)을 잘 활용하였는가?

6. [x] 반복되는 엘리먼트들을 copy & paste 방법으로 코딩하지 않고 데이터 맵 또는 객체를 만들어서 일반화 하였는가?

7. [x] 객체의 값을 할당할 때는 되도록이면 [Shorthand Property](https://ui.dev/shorthand-properties)를 사용하였는가?

8. [x] 리스트나 맵의 경우에는 원시자료형 List, Map을 postfix로 붙여주었는가? (...s, ...ies 로 명명하면 헷갈릴 수 있음)

9. [x] JSX만 읽어도 UI를 대강 파악할 수 있게 컴포넌트 단위별로 띄어쓰기를 삽입하였는가?

10. [x] 파일명을 활용 용도에 따라서 구분하여 명명하였는가?

11. [x] global constant 명을 대문자 SNAKE_CASE로 선언하였는가?

## 2. 디렉터리 구조 및 단위

- 공통 파일 단위 : x.const.x x.type.x x.util.ts x.hooks.ts

##### 2-1. / (=root)

- 각종 config 파일들의 집합 (tsconfig.json, prettierrc.json, husky 등)

```
# .nvmrc
18.18.0
```

```
# .prettierrc.json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "printWidth": 100,
  "endOfLine": "lf",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true,
  "importOrder": [
    "<THIRD_PARTY_MODULES>",
    "^@/pages/(.*)$",
    "^@/pageComponents/(.*)$",
    "^@/stories/(.*)$",
    "^@/components/(.*)$",
    "^@/interfaces/(.*)$",
    "^@/contexts/(.*)$",
    "^@/constants/(.*)$",
    "^@/api/(.*)$",
    "^@/hooks/(.*)$",
    "^@/utils/(.*)$",
    "^@/icons/(.*)$",
    "^@/styles/(.*)$",
    "^[./]"
  ],
  "tailwindConfig": "./tailwind.config.js"
}
```

```
# tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "sourceMap": true,
    "noImplicitAny": false,
    "jsx": "preserve",
    "incremental": true,
    "strictNullChecks": false,
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

##### URL 구조

- URL은 전부 kebab-case 로 통일 (queryParams 는 snake_case 로 통일)

```
# 예시

/community/{:community_id}/creator

/community/{:community_id}/posts?member={:member_id}

/community/{:community_id}/nfts/closed-sales/{:item_id}
```

=> 위 기준에 따라 /pages, /pageComponents 디렉토리 구조 확장

##### 2-2. /pages

특정 또는 동적 도메인을 위한 디렉터리 구조 및 index.tsx 파일만 생성한다. (라우팅 용 컴포넌트)

- 도메인 명은 가능하면 직관적이게 한 단어로 생성한다.

- 도메인에서 두 단어 이상이 되면 대시 - 로 구분한다. (register-community)

- 디렉터리명 = 도메인명

- 내부 파일 : index.tsx만 존재 컴포넌트 명은 도메인명 PascalCase + Page 으로 네이밍

hygen 템플릿을 생성하는 것으로 대체 (관련 레포지터리 : )

명령어 : hygen next new pages

##### 2-3. /pageComponents

/pages (도메인) 에서만 사용하는 컴포넌트 파일만 생성한다.

- 파일명 : PascalCase + Main 로 네이밍 (컴포넌트명도 동일)

한 컴포넌트 파일에서만 사용되는 타입이 많이 정의되는 경우 component.type.ts 로 분리한다.

한 컴포넌트 파일에서만 사용되는 상수 값이 많이 정의되는 경우 component.const.ts 로 분리한다.

한 컴포넌트 파일에서만 사용되는 로직이 너무 길게 작성되는 경우 component.hooks.ts 로 분리한다.

한 컴포넌트 파일에서만 사용되는 유틸함수가 너무 길게 작성되는 경우 component.utils.ts 로 분리한다.

hygen 템플릿을 생성하는 것으로 대체 (관련 레포지터리 : )

명령어 : hygen next new pages

##### 2-4. /styles

글로벌 스타일 환경 설정만을 위한 파일을 생성한다.

- 파일명 : x.style.ts

다크모드, 디자인 시스템, UI-Kit 스타일 덮어쓰기 등 글로벌 스타일을 위한 파일 정의

##### 2-5. /utils

날짜, 숫자 포맷팅, 스토리지, 파싱 등 유틸 함수만을 위한 파일 디렉토리

- 파일명 : x.util.ts

유틸 파일 명을 기능 단위로 네이밍 한다. (stringParse.util.ts, format.util.ts, storage.util.ts)

##### 2-6. /hooks

모든 페이지에서 적용 가능한 커스텀훅 파일 (+api 커스텀훅)만 생성한다.

- 파일명 : use- prefix 를 항상 사용한다.

/hooks : 모든 페이지에서 사용할 수 있는 공통 커스텀 훅 정의 (컴포넌트, UI 동작을 위한 custom hooks 정의)

/hooks/query : 모든 api 쿼리 커스텀 훅 정의 (4. API 호출 부분 참고)

##### 2-7. /constants

모든 페이지에서 공통적으로 사용할 상수 값 정의

- 파일명 : x.const.ts

상수값의 기능 또는 목적에 따라서 파일명을 정한다. (api.const.ts, date.const.ts, regex.const.ts)

##### 2-8. /components

하나의 프로젝트의 모든 페이지에서 공통으로 사용가능한 컴포넌트들만 생성한다.

컴포넌트 생성 프로세스 (Atomic Design 과 3. 컴포넌트 작성 방법 참고)

- 명령어 : hygen next components new

- 디렉토리명 : 컴포넌트명 PascalCase

- 파일명 : 컴포넌트명 PascalCase

한 컴포넌트 파일에서만 사용되는 타입이 많이 정의되는 경우 Button.type.ts 로 분리한다.

한 컴포넌트 파일에서만 사용되는 상수 값이 많이 정의되는 경우 Button.const.ts 로 분리한다.

한 컴포넌트 파일에서만 사용되는 로직이 너무 길게 작성되는 경우 Button.hooks.ts 로 분리한다.

한 컴포넌트 파일에서만 사용되는 유틸함수가 너무 길게 작성되는 경우 Button.utils.ts 로 분리한다.

한 컴포넌트 파일에서만 사용되는 스타일 함수가 너무 길게 작성되는 경우 Button.style.ts 로 분리한다.

컴포넌트 속성명 : [antd 프로젝트 속성명](https://github.com/ant-design/ant-design)을 기준으로 작성한다. (많은 사람들이 사용하는 기준으로 동일하게 적용)

- 스토리북 : 여러 프로젝트에 사용될 수 있는 headless 공통 컴포넌트 또는 아이콘

##### 2-9. /api

API 명과 거의 동일한 구조로 디렉토리명을 가져갑니다.

- 디렉토리명 : API 스킴 구조를 따라서 camelCase

- 파일명 : API 스킴 구조를 따라서 camelCase.ts, camelCase.type.ts

- 커스텀 훅 API 쿼리를 생성하기 위한 axios 기반 fetch 함수들의 집합입니다.

- 도메인별로 디렉터리가 구분되어 있고 쿼리 파일과 타입 파일 2개가 존재합니다.

HTTP.ts 파일을 공통적으로 사용해야 합니다.

쉽게 타입과 백엔드 인터페이스를 찾을 수 있도록 [JSDoc을](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) 추가해서 타입 힌트를 추가합니다.

함수 네이밍 : {:method}{:apiDomain}{:Api}

타입명은 함수 명을 기반으로 찾기 쉽게 {:Method}...Params, {:Method}...Response 로 명명합니다.

반드시 타입명을 기재합니다.

PUT, POST, DELETE 의 body는 Payload, 쿼리 파라미터는 Params 로 명명합니다.

백엔드 API가 나오기 전에 [Next.js 의 API 라우팅](https://nextjs.org/docs/api-routes/introduction) 기능을 사용해서 더미데이터와 인터페이스를 처리합니다.

```
# 예제 소스코드
import { BASE_URL } from '@/constants/api.const'

import HTTP from '@/api/HTTP'
import { ... } from '@/api/HTTP.type'
import { ... } from '@/api/appVersion/appVersion.type'

/**
 * @docs
 * https://xxx.com
 */
export const getAppVersionApi = ({ page, size }: GetAppVersionApiParams) => {
  return HTTP.get<HttpResponse<GetAppVersionApiResponse[], MetaPagination>>(
    `${BASE_URL}/app-version`,
    {
      params: {
        page,
        size,
      },
    },
  )
}
```

##### 2-10. /interfaces

모든 페이지에서 공통으로 사용할 인터페이스를 정의합니다.

- 파일명 : xxx.type.ts

디바이스 타입, OS 타입, 타입 유틸함수 등 전역적으로 공통 사용가능한 타입을 정의합니다.

##### 2-11. /dummy

백엔드 인터페이스 및 개발 전에 더미로 생성할 파일들의 집합입니다.

페이지 도메인과 동일한 구조로 더미데이터 파일을 생성합니다.

- 파일 네이밍 : {:customName}{:Dummy}.ts

## 3. 네이밍 컨벤션

##### 3-1. 공통

- .ts (jsx가 없는 파일), .tsx (jsx가 있는 파일)

##### 3-2. 디렉터리

도메인 명 기준 네이밍 : 왠만하면 한 단어로 표현, 불가피하게 2단어 이상이라면 하이픈 - 으로 구분 (해당 디렉터리→ /page, /pageComponents)

- 디렉터리, 파일 네이밍 : 컴포넌트명은 PascalCase, 그 외는 camelCase

##### 3-3. 컴포넌트

컴포넌트명은 PascalCase, 그 외 파일은 camelCase

컴포넌트 명과 파일명은 일치해야함

커스텀훅 - 접두사 use : useCustomHooks

API 커스텀훅

=> GET: 접두사 use , 접미사 Query : useCustomQuery

=> POST, PUT, DELETE: 접두사 use , 접미사 Mutation : useCustomMutation

코드 컨벤션

https://github.com/tipjs/javascript-style-guide

https://github.com/airbnb/javascript

## 4. 컴포넌트 작성 방법

[Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) 기반 컴포넌트 구성

- 기능 단위 별로 컴포넌트를 쪼개고 이름을 정한다 (빨간색)

- 단위가 작아도 여러 페이지에서 공통으로 사용할 수 있는 컴포넌트는 공통 컴포넌트로 분리한다 (초록색)

![image](https://github.com/canoe726/Javascript-Lab/assets/36183001/fbfb158d-0986-4573-815f-40bba837d260)

## 5. API 호출

/hooks/query 디렉터리 내에 있는 파일들에 대한 정의들입니다.

API 도메인 별로 디렉터리를 구분한 다음 내부에 커스텀 훅을 정의한다.

##### 4-1. 메소드별 컨벤션

GET: 접두사 use , 접미사 Query : useCustomQuery

POST, PUT, DELETE: 접두사 use , 접미사 Mutation : useCustomMutation

4-2. 쿼리 키 컨벤션

쿼리 키 변수명 : 도메인과 일치하게 작성하고 postfix로 QueryKey 를 추가한다. (쿼리 파라미터 제외)

쿼리 키 데이터 : 도메인과 일치하게 작성하고 dynamic 인 경우 콜론(:) + 대표 필드명으로 정의한다.

```
import { useQuery } from 'react-query'

import { getAppVersionApi } from '@/api/appVersion/appVersion'
import { GetAppVersionApiParams } from '@/api/appVersion/appVersion.type'

import { ReactQueryOptions } from '../reactQueryOption.type'

export const appVersionQueryKey = '/app-version'

export function useAppVersionQuery(params: GetAppVersionApiParams, options?: ReactQueryOptions) {
  const { data, isLoading, isError, isSuccess, isFetching } = useQuery(
    [appVersionQueryKey, params],
    () => {
      return getAppVersionApi(params)
    },
    {
      ...options,
    },
  )

  return { data, isLoading, isError, isSuccess, isFetching }
}
```

## 6. 스토리북

- 실행 : `npm run storybook`

모든 페이지, 프로젝트에서 공통으로 사용할 수 있는 컴포넌트들만 정의합니다.

모든 프로젝트에 동일적으로 적용가능한 컴포넌트는 baseComponents 에 정의합니다.

baseComponents의 집합으로 이루어진 컴포넌트는 combinedComponents 에 정의합니다.

특정 라이브러리 (react-table 등)에 종속적인 컴포넌트는 packageComponents 에 정의합니다.

아이콘은 icons 에 정의합니다.

##### 6-1. 아이콘 (/icons)

- 추가 방법

`/stories/icons/svg` 에 svg 엘리먼트를 선언합니다.

선언한 아이콘을 `index.tsx` 에 추가합니다.

`Icons.tsx` 에 아이콘을 추가합니다.

- 특이사항

스토리북에서 아이콘 그리드에서 원하는 아이콘 카드를 클릭하면 컴포넌트 명을 Copy 할 수 있어 바로 사용가능합니다.

##### 6-2. 기본 컴포넌트 (/baseComponents)

- 추가 방법

컴포넌트를 선언하고 스토리를 생성한다.

스토리 생성 시 args bind 처리를 해주어야 스토리북에서 속성값으로 테스트 가능합니다.

index.tsx 에 컴포넌트를 추가합니다.

- 유의사항

Ant-design Github 레포지터리에 정의되어 있는 컴포넌트 속성명과 사용방법을 참고해서 비슷하게 정의합니다.

서드파티 라이브러리나 다른 컴포넌트와의 종속을 최소화 합니다.

##### 6-3. 합성 컴포넌트 (/combinedComponents)

- 유의사항

기본 컴포넌트들의 조합으로 이루어진 컴포넌트들의 집합입니다.

해당 컴포넌트는 baseComponents 변경에 취약합니다.

## 7. 테스트

##### 7-1. 환경

Jest (+ts), React-Testing-Library, React-Hooks-Testing-Library,

##### 7-2. 유닛 테스트 작성 방법

[선언형 프로그래밍](https://ui.toast.com/posts/ko_20210630) 방법을 적용해서 확장 가능하게 코드를 작성한다.

##### 7-3. 통합 테스트 작성 방법

SEO가 정상적으로 작동하는지 확인하기 위한 통합 테스트 코드를 작성합니다.
