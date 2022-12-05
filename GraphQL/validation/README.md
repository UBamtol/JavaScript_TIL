# validation

타입 시스템을 사용하면 GraphQL 쿼리가 유효한지 여부를 미리 알 수 있다. 이를 통해 런타임 검사에 의존하지 않고도 유효하지 않은 쿼리가 생성되었을 때 서버와 클라이언트가 효과적으로 개발자에게 알릴 수 있다.

복잡한 중첩 쿼리 형태이다. 이는 중복된 필드를 프래그먼트로 묶은 쿼리이다.
<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205321054-e811e472-2544-48a7-9eb7-33ea0b376723.png">

위의 쿼리는 유효한 쿼리이다. 다음은 잘못된 예이다.

<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205321304-23a027cd-8193-4beb-833d-2730276a000b.png">

위와 같은 쿼리는 무한루프를 돌게 된다. 이와 같이 프래그먼트가 자기자신을 참조할 수 없다.

<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205321407-38079765-0a7b-42b7-ae6d-47a5cfba192a.png">

위와 같이 타입에 존재하지 않는 필드를 쿼리하면 안된다. 필드를 쿼리할 때는 무조건 주어진 타입에 존재하는 필드를 쿼리해야한다.

아래 타입은 `favoriteSpaceship` 필드를 가지고 있지 않으므로 아래 쿼리는 유효하지 않다.

<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205446838-9f1dedfc-be46-4c24-ad41-2794c5ddce0f.png">

필드를 쿼리할 때마다 스칼라나 열거형이 아닌 타입을 반환한다면 필드에서 어떤 데이터를 얻고자 하는지를 명시해야한다. `Hero` 는 `Character`를 반환하기 때문에, `name`과 `appearIn`과 같은 필드를 요청했다. 하지만 이를 생략하면 쿼리가 유효하지 않다.

<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205447001-b4166bda-9bbe-4d1f-a317-7adf97e9709a.png">

마찬가지로 필드가 스칼라인 경우에는 추가적인 필드를 요청하는 것은 의미가 없기 때문에 쿼리가 유효하지 않다.

<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205447046-bf644a0b-063b-4808-bdc5-6053a3752f1a.png">

쿼리는 해당 타입의 필드만 쿼리할 수 있다. `Character`를 반환하는 `hero`를 쿼리할 때 `Character`에 있는 필드만 쿼리할 수 있다. 만약 필드에 없는 타입을 쿼리할 경우 오류가 발생한다.

<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205489097-ee3adfb2-56e6-447e-a293-271576923c26.png">

`Character`가 `Droid`인 경우에만 `primaryFunction`을 가져오고 그 외엔 그 필드를 무시하는 방법이 있어야 한다. 이러한 경우 프래그먼트를 사용하여 이를 해결할 수 있다. `Droid`에 정의된 프래그먼트를 선언하여, 정의된 곳에서만 `pirmaryFunction`을 쿼리한다.

<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205489122-452d6f7f-75a1-4b16-b499-a5d818188854.png">

이 쿼리는 유효하지만, 조금 과하다. 이름이 있는 프래그먼트는 재사용할 때 비로소 가치가 있지만, 여기서는 단 한번만 사용했기 때문이다. 이 경우에는 이름이 있는 프래그먼트를 사용하는 대신 인라인 프래그먼트를 사용할 수 있다. 이는 별도의 프래그먼트를 분리하지 않고 쿼리하는 타입을 표현할 수 있도록 도와준다.

<img width="748" alt="image" src="https://user-images.githubusercontent.com/98325285/205647887-61d38e2c-17a4-422d-b439-36c077571f88.png">
