# redux-thunk로 프로미스 사용하기

일단 프로미스를 다루기 전에 프로미스를 사용해서 데이터를 반환하는 api를 간단하게 만들자.

### api/post.js

```jsx
// n 밀리세컨드동안 기다리는 프로미스를 만들어주는 함수
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

// 포스트 목록 데이터
const posts = [
  {
    id: 1,
    title: '리덕스 미들웨어를 배워봅시다',
    body: '리덕스 미들웨어를 직접 만들어보면 이해하기 쉽죠.',
  },
  {
    id: 2,
    title: 'redux-thunk를 사용해봅시다',
    body: 'redux-thunk를 사용해서 비동기 작업을 처리해봅시다!',
  },
  {
    id: 3,
    title: 'redux-saga도 사용해봅시다',
    body: '나중엔 redux-saga를 사용해서 비동기 작업을 처리하는 방법도 배워볼 거예요.',
  },
];

// 포스트 목록을 가져오는 비동기 함수
export const getPosts = async () => {
  await sleep(500); // 0.5초 쉬고
  return posts; // posts 배열
};

// id로 포스트를 조회하는 비동기 함수
export const getPostById = async (id) => {
  await sleep(500); // 0.5초 쉬고
  return posts.find((post) => post.id === id); // id 로 찾아서 반환
};
```

## posts 리덕스 모듈 준비하기

프로미스를 다루는 리덕스 모듈은 다음과 같은 사항을 고려해야 한다.

1. 프로미스가 시작, 성공, 실패했을 때 다른 액션을 디스패치해야한다.
2. 각 프로미스마다 thunk함수를 만들어줘야 한다.
3. 리듀서에서 액션에 따라 로딩 중, 결과, 에러 상태를 변경해줘야 한다.

### modules/post.js

```jsx
import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮다.

export const getPosts = () => async (dispatch) => {
  dispatch({ type: GET_POSTS }); // 요청이 시작됨
  try {
    const posts = await postsAPI.getPosts(); // API 호출
    dispatch({ type: GET_POSTS_SUCCESS, posts }); // 성공
  } catch (e) {
    dispatch({ type: GET_POSTS_ERROR, error: e }); // 실패
  }
};

// thunk 함수에서도 파라미터를 받아와서 사용 할 수 있다.
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST }); // 요청이 시작됨
  try {
    const post = await postsAPI.getPostById(id); // API 호출
    dispatch({ type: GET_POST_SUCCESS, post }); // 성공
  } catch (e) {
    dispatch({ type: GET_POST_ERROR, error: e }); // 실패
  }
};

const initialState = {
  posts: {
    loading: false,
    data: null,
    error: null,
  },
  post: {
    loading: false,
    data: null,
    error: null,
  },
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: true,
          data: action.posts,
          error: null,
        },
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: action.error,
        },
      };
    case GET_POST:
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          loading: true,
          data: action.post,
          error: null,
        },
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
```

위와 같이 반복되는 코드는 따로 함수화하여 코드를 리팩토링 하는 것이 좋다고 한다.

## 리덕스 모듈 리팩토링하기

### lib/asyncUtils.js

```jsx
// Promise에 기반한 Thunk를 만들어주는 함수다.
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  // 이 함수는 promiseCreator가 단 하나의 파라미터만 받는다는 전제하에 작성되었다.
  // 만약 여러 종류의 파라미터를 전달해야하는 상황에서는 객체 타입의 파라미터를 받아오도록 하면 된다.
  // 예: writeComment({ postId: 1, text: '댓글 내용' });
  return (param) => async (dispatch) => {
    // 요청 시작
    dispatch({ type, param });
    try {
      // 결과물의 이름을 payload 라는 이름으로 통일시킨다.
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload }); // 성공
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true }); // 실패
    }
  };
};

// 리듀서에서 사용 할 수 있는 여러 유틸 함수들이다.
export const reducerUtils = {
  // 초기 상태. 초기 data 값은 기본적으로 null 이지만 바꿀 수도 있다.
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  // 로딩중 상태. prevState의 경우엔 기본값은 null 이지만
  // 따로 값을 지정하면 null 로 바꾸지 않고 다른 값을 유지시킬 수 있다.
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  // 성공 상태
  success: (payload) => ({
    loading: false,
    data: payload,
    error: null,
  }),
  // 실패 상태
  error: (error) => ({
    loading: false,
    data: null,
    error: error,
  }),
};
```

이제 이 함수들을 이용하여 기존 posts 모듈을 리팩토링 할 것이다.

### modules/posts.js

```jsx
import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import { createPromiseThunk, reducerUtils } from '../lib/asyncUtils';

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 쉽게 thunk 함수를 만들 수 있게 되었다.
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했다.
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: reducerUtils.loading(),
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload), // action.posts -> action.payload 로 변경됐다.
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.error),
      };
    case GET_POST:
      return {
        ...state,
        post: reducerUtils.loading(),
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: reducerUtils.success(action.payload), // action.post -> action.payload 로 변경됐다.
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: reducerUtils.error(action.error),
      };
    default:
      return state;
  }
}
```

