# Narrowing & Assertion

```tsx
function test(x: number | string) {
  return x + 1; // 에러
}
// Operator '+' cannot be applied to types 'string | number' and 'number'
```

에러나 가는 이유는 union type에는 일반적으로 조작을 할 수 없게 막아놨기 때문이다. 이런 경우 두가지 방법이 있다.

1. 타입을 하나로 Narrowing해준다.
2. Assert해준다.

## Type Narrowing

if문 등으로 타입을 하나로 정해주는 것을 뜻한다.

```tsx
function test(x: number | string) {
  if (typeof x === 'number') {
    return x + 1;
  } else if (typeof x === 'string') {
    return x + 1;
  } else {
    return 0;
  }
}
```

if문과 typeof 키워드로 현재 파라미터 타입을 검사하면 정상적으로 사용이 가능하다. 그리고 if문을 쓸 때 마지막에 else { }가 없다면 에러가 난다.

return 하지 않는 조건문이 있다면 나중에 버그가 생길 수 있어서 에러를 내준다.

이것이 성가시면 tsconfig.js 파일에 “nolmplicitReturns”:false,를 추가해주면 된다.

- 꼭 typeof를 쓰지 않아도 되고 타입을 하나로 확정할 수만 있다면 어떤 것이라도 Narrowing 역할을 할 수 있다.
- ex) in, instanceof 키워드

## Type Assertion

“이 변수의 타입을 ~~로 해라” 라는 뜻으로 타입스크립트 컴파일러가 무시해준다.

**변수명 as 타입** 형식으로 작성하면 된다.

```tsx
function test(x: number | string) {
  return (x as number) + 1;
}
test(123);
```

하지만 이 방법은 함수에 무조건 특정 타입이 들어온다는 사실을 알아야 안전하게 사용할 수 있다.

as 키워드 사용시 특징

1. as 키워드는 union type같은 복잡한 타입을 하나의 정확한 타입으로 줄이는 역할을 수행한다.(number 타입을 as string 으로 바꾸는 것은 에러가 난다.)
2. 실제 코드 실행결과는 as 키워드가 있던 없던 거의 동일하다.

위에 코드를 실행하면 124가 될 거 같지만 실제로는 ‘1231’이 출력된다.

as는 그냥 이 변수는 타입이 이거다! 라는 것을 말하는 거지 실제로 타입을 변경해주는 것은 아니다.

사용하기에는 as가 더 편하지만 정확히 코드를 짜려면 Narrowing을 쓰는 것이 좋다. as키워드는 엄격한 타입체크 기능을 잠깐 안 쓰겠다는 뜻과 동일하다.

**as문법을 사용하기 좋은 상황**

1. 왜 타입에러가 나는지 정말 모르겠는 상황에 임시로 에러 해결용으로 사용
2. 내가 어떤 타입이 들어올지 정말 확실하게 알고 있는데 컴파일러 에러가 나는 경우
