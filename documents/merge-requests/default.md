<!-- https://techblog.woowahan.com/7152/ -->

# EBC Ground Rules

- [EBC 브랜치 전략 확인하기](https://ent-bc.atlassian.net/wiki/spaces/EG/pages/241730980)
- [EBC 커밋 린트 확인하기](https://ent-bc.atlassian.net/wiki/spaces/svcdev/pages/274694301/ALOT+EBC+Commit+Link+feat.+husky)

## 연관된 이슈

- 이슈번호 템플릿
  - feature/IN-XXXX
  - bug/IN-XXXX
  - hotfix/IN-XXXX

Closes <**이슈번호**>

## Merge Request 전 체크리스트!

- [ ] 이슈 번호 확인
- [ ] 배포하려는 이슈 정보 기입 여부 확인 (시작일, 종료일, 연관된 버전 등...)
- [ ] [클린 코드](https://ent-bc.atlassian.net/wiki/spaces/IN/pages/167051720/ALOT) 여부 확인
- [ ] [버전 업데이트](https://semver.org/lang/ko/) 확인
- [ ] 빌드 성공 여부 확인
- [ ] [코드 리뷰](#코드-리뷰-규칙-문서) 여부 확인 (옵션)

# 해결하려는 문제가 무엇인가요?

- _(예시) TS2305: Module '"react-router"' has no exported member 'useHistory'. 에러를 내면서 빌드가 깨집니다. 다른 모듈에 의해 react-router 버전이 5 -> 6으로 올라간 게 문제입니다._

<br/>

- **(본문)**

# 어떻게 해결했나요?

- _(예시) 사용하는 react-router의 버전을 package.json에 명시합니다._

<br/>

- **(본문)**

## Attachment

- 이번 MR 의 Front 동작을 이해를 돕는 GIF 파일 첨부!

- 리뷰어의 이해를 돕기 위한 모듈/클래스 설계에 대한 Diagram 포함!

- 결과 이미지

| 결과이미지1 | 결과이미지2 |
| ----------- | ----------- |
| 이미지      | 이미지      |

| 결과이미지1 | 결과이미지2 | 결과이미지3 |
| ----------- | ----------- | ----------- |
| 이미지      | 이미지      | 이미지      |

## 코드 리뷰 규칙 문서

**0. TLTR;**

- MR Template에 맞춰서 작성해 주세요.
- 작은 MR을 유지하세요 (최대 300줄 미만)

**1. 리뷰이 규칙**

- 리뷰어가 적은 노력으로 코드 리뷰를 잘할 수 있게 아래 규칙을 신경 써주세요.

* 코드 리뷰의 설명은 최대한 자세하게 작성되어야 합니다 🌟

  - 리뷰 작성자는 본인이 알고 있는 사항을 리뷰어들도 알고 있을 것이라는 가정을 버리고 코드 리뷰에 대한 충분한 문맥이 전달될 수 있도록 코드 리뷰 설명을 자세히 작성해 주세요.

  - 리뷰어들이 코드 리뷰에 들어가는 시간을 줄이고 최대한 많은 버그들을 미리 발견해낼 수 있도록 코드 리뷰의 크기는 삭제를 포함해서 최대 300줄 미만으로 유지해 주세요. 🌟

**2. 리뷰어 규칙**

- 코드 리뷰의 코멘트에 코멘트를 강조하고 싶은 정도를 표기하세요 (Pn 규칙)

- 리뷰어는 코드 리뷰의 코멘트에 코멘트를 강조하고 싶은 정도를 Pn 규칙에 맞춰서 표기해 주세요: 🌟

```
P1: 꼭 반영해 주세요 (Request changes)
P2: 적극적으로 고려해 주세요 (Request changes)
P3: 웬만하면 반영해 주세요 (Comment)
P4: 반영해도 좋고 넘어가도 좋습니다 (Approve)
P5: 그냥 사소한 의견입니다 (Approve)
```

- 리뷰 작성자를 칭찬해 주세요 🌟

  - 리뷰어는 코드 리뷰에 별달리 코멘트할 내용이 없다면 변경 사항을 작업하기 위해 수고한 리뷰 작성자를 칭찬하는 코멘트를 남겨주세요.

**2. MR 크기가 작아야 하는 이유**

- 적합한 MR 단위는 어떻게 되나요?

  - 하나의 티켓에서 여러 개의 MR을 작성해도 됩니다.

  - 리팩토링 작업은 분리해 주세요.

  - [작게 쪼개기](https://soojin.ro/review/small-cls)를 참고해 주세요.

- 라벨로 코드 리뷰의 우선순위를 표시하세요 (D-n 규칙)

  - 코드 리뷰가 완료되어야 하는 시점을 D-N 형식의 라벨로 코드 리뷰에 추가해 주세요. 예를 들어, D-3 은 3일 이내에 코드 리뷰가 리뷰어에게서 확인되어야 한다는 의미입니다.

  - 이슈가 없는 코드 리뷰는 D-3 라벨로 표기하고 당장 긴급하게 시스템에 반영되어야 하는 사항은 D-0 라벨로 표기해서 모든 리뷰어가 긴급하게 코드 리뷰를 할 수 있도록해 주세요.

  - 매일 라벨을 업데이트해주세요.

  - D-0이 된 다음 날까지 어느 리뷰어도 코드 리뷰를 시작하지 않았다면 리뷰 작성자는 스스로 해당 변경 사항을 코드 베이스에 반영(Merge)할 수 있습니다.

- 최소 한 명의 리뷰어에게 리뷰를 받아야 합니다

  - 같이 프로젝트를 진행하는 팀원들의 코드 리뷰를 받습니다.

  - 필요하면 같이 프로젝트를 진행하지 않는 팀원을 리뷰어로 할당해서 요청합니다.

- 피드백을 반영하면 코멘트를 남겨주세요

  - 피드백에 변경한 내용이 무엇인지 리뷰어에게 알려주세요.

**3. 참고 문서**

- [코드 리뷰 in 뱅크샐러드 개발 문화](https://blog.banksalad.com/tech/banksalad-code-review-culture/) – D-n, Pn 규칙
- [효과적인 코드 리뷰를 위해서](https://engineering.linecorp.com/ko/blog/effective-codereview) – MR 크기가 작아야 하는 이유
