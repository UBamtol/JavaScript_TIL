# 리덕스 모듈 만들기

리덕스 모듈이란 다음 항목들이 모두 들어있는 자바스크립트 파일을 의미한다.

- 액션 타입
- 액션 생성함수
- 리듀서

리덕스를 사용하기 위해 필요한 위 항목들은 각각 다른 파일에 저장 할 수도 있다.

리덕스 GitHub 레포에 등록되어있는 [예제 프로젝트](https://github.com/reduxjs/redux/tree/master/examples/todos/src)를 보면 다음과 같이 코드가 분리되어 있다.

- actions
    - index.js
- reducers
    - todos.js
    - visibilityFilter.js
    - index.js

위 예제 프로젝트에서는 액션과 리듀서가 서로 다른 파일에 정의되어있다. 하지만 이 코드들이 꼭 분리되어있을 필요는 없다. 이 코드들이 서로 다른 디렉터리에, 그리고 서로 다른 파일에 분리가 되어있으면 개발을 하는데 꽤나 불편하다. 그래서 나는 리듀서와 액션 관련 코드들을 하나의 파일에 몰아서 작성하려고 한다. 이를 [Ducks 패턴](https://github.com/erikras/ducks-modular-redux)이라고 부른다. 리덕스 관련 코드를 분리하는 방식은 정해져있는 방식이 없으므로 자유롭게 분리하셔도 상관없다.

### **counter 모듈 만들기**

첫번째 모듈은 counter 모듈이다.

src 디렉터리에 modules 디렉터리를 만들고, 그 안에 counter.js 파일을 생성했다.

**주석이 중요**하다.

### **modules/counter.js**

```tsx
/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어준다.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있다.
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내준다.
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* 초기 상태 선언 */
const initialState = {
  number: 0,
  diff: 1,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff,
      };
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff,
      };
    default:
      return state;
  }
}

```

### **todos 모듈 만들기**

두번째는 todos 모듈이다. modules 디렉터리에 todos.js 파일을 생성했다.

### **modules/todos.js**

```tsx
/* 액션 타입 선언 */
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

/* 액션 생성함수 선언 */
let nextId = 1; // todo 데이터에서 사용 할 고유 id
export const addTodo = text => ({
  type: ADD_TODO,
  todo: {
    id: nextId++, // 새 항목을 추가하고 nextId 값에 1을 더해준다.
    text
  }
});
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

/* 초기 상태 선언 */
// 리듀서의 초기 상태는 꼭 객체타입일 필요 없다.
// 배열이여도 되고, 원시 타입 (숫자, 문자열, 불리언 이여도 상관 없다.
const initialState = [
  /* 다음과 같이 구성된 객체를 이 배열 안에 넣을 것이다.
  {
    id: 1,
    text: '예시',
    done: false
  }
  */
];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.id // id 가 일치하면
            ? { ...todo, done: !todo.done } // done 값을 반전시키고
            : todo // 아니라면 그대로 둔다
      );
    default:
      return state;
  }
}

```

### **루트 리듀서 만들기**

현재 두가지의 리덕스 모듈을 만들었다. 그래서 리듀서도 두개이다. **한 프로젝트에 여러개의 리듀서가 있을때는 이를 한 리듀서로 합쳐서 사용**한다. **합쳐진 리듀서를 루트 리듀서**라고 부른다.

리듀서를 합치는 작업은 리덕스에 내장되어있는 `[combineReducers](https://redux.js.org/api/combinereducers)`라는 함수를 사용한다.

modules 디렉터리에 index.js 를 만들고 다음과 같이 코드를 작성했다.

### **modules/index.js**

```tsx
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;

```

이제 리듀서가 합쳐졌다. 루트 리듀서가 만들어졌으면, 이제 스토어를 만들어보자.

리덕스 스토어를 만드는 작업은 src 디렉터리의 index.js 에서 했다.

### **index.js**

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer); // 스토어를 만든다.
console.log(store.getState()); // 스토어의 상태를 확인한다.

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

```

스토어를 만들고, 스토어의 상태를 출력해보았다. 브라우저에서는 다음과 같이 출력이 된다.

![https://i.imgur.com/uDzQ8BV.png](https://i.imgur.com/uDzQ8BV.png)

counter, todos 서브 리듀서의 상태가 합쳐졌다.

### **리액트 프로젝트에 리덕스 적용하기**

리액트 프로젝트에 리덕스를 적용 할 때에는 react-redux 라는 라이브러리를 사용해야한다.

```powershell
$ yarn add react-redux

```

그 다음에는 index.js 에서 Provider라는 컴포넌트를 불러와서 App 컴포넌트를 감싸준자. 그리고 Provider의 props 에 store 를 넣어준다.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer); // 스토어를 만든다.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

```

Provider로 store를 넣어서 App 을 감싸게 되면 렌더링하는 그 어떤 컴포넌트던지 리덕스 스토어에 접근 할 수 있게 된다.
