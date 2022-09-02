# redux-logger, DevTools 사용법

## redux-logger

```bash
$ yarn add redux-logger
```

그 다음 index.js에서 불러와서 적용한다. 리덕스에 미들웨어를 적용할 때에는 다음과 같이 여러개의 미들웨어를 등록할 수 있다.

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
import logger from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(myLogger, logger)); // 여러개의 미들웨어를 적용 할 수 있다.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

결과는 다음과 같다.

![image](https://user-images.githubusercontent.com/98325285/188173765-6a1330b5-5423-4164-a516-be48a31bc111.png)

이제 만들었던 myLogger는 필요가 없으니 비활성화했다.

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

const store = createStore(rootReducer, applyMiddleware(logger)); // myLogger를 제거
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

![image](https://user-images.githubusercontent.com/98325285/188173840-bdc61c2c-507d-4afd-9136-49f3e95ae196.png)

제거하면 그림과 같이 정보들이 표시가 된다.

## redux DevTools 사용하기

redux DevTools를 미들웨어와 같이 사용해야한다면 어떻게 해야할까?

[메뉴얼 상 사용법](https://www.npmjs.com/package/redux-devtools-extension#usage)은 다음과 같다.

```jsx
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);
```

그럼 메뉴얼에 맞춰서 index.js를 수정해보았다. 그 전에 redux-devtools-extension을 설치해야한다.

```bash
$ yarn add redux-devtools-extension
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

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
); // 여러개의 미들웨어를 적용 할 수 있다.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

![image](https://user-images.githubusercontent.com/98325285/188173910-7350771c-5431-4542-b9eb-98d3f386816d.png)

redux DevTools가 잘 작동된다.
