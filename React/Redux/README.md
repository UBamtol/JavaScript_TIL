# 시작하기

## Redux

Redux는 javascript 상태관리 라이브러리이다.

## 설치

### Redux Toolkit

Redux Toolkit은 Redux 앱을 만들기에 필수적으로 여기는 패키지와 함수들을 포함한다. 대부분의 Redux 작업을 단순화하고, 실수를 방지하며, Redux 앱을 만들기 쉽게 해주는 사례를 통해 만들어졌다.

RTK(Redux Toolkit)는 **저장소 준비, 리듀서 생산과 뷸변 수정 로직 작성, 상태 “조각" 전부를 한번에 작성** 등 일반적인 작업들을 단순화 해주는 유틸리티를 포함한다.

Redux를 새로 입문하는 사람들에게 Redux Toolkit은 더 나은 Redux 코드를 만들게 해준다.

RTK는 npm에서 패키지로 받아 모듈 번들러나 node앱에서 사용 가능하다.

```bash
#npm
npm install @reduxjs/toolkit

#yarn
yarn add @reduxjs/tookit
```

### React Redux 앱 만들기

React와 Redux로 새 앱을 만들기 위해 추천되는 방법은 **creat-react-app을 위한 공식 redux+js 템플릿 사용**이다. 이를 통해 RTK와 react redux가 react 컴포넌트와 통합되는 이점을 누릴 수 있다.

```bash
npx create-react-app my-app --template redux
```

### Redux 코어

Redux 코어 라이브러리는 npm에서 패키지로 받아 모듈 번들러나 node앱에서 사용 가능하다.

```bash
#npm
npm install redux

#yarn
yarn add redux
```
