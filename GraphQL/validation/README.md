# validation

타입 시스템을 사용하면 GraphQL 쿼리가 유효한지 여부를 미리 알 수 있다. 이를 통해 런타임 검사에 의존하지 않고도 유효하지 않은 쿼리가 생성되었을 때 서버와 클라이언트가 효과적으로 개발자에게 알릴 수 있다.

복잡한 중첩 쿼리 형태이다. 이는 중복된 필드를 프래그먼트로 묶은 쿼리이다.
<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205321054-e811e472-2544-48a7-9eb7-33ea0b376723.png">

위의 쿼리는 유효한 쿼리이다. 다음은 잘못된 예이다.

<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205321304-23a027cd-8193-4beb-833d-2730276a000b.png">

위와 같은 쿼리는 무한루프를 돌게 된다. 이와 같이 프래그먼트가 자기자신을 참조할 수 없다.

<img width="867" alt="image" src="https://user-images.githubusercontent.com/98325285/205321407-38079765-0a7b-42b7-ae6d-47a5cfba192a.png">

위와 같이 타입에 존재하지 않는 필드를 쿼리하면 안된다. 필드를 쿼리할 때는 무조건 주어진 타입에 존재하는 필드를 쿼리해야한다.
