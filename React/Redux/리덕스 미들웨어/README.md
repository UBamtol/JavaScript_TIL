# 리덕스 미들웨어

리덕스 미들웨어는 리덕스가 지니고 있는 핵심 기능이다. Context API 또는 MobX를 사용하는 것과 차별화가 되는 부분이다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6eaa06b6-6634-46c3-97ae-71bd9f01ad25/Untitled.png)

리덕스 미들웨어를 사용하면 액션이 디스패치 된 다음, 리듀서에서 해당 액션을 받아와서 업데이트하기 전에 추가적인 작업을 할 수 있다.

### 미들웨어에서 가능한 추가적인 작업

- 특정 조건에 따라 액션이 무시되게 만들 수 있다.
- 액션을 콘솔에 출력하거나, 서버쪽에 로깅을 할 수 있다.
- 액션이 디스패치 됐을 때 이를 수정해서 리듀서에게 전달되도록 할 수 있다.
- 특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 할 수 있다.
- 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행시킬 수 있다.

보통 **리덕스에서 미들웨어를 사용하는 주된 사용 용도**는 **비동기 작업을 처리**할 때 이다. 예를 들어 리액트앱에서 백엔드 API를 연동해야 한다면 리덕스 미들웨어를 사용하여 처리하곤 한다.

리덕스 미들웨어는 누구든지 만들어서 사용할 수 있지만, 일반적으로는 리덕스 미들웨어 라이브러리를 설치하여 사용한다. 비동기 작업에 관련된 미들웨어 라이브러리는 [redux-thunk](https://github.com/reduxjs/redux-thunk), [redux-saga](https://github.com/redux-saga/redux-saga), [redux-observable](https://redux-observable.js.org/), [redux-promise-middleware](https://www.npmjs.com/package/redux-promise-middleware) 등이 있다.

redux-saga와 redux-observable의 경우엔 특정 액션을 모니터링 할 수 있으므로, 특정 액션이 디스패치 됐을 때 원하는 함수를 호출하거나 또는 라우터를 통해 다른 주소로 이동하는 것이 가능하다.

하지만 미들웨어를 사용하여 비동기 작업을 처리하는 방법으로 가장 많이 사용되는 라이브러리는 redux-saga와 redux-thunk이다.
