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
