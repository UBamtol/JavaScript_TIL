# Narrowing 방법들

보편적으로 Narrowing은 typeof 연산자로 하지만 이것으로 부족할 때가 있다.

또한 null & undefined 타입체크를 하는 경우가 많다.

```tsx
function test(a: string | undefined) {
  if (typeof a === 'string') {
  }
}
```

보편적으로 이렇게 작성을 하지만 하나로 줄이고 싶을 때 아래와 같다.

1. **&& 연산자로 null & undefined 타입체크하기**

```tsx
function test(a: string | undefined) {
  if (a && typeof a === 'string') {
  }
}
```

a가 undefined면 if문 실행이 안되고 string이면 if문이 실행된다.
**2. in 키워드로 object narrowing이 가능하다. → 속성명 in 오브젝트자료**

```tsx
type Fish = { swi: string };
type Bird = { fly: string };

function test(animal: Fish | Bird) {
	if(typeof animal === ???) { // 이렇게 하기 애매하다.

	}
}
```

typeof연산자는 number, string, boolean, object 이런식으로 판정 가능하다. 이런 경우는 in 키워드로 가능하다.

```tsx
type Fish = { swim: string };
type Bird = { fly: string };

function test(animal: Fish | Bird) {
  if ('swim' in animal) {
    // Fish 타입인지 검사 가능
  }
}
```

1. **instanceof 연산자로 obejct narrowing 가능**

```tsx
let date = new Date();
if (date instanceof Date) {
}
```

가끔 사용할 때가 있다.

1. **object타입마다 literal type을 만든다.**

```tsx
type Car = {
  wheel: '4개';
  color: string;
};
type Bike = {
  wheel: '2개';
  color: string;
};
function test(x: Car | Bike) {
  if (x === Car) {
  }
}
```

위와 같이 object타입이 둘다 비슷한데 narrowing을 어떻게 할까

- 속성명 in 오브젝트자료(불가능)
- 오브젝트 insatanceof 부모class(불가능)
- 비슷한 object타입일 경우 literal type을 강제로 만들어두면 좋다.

```tsx
type Car = {
  wheel: '4개';
  color: string;
};
type Bike = {
  wheel: '2개';
  color: string;
};
function test(x: Car | Bike) {
  if (x.wheel === '4개') {
  }
}
```

### 요약

논지럭으로 이 타입인지 특정지을 수 있으면 narrowingd으로 인정해준다.
