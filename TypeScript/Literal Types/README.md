# Literal Types

어떠한 변수에 특정 값만 가질 수 있게 제한하고 싶을 때는 const 변수를 사용하면 된다. 하지만 1 또는 0만 가질 수 있게 제한하고 싶을 때는 literal type을 사용하면 된다. 이 타입은 어떤 변수가 미리 골라놓은 데이터만 가질 수 있게 해준다.

### 사용법

```tsx
let name: 'injun';
let age: 25;
```

이렇게 하면 name이라는 변수는 ‘injun’이라는 글자만 할당할 수 있고 age라는 변수는 25라는 숫자만 할당할 수 있다.

이렇듯 **특정 글자나 숫자만 가질 수 있게 제한을 두는 타입**을 literal type이라고 부른다.

좀 더 엄격한 타입체크라고 생각하면 된다.

```tsx
let direction: 'left' | 'right';
direction = 'left';
```

이렇게 or 연산자를 이용하여 사용할 수도 있다.

함수도 똑같이 사용할 수 있다.

```tsx
function test(a: 'hello'): 1 | 0 | -1 {
  return 1;
}
```

파라미터 타입 선언할 때 글자나 숫자를 집어넣으면 그 값만 파라미터로 넣을 수 있고 return 타입 선언할 때도 글자나 숫자를 집어넣으면 그 값만 return할 수 있다.

const 변수의 업그레이드 버전이라고 보면 된다.

const 변수는 값을 바꿀 수 없는 변수이다.

```tsx
const num = 123;
```

하지만 변하는 중요한 정보를 저장하고 싶을 땐 const가 쓸모가 없다.

```tsx
const name = 'Yu' | 'kim'; // 자바스크립트에는 없는 문법
```

이런 상황에서는 literal type을 사용하면 된다.

## as const

‘Yu’라는 타입만 들어올 수 있는 함수다.

거기에 data.name을 입력하고 싶을 때

```tsx
var data = {
  name: 'Yu',
};

function test(a: 'Yu') {}

test(data.name);
```

이렇게 하면 될 거 같지마 에러가 난다.

이유는 함수는 ‘Yu’ 타입만 입력할 수 있다고 선언을 했고 data.name이라는 데이터는 타입이 string이지 ‘Yu’가 아니기 때문이다.

이런 에러를 해결하고 싶을 때는

1. object 만들 때 타입을 미리 정한다.
2. assertion을 사용한다.(as ‘Yu’ 와 같이 사용)
3. as const를 사용해 애초에 object자료에 붙여서 사용한다.
4.

```tsx
var data = {
  name: 'Yu',
} as const;

function test(a: 'Yu') {}

test(data.name);
```

as const의 효과

1. 타입을 object의 value로 바꿔준다. (타입을 ‘Yu’로 바꿔준다.)
2. object안에 있는 모든 속성을 readlonly로 바꿔준다.( 변경하면 에러가 난다.)

object를 잠구고 싶을 때 as const를 사용하면 된다.
