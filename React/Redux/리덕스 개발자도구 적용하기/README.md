# 리덕스 개발자도구 적용하기

리덕스 개발자도구를 사용하면 현재 스토어의 상태를 개발자 도구에서 조회할 수 있고 지금까지 어떤 액션들이 디스패치 되었는지 그리고 액션에 따라 상태가 어떻게 변화했는지 확인할 수 있다. 추가적으로 액션을 직접 디스패치 할 수 도 있다.

## 리덕스 개발자도구 적용하는 방법

크롬 웹 스토어에서 [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)라는 확장 프로그램을 설치한다.

그 다음 프로젝트에 redux-devtools-extension을 설치한다.

```bash
$ yarn add redux-devtools-extension
```

그 다음 index.js를 다음과 같이 수정하면 끝이다.

### index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

const store = createStore(rootReducer, composeWithDevTools()); // 스토어를 만듭니다.
// composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

크롬 개발자 도구를 열어서 Redux 탭을 확인하면 현재 상태와 액션 기록들이 보인다.
