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
  ```
- null, undefined도 있지만 굳이 사용하지는 않는다.

## array or object 자료 안에도 타입 지정 가능

```tsx
let members: string[] = ['Yu', 'Kim'];
```

array 자료형 안에 들어갈 타입은 **타입명[]** 이렇게 지정한다.