이제 반복되는 코드가 많이 줄었지만 리듀서쪽에서는 여전히 반복되는 코드들이 많다. 이것도 원한다면 리팩토링 할 수 있다.

asyncUtils.js에서 handleAsyncActions라는 함수를 다음과 같이 작성했다.

### lib/asyncUtils.js

```jsx
// Promise에 기반한 Thunk를 만들어주는 함수이다.
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  // 이 함수는 promiseCreator가 단 하나의 파라미터만 받는다는 전제하에 작성되었다.
  // 만약 여러 종류의 파라미터를 전달해야하는 상황에서는 객체 타입의 파라미터를 받아오도록 하면 된다.
  // 예: writeComment({ postId: 1, text: '댓글 내용' });
  return (param) => async (dispatch) => {
    // 요청 시작
    dispatch({ type, param });
    try {
      // 결과물의 이름을 payload 라는 이름으로 통일시킨다.
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload }); // 성공
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true }); // 실패
    }
  };
};

// 리듀서에서 사용 할 수 있는 여러 유틸 함수들이다.
export const reducerUtils = {
  // 초기 상태. 초기 data 값은 기본적으로 null 이지만
  // 바꿀 수도 있다.
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  // 로딩중 상태. prevState의 경우엔 기본값은 null 이지만
  // 따로 값을 지정하면 null 로 바꾸지 않고 다른 값을 유지시킬 수 있다.
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  // 성공 상태
  success: (payload) => ({
    loading: false,
    data: payload,
    error: null,
  }),
  // 실패 상태
  error: (error) => ({
    loading: false,
    data: null,
    error: error,
  }),
};

// 비동기 관련 액션들을 처리하는 리듀서를 만들어준다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 이다.
export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};
```

handleAsyncActions 함수를 만들었으면 posts리듀서를 다음과 같이 리팩토링 할 수 있다.

### modules/post.js

```jsx
import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
} from '../lib/asyncUtils';

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 아주 쉽게 thunk 함수를 만들 수 있게 되었다.
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했다.
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts')(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActions(GET_POST, 'post')(state, action);
    default:
      return state;
  }
}
```

아래 코드는

```jsx
case GET_POSTS:
case GET_POSTS_SUCCESS:
case GET_POSTS_ERROR:
  return handleAsyncActions(GET_POSTS, 'posts')(state, action);
```

이렇게 표현할 수도 있다.

```jsx
case GET_POSTS:
case GET_POSTS_SUCCESS:
case GET_POSTS_ERROR:
  const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
  return postsReducer(state, action);
```

마음에 드는 방식으로 작성하면 된다.

리팩토링이 끝났으면 이 모듈을 루트 리듀서에 등록하면 된다.

### modules/index.js

```jsx
import { combineReducers } from 'redux';
import counter from './counter';
import posts from './posts';

const rootReducer = combineReducers({ counter, posts });

export default rootReducer;
```

## 포스트 목록 구현하기

포스트 목록을 보여줄 프리젠테이셔널 컴포넌트를 만들어보자.

### components/PostList.js

```jsx
import React from 'react';

function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default PostList;
```

이제 PostList를 위한 컨테이너 컴포넌트인 PostListContainer를 만들어보자.

### containers/PostListContainer.js

```jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts';

function PostListContainer() {
  const { data, loading, error } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  // 컴포넌트 마운트 후 포스트 목록 요청
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return <PostList posts={data} />;
}

export default PostListContainer;
```

이제 이 컴포넌트를 App에서 렌더링을 해보자

### App.js

```jsx
import React from 'react';
import PostListContainer from './containers/PostListContainer';

function App() {
  return <PostListContainer />;
}

export default App;
```

## 리액트 라우터 적용하기

리액트 라우터를 프로젝트에 적용해서 특정 포스터를 읽는 기능을 구현해보자

리액트 라우터를 설치한다.

```bash
$ yarn add react-router-dom
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
import { BrowserRouter } from 'react-router-dom';

const store = createStore(
  rootReducer,
  // logger 를 사용하는 경우, logger가 가장 마지막에 와야한다.
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
); // 여러개의 미들웨어를 적용 할 수 있다.

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

### 포스트 조회하기

포스트 하나를 조회하는 기능을 구현해보자. 우선 프리젠테이셔널 컴포넌트 Post.js를 만들어주자.

### components/Post.js

```jsx
import React from 'react';

function Post({ post }) {
  const { title, body } = post;
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
}

export default Post;
```

이제 PostContainer 컴포넌트도 만들어준다.

### containers/PostContainer.js

```jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../modules/posts';
import Post from '../components/Post';

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <Post post={data} />;
}

export default PostContainer;
```

이 컴포넌트는 postId값을 props로 받아온다. 해당 값은 라우트의 URL 파라미터에서 읽어온다.
