# Todo List 구현하기

## 프리젠테이셔널 컴포넌트 구현하기

components 디렉터리에 todos.js 파일을 생성한다.

이 파일에는 TodoItem, TodoList, Todos 이렇게 3가지의 컴포넌트를 작성할 것이다. 이렇게 **여러개의 컴포넌트를 만드는 이유는 컴포넌트 리렌더링 성능을 최적화하기 위함**이다. 하지만 여기선 편의상 한 파일에 모두 작성을 할 것이다.

### components/Todos.js

```jsx
import React, { useState } from 'react';

// 컴포넌트 최적화를 위하여 React.memo를 사용한다.
const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  return (
    <li
      style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
    </li>
  );
});

// 컴포넌트 최적화를 위하여 React.memo를 사용한다.
const TodoList = React.memo(function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

function Todos({ todos, onCreate, onToggle }) {
  // 리덕스를 사용한다고 해서 모든 상태를 리덕스에서 관리해야하는 것은 아니다.
  const [text, setText] = useState('');
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    onCreate(text);
    setText(''); // 인풋 초기화
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          placeholder='할 일을 입력하세요.'
          onChange={onChange}
        />
        <button type='submit'>등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
}

export default Todos;
```

## 컨테이너 컴포넌트 만들기

containers 디렉터리에 TodosContainer.js 파일을 생성한다.

```jsx
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todos';

function TodosContainer() {
  // useSelector 에서 꼭 객체를 반환 할 필요는 없다.
  // 한 종류의 값만 조회하고 싶으면 그냥 원하는 값만 바로 반환하면 된다.
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const onCreate = (text) => dispatch(addTodo(text));
  const onToggle = useCallback((id) => dispatch(toggleTodo(id)), [dispatch]); // 최적화를 위해 useCallback 사용

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default TodosContainer;
```

이제 컴포넌트를 App에서 렌더링 해보자.

### App.js

```jsx
import React from 'react';
import TodosContainer from './containers/TodosContainer';

function App() {
  return (
    <div>
      <TodosContainer />
    </div>
  );
}

export default App;
```

이러면 완성이다.
