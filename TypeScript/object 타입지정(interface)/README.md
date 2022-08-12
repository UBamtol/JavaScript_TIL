# object 타입지정(interface)

## object에 타입지정하는 방법

1. type 키워드로 타입변수 생성
2. interface 키워드로 타입변수 생성

```tsx
// 1. type alias
type Boxs = { color: string; width: number };
// 2. interface
interface Boxs {
  color: string;
  width: number;
}

let box: Boxs = { color: 'red', width: 100 };
```

### interface 장점

extends로 복사 가능

```tsx
interface Students {
  name: string;
}
interface Teachers {
  name: string;
  age: number;
}
let student: Students = { name: 'Yu' };
let teacher: Teachers = { name: 'Yu', age: 25 };
```

이 코드를 extends를 사용하게 되면 다음과 같이 변한다.
