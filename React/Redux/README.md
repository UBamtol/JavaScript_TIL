# 시작하기

## Redux

Redux는 javascript 상태관리 라이브러리이다. 리덕스는 컴포넌트들의 상태 관련 로직들을 다른 파일들로 분리시켜 더욱 효과적을 관리할 수 있고 전역 상태 관리도 손쉽게 할 수 있다. 하지만 Context API를 사용해도 전역 상태를 관리할 수 있고 상태 관리 로직을 분리할 수있다. 특히, Context API 와 useReducer Hook을 사용해서 개발하는 방법이 비슷하다. 리덕스에서도 리듀서와 액션이라는 개념이 존재한다. 그렇다면 굳이 왜 리덕스를 사용하는 걸까?

### Redux와 Context API를 사용하는 것의 차이

1. 미들웨어

   리덕스에는 미들웨어(middleware)라는 개념이 존재한다. 리덕스로 상태 관리를 할 때에는 useReducer를 사용하면서 접했던 개념인 리듀서 함수를 사용한다. 리덕스의 미들웨어를 사용하면 액션 객체가 리듀서에서 처리되기 전에 우리가 원하는 작업들을 수행할 수 있다. 예를 들면

   - 특정 조건에 다라 액션이 무시되게 할 수 있다.
   - 액션을 콘솔에 출력하거나, 서버쪽에 로깅을 할 수 있다.
     ※ 로깅이란 로그(log)를 생성하도록 시스템을 작성하는 활동이다.
   - 액션이 디스패치 됐을 때 이를 수정해서 리듀서에게 전달되도록 할 수 있다.
   - 특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 할 수 있다.
   - 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행시킬 수 있다.

   미들웨어는 주로 비동기 작업을 처리할 때 많이 사용된다.

2. 유용한 함수와, Hooks

   Context API와 useReducer를 사용할 때에는 Context도 새로 만들고, Context의 Provider 설정도 하고 각 Context를 편하게 사용하기 위해 전용 커스텀 Hook을 따로 만들어서 사용하기도 했다. 리덕스에서는 이와 비슷한 작업을 편리하게 해줄 수 있는 여러 기능들이 존재한다.

   connect 함수를 사용하면 리덕스의 상태 또는 액션 생성 함수를 컴포넌트의 props로 받아올 수 있으며, useSelector, useDispatch, useStore과 같은 Hooks를 사용하면 손쉽게 상태를 조회하거나 액션을 디스패치할 수도 있다.

   connect 함수와 useSelector 함수에는 내부적으로 최적화가 잘 이루어져있어서 실제 상태가 바뀔때만 컴포넌트가 리렌더링된다. 반면 Context API를 사용할 때에는 이런 최적화가 자동으로 이루어져 있지 않기 때문에 Context가 갖고 있는 상태가 바뀌면 해당 Context의 Provider 내부 컴포넌트들이 모두 리렌더링된다.

3. 하나의 커다란 상태

   Context API를 사용해서 글로벌 상태를 관리할 때에는 일반적으로 기능별로 Context를 만들어서 사용하는 것이 일반적이다. 반면 **리덕스에서는 모든 글로벌 상태를 하나의 커다란 상태 객체에 넣어서 사용하는 것이 필수**이다. 때문에 매번 Context를 새로 만드는 수고로움을 덜 수 있다.

### 그렇다면 리덕스는 언제 사용해야 할까?

프로젝트에서 다음을 고려해서 선택을 하면 된다.

1. 프로젝트의 규모가 큰가?
   - Yes: 리덕스
   - No: Context API
2. 비동기 작업을 자주 하게 되는가?
   - Yes: 리덕스
   - No: Context API
3. 리덕스를 배워보니깐 사용하는 게 편한가?
   - Yes: 리덕스
   - No: Context API or MobX

여기서 3번이 매우 중요하다. 리덕스가 아무리 좋은 라이브러리라고 해도 사용자에게 맞지 않고 어렵게 느껴지면 굳이 사용할 필요는 없다.

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
