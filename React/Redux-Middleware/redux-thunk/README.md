# redux-thunk

redux-thunk는 리덕스에서 비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어다. 이 **미들웨어는 액션 객체가 아닌 함수를 디스패치 할 수 있다**. 리덕스 공식 메뉴얼에서는 비동기 작업을 처리하기 위하여 미들웨어를 사용하는 예시가 나와있다.

```jsx
const thunk = (store) => (next) => (action) => {
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);
};
```

redux-thunk의 코드는 위와 유사하다. 그냥 추가 기능을 위하여 몇 줄이 조금 더 추가된 것이다.

이 미들웨어를 사용하면 함수를 디스패치 할 수 있다고 하는데 함수를 디스패치 할 때에는 해당 함수에서 dispatch 와 getState를 파라미터로 받아와줘야 한다. 이 함수를 **만들어주는 함수**를 `thunk`라고 부른다.

다음은 thunk의 사용 예시이다.

```jsx
const getComments = () => (dispatch, getState) => {
	// 이 안에서는 액션을 dispatch할 수도 있고
	// getState를 사용하여 현재 상태도 조회할 수 있다.
	const id = getState().post.activeId;

	// 요청이 시작했음을 알리는 액션
	dispatch({type: 'GET_COMMENTS' });

	// 댓글을 조회하는 프로미스를 반환하는 getComments가 있다고 가정했을 때
	api
		.getComments(id) // 요청을 하고
		.then(comments => dispatch({ type: 'GET_COMMMENTS_SUCCESS', id, comments });
		.catch(e => dispatch({ type: 'GET_COMMENTS_ERROR', error: e })); // 실패시
};
```

thunk함수에서 async/await를 사용해도 상관없다.

```jsx
const getComments = () => async (dispatch, getState) => {
  const id = getState().post.activeId;
  dispatch({ type: 'GET_COMMENTS' });
  try {
    const comments = await api.getComments(id);
    dispatch({ type: 'GET_COMMENTS_SUCCESS', id, commemts });
  } catch (e) {
    dispatch({ type: 'GET_COMMENTS_ERROR', error: e });
  }
};
```

## redux-thunk 설치 및 적용

```bash
$ yarn add redux-thunk
```

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
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  // logger 를 사용하는 경우, logger가 가장 마지막에 와야한다.
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
); // 여러개의 미들웨어를 적용 할 수 있다.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

## 카운터 딜레이하기

thunkg함수를 만들고, setTimeout를 사용하여 액션이 디스패치되는 것을 1초씩 딜레이시키기

### modules/counter.js

```jsx
// 액션 타입
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// getState를 쓰지 않는다면 굳이 파라미터로 받아올 필요없다.
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(increase()), 1000);
};
export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(decrease()), 1000);
};

// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없다.)
const initialState = 0;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
```

이제 컨테이너 컴포넌트도 수정한다.

### containers/CounterContainer.js

```jsx
import React from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { increaseAsync, decreaseAsync } from '../modules/counter';

function CounterContainer() {
  const number = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };
  const onDecrease = () => {
    dispatch(decreaseAsync());
  };

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}

export default CounterContainer;
```
