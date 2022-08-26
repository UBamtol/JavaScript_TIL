# useSelector 최적화

리액트 컴포넌트에서 리덕스 상태를 조회해서 사용할 때 최적화를 하기 위해 어떤 사항을 고려해야 하는가?

### 컨테이너 컴포넌트

Todo List를 만들 때는 프리젠테이셔널 컴포넌트에서 React.memo를 사용해서 리렌더링 최적화를 해주었다. 하지만 컨테이너 컴포넌트에서는 어떻게 해야 할까?

기본적으로 `useSelector`를 사용해서 리덕스 스토어의 상태를 조회할 땐 상태가 바뀌지 않았으면 리렌더링 하지 않았다.

TodoContainer의 경우 카운터 값이 바뀔 때 todos 값엔 변화가 없으니깐 리렌더링이 되지 않는다.

```jsx
const todos = useSelector((state) => state.todos);
```

하지만 CounterContainer는 다르다.

```jsx
const { number, diff } = useSelector(state => ({
	number: state.counter.number,
	diff: state,counter.diff,
});
```

CounterContainer에서는 사실상 `useSelector` Hook을 통해 매번 렌더링 될 때마다 새로운 객체 `{ number, diff }`를 만드는 것이기 때문에 상태가 바뀌었는지 바뀌지 않았는지 확인을 할 수 없어서 낭비가 발생하는 리렌더링이 이루어지고 있는 것이다.

이를 최적화하기 위해선 두가지 방법이 있다.

첫번째는 `useSelector`를 여러번 사용하는 것이다.

```jsx
const number = useSelector((state) => state.counter.number);
const diff = useSelecotr((state) => state.counter.diff);
```

이렇게 하면 해당 값들 하나라도 바뀌었을 때만 컴포넌트가 리렌더링 된다.

두번째는 react-redux의 `shallowEqual` 함수를 useSelector의 두번째 인자로 전달해주는 것이다.

```jsx
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook이다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일하다.
  const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff
    }),
    shallowEqual
  );

  (...)
```

useSelector의 두번째 파라미터는 equalityFn이다.

```jsx
equalityFn ? (left: any, rigth: any) => boolean;
```

이전 값과 다음 값을 비교하여 true가 나오면 리렌더링을 하지 않고 false가 나오면 리렌더링을 한다.

`shallowEqual`은 react-redux에 내장되어 있는 함수로서 객체 안의 가장 겉에 있는 값들을 모두 비교해준다.

여기서 겉에 있는 값이란 다음과 같다.

```jsx
const object = {
  a: {
    x: 3,
    y: 2,
    z: 1,
  },
  b: 1,
  c: [{ id: 1 }],
};
```

위와 같은 객체가 있다면 가장 겉에 있는 값은 object.a, object.b, object.c이다. shallowEqual에서는 해당 값들만 비교하고 object.a.x 또는 obejct.c[0]값은 비교하지 않는다.

이렇게 둘 중 하나의 방식으로 최적화를 해주면 컨테이너 컴포넌트가 필요한 상황에서만 리렌더링이 될 것이다.
