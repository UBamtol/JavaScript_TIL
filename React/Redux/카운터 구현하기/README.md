# 카운터 구현하기

## 프레젠테이셔널 컴포넌트 만들기

프레젠테이셔널 컴포넌트란 리덕스 스토어에 직접 접근하지 않고 필요한 값 또는 함수를 props로만 받아와서 사용하는 컴포넌트이다.

src 디렉터리에 component 디렉터리를 만들고 그 안에 Counter.js를 만들었다.

### Counter.js

```jsx
import React from 'react';

function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  const onChange = (e) => {
    // e.target.value 의 타입은 문자열이기 때문에 숫자로 변환해주어야 한다.
    onSetDiff(parseInt(e.target.value, 10));
  };
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type='number' value={diff} min='1' onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;
```

프레젠테이셔널 컴포넌트에선 주로 이렇게 UI를 선언하는 것에 집중하며 필요한 값이나 함수는 props로 받아와서 사용하는 형태로 구현한다.

## 컨테이너 컴포넌트 만들기

컨테이너 컴포넌트란 리덕스 스토어의 상태를 조회하거나 액션을 디스패치 할 수 있는 컴포넌트를 의미한다. 그리고 HTML 태그들을 사용하지 않고 다른 프레젠테이셔널 컴포넌트들을 불러와서 사용한다.

src 디렉터리에 containers 디렉터리를 만들고 CounterContainer.js 파일을 만들었다.

### CounterContainer.js

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook이다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일하다.
  const { number, diff } = useSelector((state) => ({
    number: state.counter.number,
    diff: state.counter.diff,
  }));

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용할 수 있게 해주는 Hook이다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));

  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props로 넣어준다.
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
```

이제 app 컴포넌트에서 불러와서 렌더링을 한다.

```jsx
import React from 'react';
import CounterContainer from './containers/CounterContainer';

function App() {
  return (
    <div>
      <CounterContainer />
    </div>
  );
}

export default App;
```

## 프리젠테이셔널 컴포넌트와 컨테이너 컴포넌트

프리젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 분리해서 작업을 했는데 이러한 패턴을 리덕스 창시자인 Dan Abramov가 소개하면서 이렇게 컴포넌트들을 구분지어서 진행하는 게 당연시 됐었다.

하지만 꼭 이렇게 할 필요는 없다. 편한 방식을 선택하면 된다.

아직까지는 컴포넌트를 분리해서 작성하는 것이 정석이다.
