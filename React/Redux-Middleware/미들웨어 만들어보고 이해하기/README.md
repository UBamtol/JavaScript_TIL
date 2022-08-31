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

첫번째 `store`는 리덕스 스토어 인스턴스다. 이 안에 `dispatch`, `getState`, `subscribe` 내장함수들이 들어있다.

두번째 `next`는 액션을 다음 미들웨어에게 전달하는 함수다. `next(action)` 이런 형태로 사용한다. 만약 다음 미들웨어가 없다면 리듀서에게 액션을 전달해준다. 만약에 next를 호출하지 않게 된다면 액션이 무시처리되어 리듀서에게 전달되지 않는다.

세번째 `action`은 현재 처리하고 있는 액션 객체이다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/039cd34c-82c9-4d75-be39-295229f76fc9/Untitled.png)

미들웨어는 위와 같은 구조로 작동한다. 리덕스 스토어에는 여러 개의 미들웨어를 등록할 수 있다. 새로운 액션이 디스패치되면 첫번째로 등록한 미들웨어가 호출된다. 만약에 미들웨어에서 next(action)을 호출하게 되면 다음 미들웨어로 액션이 넘어간다. 그리고 만약 미들웨어에서 store.dispatch를 사용하면 다른 액션을 추가적으로 발생시킬 수도 있다.
