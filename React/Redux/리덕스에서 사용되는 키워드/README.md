# 리덕스에서 사용되는 키워드

리덕스에서 사용되는 키워드 중 대부분은 useReducer에서 접해본 개념이다.

## 액션

**상태에 어떠한 변화가 필요하게 될 때** 액션이란 것을 발생시킨다. 이는 하나의 객체로 표현되는데, 액션 객체는 다음과 같은 형식으로 이루어져있다.

```tsx
{
  type: 'STUDY_REDUX';
}
```

**액션 객체는 type 필드는 필수적으로 가지고 있어야하고** 그 외의 값들은 개발자가 임의로 넣어줄 수 있다.

```tsx
{
  type: "STUDY_REDUX",
  data: {
    id: 0,
    text: "리덕스 공부"
  }
}
```

```tsx
{
  type: "SAY_HELLO",
  text: "안녕하세요"
}
```

## 액션 생성함수(Action Creator)

**액션 생성함수는 액션을 만드는 함수**이다. 단순히 파라미터를 받아와서 액션 객체 형태로 만들어준다.

```tsx
export function addTodo(data) {
  return {
    type: 'ADD_TODO',
    data, // data: data로도 작성 가능
  };
}
// 화살표 함수로도 만들 수 있다.
export const changeInput = (text) => ({
  type: 'CHANGE_INPUT',
  text,
});
```

이러한 **액션 생성함수를 만들어 사용하는 이유**는 **나중에 컴포넌트에서 더욱 쉽게 액션을 발생시키기 위함**이다. 그래서 보통 함수 앞에 export 키워드를 붙여서 다른 파일에서 불러와서 사용한다.

리덕스를 사용할 때 액션 생성함수를 사용하는 것은 필수적이진 않다. 액션을 발생 시킬 때마다 직접 액션 객체를 작성해도 된다.

## 리듀서(Reducer)

**리듀서는 변화를 일으키는 함수**이다. 리듀서는 두가지 파라미터를 받아온다.

```tsx
function reducer(state, action) {
  // 상태 업데이트 로직
  return alteredState;
}
```

리듀서는 **현재의 상태와 전달 받은 액션을 참고하여 새로운 상태를 만들어서 반환**한다. 이 리듀서는 useReducer를 사용할 때 작성하는 리듀서와 똑같은 형태를 가지고 있다.

만약 카운터를 위한 리듀서를 작성한다면 다음과 같이 만들 수 있다.

```tsx
function counter(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
}
```

useReducer에선 일반적으로 default: 부분에 throw new Error(’Unhandled Action’)과 같이 에러를 발생시켜 처리하는 게 일반적인 반면 리듀서에서는 기존 state를 그대로 반환하도록 작성해야 한다.

리덕스를 사용할 때에는 여러개의 리듀서를 만들고 이를 합쳐서 루트 리듀서(Root Reducer)를 만들 수 있다. (루트 리듀서 안의 작은 리듀서를 서브 리듀서라 한다.)

## 스토어(Store)

리덕스에서는 한 애플리케이션 당 하나의 스토어를 만들게 된다. 스토어 안에는 현재의 앱 상태와 리듀서가 들어가있고 추가적으로 몇가지 내장 함수들이 있다.

## 디스패치(Dispatch)

디스패치는 스토어의 내장 함수 중 하나다. 디스패치는 **액션을 발생시키는 것**이라고 이해하면 된다. dispatch라는 함수에는 액션을 파라미터로 전달한다. → dispatch(action)

그렇게 호출을 하면 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 참고하여 새로운 상태를 만들어준다.

## 구독(Subscribe)

구독 또한 스토어의 내장 함수 중 하나다. subscribe 함수는 함수의 형태의 값을 파라미터로 받아온다. subscribe 함수에 특정 함수를 전달해주면 액션이 디스패치 되었을 때마다 전달해준 함수가 호출된다.
