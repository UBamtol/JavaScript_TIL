# type alias & readonly

## Type Aliases

```tsx
let animals: string | number | undefined;
```

코드를 짜다보면 위와 같이 타입을 길게 나열하는 경우가 있다.

이럴 때는 변수에 담아서 사용하면 되는데 **type** 키워드를 사용하면 된다.

이것을 type alias라고 한다.

```tsx
type Animals = string | number | undefined;
let animals: Animals;
```

**type 타입변수명 = 타입종류**

타입을 변수처럼 만들어서 쓰는 alias문법이다. 관습적으로 대문자로 시작한다.

일반 자바스크립트 변수랑 차별을 두기 위해서 뒤에 Type을 붙이는 것도 좋다.

ex) AnimalsType

### object type alias

```tsx
type Human = {
  name: string;
  age: number;
};
let student: Human = {
  name: 'Yu',
  age: 25,
};
```

만약 타입 키워드를 안 쓴다면 아래와 같이 만들어야 한다.

```tsx
let student: {
  name: string;
  age: number;
} = { name: 'Yu', age: 25 };
```

## readonly

```tsx
const region = 'seoul';
region = 'busan'; // const라서 에러가 난다.
```

변하지 않는 변수를 만들고 싶을 때는 const를 사용하면 된다.

```tsx
const region = {
  name: 'seoul',
};
region.name = 'busan'; // const지만 에러가 나지 않음
```

하지만 object 자료는 const로 선언을 해도 내부는 변경이 가능하다.

const는 재할당은 막아주지만 그 안에 있는 object속성을 바꾸는 것까지는 관여하지 않기 때문이다.

object속성을 바뀌지 않게 막고 싶을 땐 readonly 문법을 사용하면 된다.

readonly 키워드는 속성 왼쪽에 붙일 수 있으며 특정 속성을 변경 불가능하게 잠궈준다.

```tsx
Type Region = {
	readonly name: string,
}
let region: Region = {
	name: 'seoul',
}
region.name = 'busan'; // readonly 때문에 에러 발생
```

## 속성이 선택사항일 경우

```tsx
type Money = {
  color?: string;
  width: number;
};
let money: Money = {
  width: 100,
};
```

Money라는 속성에 color속성이 없어도 에러가 나지 않는다.

## type 여러개 합치기

```tsx
type Name = string;
type Age = number;
type NewOne = Name | Age;
```

or 연산자를 이용해 union type을 만들 수도 있다.

```tsx
type PositionX = { x: number };
type PositionY = { y: number };
type XandY = PositionX & PositionY;
let axis: XandY = { x: 1, y: 2 };
```

object에 지정한 타입의 경우도 합치기 가능하다.

&기호를 쓰면 object안의 두개의 속성을 합쳐준다.

합치기는 extend를 의미한다.

type alias & type alias만 가능한 것이 아니라 type alias & {name: string} 도 가능하다.

### type 키워드는 재정의 불가능

```tsx
type Name = string;
type Name = number;
```

이러면 에러가 난다.

interface키워드를 사용하면 재정의가 가능하지만 일반적으로는 재정의가 불가능하다.
