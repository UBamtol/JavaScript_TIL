# 미들웨어 만들어보고 이해하기

실무에서는 리덕스 미들웨어를 직접 만들게 되는 일은 거의 없다고 한다. 하지만 이번에는 직접 만들면서 어떤 역할을 하는지 이해를 해보려고 한다.

## 리덕스 미들웨어의 템플릿

리덕스 미들웨어를 만들 땐 다음 [템플릿](https://redux.js.org/tutorials/fundamentals/part-4-store#middleware)을 사용한다.

```jsx
const middleware = (store) => (next) => (action) => {
  // 하고 싶은 작업...
};
```

미들웨어는 결국 하나의 함수이다. 함수를 연달아서 두번 리턴하는 함수다. 화살표가 여러번 나타나는 게 처음이라서 어색하지만 이것은 function키워드로 작성한다면 다음과 같다.

```jsx
function middleware(store) {
  return function (next) {
    return function (action) {
      // 하고 싶은 작업...
    };
  };
}
```

이제 여기서 각 함수에서 받아오는 파라미터가 어떤 것을 의미하는지 보자.

첫번째 store는 리덕스 스토어 인스턴스다. 이 안에 dispatch, getState, subscribe 내장함수들이 들어있다.

두번째 next는 액션을 다음 미들웨어에게 전달하는 함수다. next(action) 이런 형태로 사용한다. 만약 다음 미들웨어가 없다면 리듀서에게 액션을 전달해준다. 만약에 next를 호출하지 않게 된다면 액션이 무시처리되어 리듀서에게 전달되지 않는다.

세번째 action은 현재 처리하고 있는 액션 객체이다.

<img width="790" alt="image" src="https://user-images.githubusercontent.com/98325285/187712532-aba9a255-bbe2-4a85-84e8-a86baba6d707.png">

미들웨어는 위와 같은 구조로 작동한다. 리덕스 스토어에는 여러 개의 미들웨어를 등록할 수 있다. 새로운 액션이 디스패치되면 첫번째로 등록한 미들웨어가 호출된다. 만약에 미들웨어에서 next(action)을 호출하게 되면 다음 미들웨어로 액션이 넘어간다. 그리고 만약 미들웨어에서 store.dispatch를 사용하면 다른 액션을 추가적으로 발생시킬 수도 있다.

## 미들웨어 만들기

src/middlewares/myLogger.js를 만들었다.

### src/middlewares/myLogger.js

```jsx
const myLogger = store => next => action {
	console.log(action); // 먼저 액션을 출력한다.
	const result = next(action); // 다음 미들웨어 (또는 리듀서)에게 액션을 전달한다.
	return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이다. 기본: undefined
};
```

단순히 전달받은 액션을 출력하고 다음으로 넘기는 작업이다.

## 미들웨어 적용하기

미들웨어를 스토어에 적용하려면 applyMiddleware라는 함수를 사용한다.

### index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import myLogger from './middlewares/myLogger';

const store = createStore(rootReducer, applyMiddleware(myLogger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

그럼 액션이 잘 출력되는 것을 볼 수 있다.

<img width="609" alt="image" src="https://user-images.githubusercontent.com/98325285/187715074-e2846484-2a6a-4819-8a95-9ab2c6796332.png">

## 미들웨어 수정하기

액션이 리듀서까지 전달되고 난 후의 새로운 상태를 확인하고 싶다면 다음과 같이 수정할 수 있다.

```jsx
const myLogger = (store) => (next) => (action) => {
  console.log(action); // 먼저 액션을 출력한다.
  const result = next(action); // 다음 미들웨어 (또는 리듀서)에게 액션을 전달한다.

  // 업데이트 이후의 상태를 조회합니다.
  console.log('\t', store.getState()); // '\t' 는 탭 문자다.
  return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이다. 기본: undefined
};

export default myLogger;
```

<img width="609" alt="image" src="https://user-images.githubusercontent.com/98325285/187715180-8c181538-7217-4b1b-85f8-3a3ce1c371ec.png">

업데이트 후의 상태가 잘 나타날 것이다.

미들웨어 안에서는 무엇이든 가능하다. 예를 들어 액션 값을 객체가 아닌 함수도 받아오게 만들어서 액션이 함수타입이면 이를 실행하게끔 할 수도 있다.(이것이 redux-thun이다.)

이번에 객체와 상태를 로깅하는 작업을 했다. 리덕스 관련 값들을 콘솔에 로깅하는 건 이렇게 직접 만드는 것보다 redux-logger라는 미들웨어를 사용하는 게 더 좋다고 한다.
