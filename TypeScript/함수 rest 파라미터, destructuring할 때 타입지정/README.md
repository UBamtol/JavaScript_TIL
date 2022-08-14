# 함수 rest 파라미터, destructuring할 때 타입지정

## rest 문법

```tsx
function test(...a) {
  console.log(a);
}
test(1, 2, 3, 4, 5);
```

함수에 파라미터가 몇개가 들어올지 모르는 상황에서 쓰이는 문법이다.

### rest 특징

- 다른 일반 파라미터 뒤에만 올 수 있다.
- rest 파라미터 자리에 집어넣은 값들은 전부 [ ] 안에 담겨 있다. (array 형식이다.)

rest문법에 타입을 지정하는 방법

```tsx
function test(...a: number[]) {
  console.log(a);
}
test(1, 2, 3, 4, 5);
```

rest 파라미터는 array에 담겨져 있기 때문에 타입지정을 할 때 []를 붙여줘야 된다.

### rest vs spread operator

…을 파라미터 자리에 사용하면 rest문법, …을 array나 object 왼쪽에 사용하게 된다면 spread operator문법 → 괄호를 벗기라는 뜻이다.

### destructuring(구조 분해 할당)

```tsx
let [num1, num2] = [1, 2];
let { student: student, age: age } = { student: true, age: 20 };
let { student, age } = { student: true, age: 20 };
```

원래는 2번째 줄과 같이 사용해야 하지만 이름이 똑같다면 생략이 가능하다.

함수 파라미터에도 destructuring이 가능하다.

```tsx
let { student, age } = { student: true, age: 20 };
function test(a, b) {
  console.log(a, b);
}
함수(1, 2);
```

만약 object안에 있던 자료를 파라미터로 집어넣고 싶을 때는 어떻게 해야 할까

```tsx
let object = { student: true, age: 20 };

function test(a, b) {
  console.log(a, b);
}
함수(object.student, object.age);
```

이런 식으로 하면 된다. 하지만 이렇게 하면 너무 번거롭다. 그렇기에 새로운 방법이 나왔다.

```tsx
let object = { student: true, age: 20 };

function test({ student, age }) {
  console.log(student, age);
}
함수(object);
```

여기에 타입지정까지 해주면 다음과 같다.

```tsx
let object = { student: true, age: 20 };

function test({ student, age }: { student: boolean; age: number }) {
  console.log(student, age);
}
함수(object);
```

위와 같이 해주면 되지만 너무 길면 type alias로 작성하는 것도 좋다.
