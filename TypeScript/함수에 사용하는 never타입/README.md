# 함수에 사용하는 never타입

## function return 값에 붙일 수 있는 never type

```tsx
function test(): never {}
```

### 조건

1. return 값이 없어야 한다.
2. 함수가 끝나지 않아야 한다. → endpoint가 없어야 한다.

   return문이 없어도 return undefined가 자동으로 붙는다.

   1. error를 낸다.

      ```tsx
      function test(): never {
      	thorw new Error(); // 이렇게 하면 코드실행이 중단이 되지만 끝나지 않는다.
      }
      ```

   2. while을 사용한다.

      ```tsx
      function test(): never {
        while (true) {
          // 내부 코드를 무한반복한다.
        }
      }
      ```

### 실사용 방법

사실 대부분 쓸데가 없다. 이유는 void타입으로 대체가 가능하기 때문이다.

그럼에도 never 타입을 알아야 하는 이유는 코딩을 하다보면 가끔씩 never타입이 나오기 때문이다. 그런 경우를 살펴보자.

### never타입이 등장하는 경우

1. narrowing이 뭔가 이상할 때

   ```tsx
   function test(parameter: string): never {
     if (typeof parameter === 'string') {
       console.log(parameter);
     } else {
       console.log(parameter); // never 타입이 된다.
     }
   }
   ```

   이런 경우는 narrowing이 굳이 필요가 없지만 else까지 사용되고 있다. 이런 경우 never 타입이 된다. 여기서 나오는 never는 “있을 수 없다”라는 의미이다.

2. 어떤 함수 표현식은 return 타입이 자동으로 never가 된다.

   ```tsx
   let test = function () {
     throw new Error();
   };
   ```

   이런 경우도 자동으로 never가 된다.

never타입을 사용할 일은 거의 없고 나왔을 때 이해를 할 수 있으면 된다.
