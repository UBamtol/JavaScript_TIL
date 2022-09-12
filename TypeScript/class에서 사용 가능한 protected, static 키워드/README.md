# class에서 사용 가능한 protected, static 키워드

class는 복사할 수 있다. extends 문법 쓰는 다른 class 만들 때 기존 class에 있던 걸 전부 복사 붙여넣기 가능하다.

```tsx
class NewUser extends User {}
```

이러면 새로운 NewUser class 만들 때 User에 있던 거를 복사 붙여넣기를 해준다.

기존 class와 비슷한 class를 많이 만들어야할 때 사용한다.

### class안에서 쓰는 protected 키워드

private랑 비슷하지만 보안을 해제하고 싶을 때 사용한다.

protected를 달아놓으면 private랑 똑같은데 extends된 class 안에서도 사용 가능하게 약간 보안을 풀어준다.

ex)

```tsx
class User {
  protected x = 10;
}
```

User라는 class의 x 속성은 protected이다. 그럼 private와 동일하게 class 안에서만 사용이 가능해지며 User의 자식들도 함부로 사용이 불가능하다.

```tsx
class User {
  protected x = 10;
}

class NewUser extends User {
  doThis() {
    this.x = 20;
  }
}
```

User를 extends하는 NewUser class를 만들었다.

NewUser가 갑자기 this.x 이러식으로 x를 가져다 쓰려고 하면 x가 private 속성일 경우엔 에러가 나지만 x가 protected 속성일 경우엔 에러가 나지 않는다.

그래서 class를 여러개 만들 때 class끼리 공유할 수 있는 속성을 만들고 싶으면 protected, class 하나 안에서만 쓸 수 있는 속성을 만들고 싶으면 private를 사용하면 된다.

### class 안에서 쓰는 static 키워드

class { } 안에 집어넣는 변수, 함수 이런 건 전부 class로부터 새로 생성되는 object (일명 instance)에 부여된다. 근데 class에 직접 변수나 함수를 부여하고 싶으면 static 키워드를 왼쪽에 붙여주면 된다.

ex)

```tsx
class User {
  x = 10;
  y = 20;
}

let john = new User();
john.x; //가능
User.x; //불가능
```

이런 x와 y같은 변수들은 User로부터 생선된 object들만 사용 가능하다.

근데 static 키워드를 붙이면

```tsx
class User {
  static x = 10;
  y = 20;
}

let john = new User();
john.x; //불가능
User.x; //가능
```

반대로 john은 사용불가능이고 Usersms 직접 사용 가능하다.

- 함수도 static 붙이기 가능
- extends로 class를 복사할 경우 static 붙은 것들도 따라온다.
