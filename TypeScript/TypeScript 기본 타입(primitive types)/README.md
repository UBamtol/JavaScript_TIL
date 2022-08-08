# TypeScript 기본 타입(primitive types)

## 변수 만들 때 타입 정하기

- 타입스크립트는 변수 만들 때 변수의 타입을 지정 가능하다.
  ```tsx
  let name: string = 'Yu';
  ```
  변수명: 타입 이렇게 정하면 된다.

## 자주 쓰는 primitive type

- string, number, boolean

  ```tsx
  let name: string = 'Yu';
  let age: number = '25';
  let marriage: boolean = false;

  // 템플릿 리터럴을 이용하여 여러줄에 걸쳐 작성할 수 있고, 표현식을 포함시킬 수도 있다.
  let introduce: string = `Hello, my name is ${name}.
  I'll be ${age + 1} years old`;
  // 아래와 동일
  let introduce: string =
    'Hello, my name is' +
    name +
    '.\n\n' +
    "I'll be " +
    (age + 1) +
    ' years old';
  ```

- null, undefined도 있지만 굳이 사용하지는 않는다.

## array or object 자료 안에도 타입 지정 가능

- array 자료형 안에 들어갈 타입은 **타입명[]** 이렇게 지정한다.
  ```tsx
  let members: string[] = ['Yu', 'Kim'];
  // 제네릭 타입, React 컴포넌트와 형식이 비슷하여 잘 사용하지 않음
  let members<string> = ['Yu', 'Kim'];
  ```
  ### 튜플
  - 요소의 타입과 개수가 고정된 배열을 표현할 수 있다. 단, 요소들의 타입이 모두 같을 필요는 없다.
  ```tsx
  // 튜플 타입으로 선언
  let x: [string, number];
  // 초기화
  x = ['hello', 10]; // 성공
  // 잘못된 초기화
  x = [10, 'hello']; // 오류, 선언 순서와 맞춰야한다.
  ```
- object 자료형 안에 들어갈 타입은 object와 같은 형식으로 지정하면 된다.
  ```tsx
  let myInfo: { age: number } = { age: 20 };
  ```
  변수명 오른쪽에 오는 것들은 전부 타입지정 문법이다.

## 에러

```tsx
let name: string = 'Yu';
name = 25;
```

타입을 잘 지정해주면 타입이 맞지 않을 때 다음과 같은 경고성 에러가 난다.

→ Type 'number' is not assignable to type 'string'.(2322)

이 에러는 ts에서만 나고 실제 변환된 .js 파일에서는 에러가 안 난다.

### 팁

처음 ts를 배우면 모든 변수에 타입지정을 하려고 하지만 굳이 그럴 필요가 없다.

왜냐하면 변수 생성시 **타입스크립트가 타입을 자동으로 부여해주기 때문이다.**

```tsx
let name = 'Yu';
let age = 20;
```

이렇게 써도 자동으로 name 변수는 string, age 변수는 number를 가지고 있다.

(변수명에 마우스를 올려보면 확인이 가능하다.)

array나 object 만들 때도 자동으로 알아서 되기 때문에 굳이 복잡하게 타입을 명시할 필요가 없다.

## 타입을 미리 정하기 애매할 때

- union, any, unknown

### union

```tsx
// string이 들어올 수도 number가 들어올 수도 있다. or과 같은 의미
let name: string | number = 'kim';
let age: string | number = 100; // 괄호를 쳐도 된다.
```

이런 경우 **할당하는 순간 타입이 string, number 중 하나로 변한다.**

```tsx
var array: (number | string)[] = [1, '2', 3];
var object: { data: number | string } = { data: '123' };
```

변수에 정의된 union 타입은 할당과 동시에 or의 기능이 사라지지만

array, object에 정의된 union 타입은 or의 기능이 유지된다.

### any

어떠한 자료나 들어갈 수 있는 타입(쉽게 생각해서 타입 지정을 해제하는 것)

```tsx
let name: any = 'Yu';
name = 123;
name = undefined;
name = [];
```

타입을 바꿔도 에러가 나지 않는다. 하지만 타입 관련 버그가 생길 경우 왜 버그가 났는지 추적하기가 어렵다. 또한, 타입 지정을 하지 않으면 타입스크립트를 쓸 이유가 없다. 그래서 비상시 쓰는 **변수 타입체크 해제기능 용도**로 사용한다.

### unknown

any와 똑같이 모든 타입을 집어넣을 수 있다.

```tsx
let name: unknown;
let name1: string = name;
let name2: boolean = name;
let name3: number = name;
```

unknown 타입을 다른 곳에 집어넣으려고 하면 해당 부분에서 에러가 난다.(any는 에러가 나지 않는다.)

```tsx
let name: unknown;
name[0];
name - 1;
name.data;
```

이것 또한 마찬가지로 에러가 난다.(any는 에러가 나지 않는다.)

타입스크립트는 정확하고 확실한 걸 좋아한다. 그렇기 때문에 확실하지 않은 타입에 계산을 하는 것을 싫어한다.

타입스크립트에선 사칙연산은 number류의 타입만 할 수 있고, .data같은 건 object류의 타입만 할 수 있다고 미리 정의되어 있다.

그래서 아직 어떤 데이터가 들어갈지 모르겠는데 안정성을 도모하고 싶다면 unknown 타입을 쓰는 것이 좋다. 하지만 코드를 짜다가 any, unknown을 부여할 경우는 별로 없다.

unknow 타입인 변수를 조작하려면 조작할 변수의 타입이 무엇인지 확실하게 체크하는 narrowing 또는 assertion 스킬을 사용해야한다.
