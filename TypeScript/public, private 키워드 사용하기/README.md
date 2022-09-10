# public, private 키워드 사용하기

타입스크립트를 쓰면 자바스크립트에는 없는 문법 사용이 가능하다.

객체지향 언어에서 제공하는 public, private, static, protected 같은 키워드이다.

## public, private 키워드로 사용제한두기

타입스립트는 class 안에서 public 키워드 사용이 가능하다.

원하는 속성을 왼쪽에 붙이면 그 속성은 아무데서나 수정이 가능하다.

```tsx
class User {
  public name: string;

  constructor() {
    this.name = 'kim';
  }
}

let 유저1 = new User();
유저1.name = 'park'; //가능
```

**public이 붙은 속성은 자식이 object들이 마음대로 사용하고 수정가능하다.**

사실 public이 붙든 안 붙든 똑같다. 왜냐하면 필드값 같은 걸 만들면 public이 자동으로 부여되기 때문이다.

**private 키워드를 붙이면 수정이 불가능하다.**

무조건 class { } 중괄호 안에서만 수정 및 사용이 가능하다.

심지어 class로부터 생산된 자식 object에서도 private붙은 건 사용이 불가능하다.

class 중괄호 내부가 아니기 때문이다.

```tsx
class User {
  public name: string;
  private familyName: string;

  constructor() {
    this.name = 'kim';
    let hello = this.familyName + '안뇽'; //가능
  }
}

let 유저1 = new User();
유저1.name = 'park'; //가능
유저1.familyName = 456; //에러남
```

이렇게 속성을 외부에서 숨기고 싶을 때 private 키워드를 이용한다.

실은 자바스크립트 문법에서도 #을 속성 옆에 붙이면 private속성이 된다.

### private 부여된 속성을 class 밖에서 수정해야할 경우는?

1. private 속성을 수정하는 함수를 class 안에 만든다.
2. 함수를 실행시킨다.

ex)

```tsx
class User {
  public name: string;
  private familyName: string;

  constructor() {
    this.name = 'kim';
    let hello = this.familyName + '안뇽';
  }
  changeSecret() {
    this.familyName = 'park';
  }
}

let 유저1 = new User();
유저1.familyName = 'park'; //에러남
유저1.changeSecret(); //가능
```

### private는 어디서 쓰는가?

외부에서 실수로 수정하지 않도록 지켜주고 싶으면 private를 붙인다.

이걸 쓰면 함수를 만들어서 수정해야하기 때문에 약간의 안전장치를 더해서 개발이 가능하다.
