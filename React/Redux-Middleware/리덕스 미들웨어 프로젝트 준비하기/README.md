# 리덕스 미들웨어 프로젝트 준비

리덕스 미들웨어를 공부하기 위한 프로젝트를 새로 생성한다.

```bash
$ npx create-react-app learn-redux-middleware
```

그 다음 해당 디렉터리에서 redux와 react-redux를 설치해준다.

```bash
$ cd learn-redux-middleware
$ yarn add redux react-redux
```

이제 카운터를 만들어보자

## 리덕스 모듈 준비

이번 역시 액션 타입, 액션 생성함수, 리듀서를 한 파일에 작성하는 Ducks 패턴을 사용할 것이다. src디렉터리에 modules 디렉터리를 만들고, 그 안에 counter.js라는 파일을 생성해 다음과 같이 작성했다.

원래 Ducks 패턴을 따르는 리덕스 모듈에서는 액션 이름에 ‘counter/INCREASE’ 이런 식으로 앞부분에 접두어를 두지만 이번에는 액션이름이 중복되는 일이 없으니 편의상 생략했다. 하지만 개인적으로는 중복되는 일이 없어도 넣는 것이 좋아보인다.

### modules/counter.js

```bash
// 액션타입
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 생성함수
export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});

// 초기값 (상태가 객체가 아닌 그냥 숫자여도 상관없다.)
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

그 다음은 루트 리듀서를 만들어준다. 지금은 서브리듀서가 하나밖에 없는 상황이지만 나중에 더 추가할 것이다.

### modules/index.js

```bash
import { combineReducers } from 'redux';
import counter from './counter';

const rootReducer = combineReducers({counter});

export default rootReducer;
```

## 프로젝트에 리덕스 적용하기

프로젝트에 리덕스를 적용할 때는 src 디렉터리의 index.js에서 루트 리듀서를 불러와서 이를 통해 새로운 스토어를 만들고 Provider를 사용해서 프로젝트에 적용한다.

1. src/index.js에서 루트 리듀서 import
2. 루트 리듀서를 이용하여 스토어 만들기
3. Provider를 사용해서 프로젝트에 적용하기

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
```

## 프리젠테이셔널 컴포넌트 준비

components 디렉터리에 Counter.js 파일을 만들고 해당 컴포넌트에서 number, onIncrease, onDecrease를 props로 받아온다.
