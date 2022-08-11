# 함수&methods에 type alias 지정

## 함수 type alias

함수에 들어갈 파라미터와 return값에 타입을 지정할 수 있다고 했다.

함수 타입 또한 Type alias로 저장해서 사용할 수 있다.

예를 들어

1. 숫자 2개를 파라미터로 입력할 수 있다.
2. 숫자를 return하는 함수를 별명을 지어서 사용한다.

라는 조건의 함수타입을 만드려면 어떻게 할까

```tsx
type NumOut = (x: nubmer, y: number) => number;
```

이런식으로 사용하면된다.

이걸 함수로 사용하려면 일반적인 함수선언식으로는 사용 불가능하다. → function 함수이름: NumOut() {}

function 키워드에는 ()의 내부와 오른쪽에만 타입지정이 가능하다. 즉, 파라미터와 리턴값에만 타입지정이 가능하다는 것이다.

그래서 함수에 함수타입을 지정하려면 다음과 같이 함수표현식을 사용한다.

```tsx
type NumOut = (x: nubmer, y: number) => number;
let axis: NumOut = (x, y) => {
  return x + y;
};
```

이렇게 함수명 오른쪽에 함수타입명을 작성하여 사용한다. 함수명: 함수타입명

type alias를 사용하기 귀찮다면 그냥 함수를 만들 때 타입을 지정하면 된다.

## methods type alias

object 자료 안에도 함수를 넣을 수 있다.

```tsx
let info = {
	name: 'Yu',
	age: 25
	plusOne(x) {
		return x + 1;
	},
	changeName: () => {
		console.log('안녕');
	},
}
info.plusOne(1);
info.changeName();
```

위와 같이 plusOne, changeName 함수를 object 자료에 넣었다.

arrow function, 일반함수전부 object안에 넣을 수 있다.

위의 자료에 타입지정을 하려면 어떻게 해야 할까

```tsx
type Member = {
	name: string,
	age: number,
	plusOne: (x: number) => number,
	changeName: () => void,
}

let info: Member = {
	name: 'Yu',
	age: 25
	plusOne(x) {
		return x + 1;
	},
	changeName: () => {
		console.log('안녕');
	},
}
```

이렇게 해주면 된다.
