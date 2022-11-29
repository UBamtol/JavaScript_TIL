# schema & type

## 타입 시스템

GraphQL 쿼리 언어는 기본적으로 객체의 필드를 선택한다.

<img width="691" alt="image" src="https://user-images.githubusercontent.com/98325285/203810246-1d3ba758-5bd1-4c18-8952-8326a45d573f.png">

1. `root` 객체로 시작한다.
2. `hero` 필드를 선택한다.
3. `hero`에 의해 반환된 객체에 대해 `name`과 `appearIn` 필드를 선택한다.

GraphQL 쿼리의 형태는 요청 결과와 거의 일치하기 때문에 서버에 대해 모르는 상태에서도 쿼리가 반환할 결과를 예측할 수 있다. 하지만 그렇기에 서버에 요청할 수 있는 데이터에 대한 정확한 표현을 가져야 한다. 어떤 필드를 선택할 수 있는지, 어떤 종류의 객체를 반환할 수 있는지, 하위 객체에서 사용할 수 있는 필드는 무엇인지, 이것이 스키마가 필요한 이유이다.

모든 GraphQL 서비스는 해당 서비스에서 쿼리 가능한 데이터들을 완벽하게 설명하는 타입들을 정의하고, 쿼리가 들어오면 해당 스키마에 대해 유효성이 검사된 후 실행된다.

## 타입 언어

GraphQL 서비스는 어떤 언어로든 작성할 수 있다.

## 객체 타입과 필드

GraphQL 스키마의 가장 기본적인 구성 요소는 객체 타입이다. 객체 타입은 서비스에서 가져올 수 있는 객체의 종류와 그 객체의 필드를 나타낸다. GraphQL 스키마 언어에서는 다음과 같이 표현할 수 있다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204010156-bf97af53-ed2a-4601-9881-f0e92317c0d2.png">

- `Character`는 GraphQL 객체 타입이다. 즉, 필드가 있는 타입이라는 뜻이다. 스키마의 대부분의 타입은 객체 타입이다.
- `name`과 `appearIn`은 `Character` 타입의 필드이다. 즉 `name`과 `appearIn`은 GraphQL 쿼리의 `Character` 타입 어디서든 사용할 수 있는 필드이다.
- `String`은 내장된 스칼라 타입 중 하나이다. 이는 스칼라 객체로 해석되는 타입이며 쿼리에서 하위 선택을 할 수 없다.
- `String`!은 필드가 **non-nullable**임을 의미한다. 즉, 이 필드를 쿼리할 때 GraphQL 서비스가 항상 값을 반환해야한다는 것을 의미한다. 타입 언어에서는 이것을 **느낌표(!)**로 나타낸다.
- `[Episode!]!`는 `Episode` 객체의 배열을 나타낸다. 또한 non-nullable이기 때문에 `appearIn` 필드를 쿼리할 때 항상(0개 이상의 아이템을 가진) 배열을 기대할 수 있다.

## 인자

GraphQL 객체 타입의 모든 필드는 0개 이상의 인수를 가질 수 있다.(ex: `length` 필드)

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204094928-3943d29f-c7ed-46f5-b5e9-8c61af3e3b60.png">

모든 인수(grgument)에는 이름이 있다. 함수가 순서있는 인자(parameter)를 가져오는 JavaScript나 Python 같은 언어와 달리 GraphQL의 모든 인자(parameter)는 특별한 이름으로 전달된다. 이 경우, `length` 필드는 하나의 인자(parameter) `unit`을 가진다.

인자는 필수거나 옵셔널일 수 있다. 인자가 옵셔널인 경우 기본값을 정의할 수 있다. `unit` 인자가 전달되지 않으면 기본적으로 `METER`로 설정된다.

## 쿼리 타입 & 뮤테이션 타입

스키마 대부분의 타입은 일반 객체 타입이지만 스키마 내에는 특수한 두가지 타입이 있다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204094954-18b3b504-0395-468b-b5f9-945a49ccbe34.png">

모든 GraphQL 서비스는 `query` 타입을 가지며 `mutation` 타입은 가질 수도 있고 가지지 않을 수도 있다. 이러한 타입은 일반 객체 타입과 동일하지만 모든 GraphQL 쿼리의 진입점(entry point)을 정의하므로 특별하다. 따라서 다음과 같은 쿼리를 볼 수 있다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204094989-4d6c6a11-661d-447b-9f8f-be9a71a4bb74.png">

즉, GraphQL 서비스는 `hero` 및 `droid` 필드가 있는 `**Query**` 타입이 있어야한다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204095005-06f09759-37a7-4d82-b693-7edcff74babc.png">

뮤테이션도 비슷한 방식으로 작동한다. 즉, `Mutation` 타입의 필드를 정의하면 쿼리에서 호출할 수 있는 루트 뮤테이션 필드로 사용할 수 있다.

스키마에 대한 `진입점` 이라는 특수한 점 이외의 쿼리 타입과 뮤테이션 타입은 다른 GraphQL 객체 타입과 동일하며 해당 필드는 정확히 동일한 방식으로 작동한다.

## 스칼라 타입

GraphQL 객체 타입은 이름과 필드를 가지지만, 어떤 시점에서 이 필드는 구체적인 데이터로 해석되어야한다. 이것이 스칼라 타입이 필요한 이유이다. 즉, 쿼리의 끝을 나타낸다.

다음 쿼리에서 `name`과 `appearIn`은 스칼라 타입으로 해석된다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204095021-61d263f8-cb12-4096-818f-ca190db69c34.png">

해당 필드에 하위 필드가 없기 때문에 이를 알 수 있다. 이 필드는 쿼리의 끝부분이다.

GraphQL에서는 스칼라 타입들이 기본적으로 제공된다.

- `Int`: 부호가 있는 32비트 정수
- `Float`: 부호가 있는 부동소수점 값
- `String`: UTF-8 문자열
- `Boolean`: `true` 또는 `false`
- `ID`: ID 스칼라 타입은 객체를 다시 요청하거나 캐시의 키로써 자주 사용되는 고유 식별자를 나타낸다. ID 타입은 String과 같은 방법으로 직렬화되지만, `ID`로 정의하는 것은 사람이 읽을 수 있도록 하는 의도가 아니라는 것을 의미한다.

대부분의 GraphQL 구현에는 커스텀 스칼라 타입을 지정하는 방법이 있다. 예를 들면, Date 타입을정의할 수 있다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204095046-6e06c90d-99ca-4e49-8c19-b37042ddedc8.png">

해당 타입을 직렬화, 역 직렬화, 유효성 검사하는 방법을 구현할 수 있다.

## 열거형 타입

Enums 라고도 하는 열거형 타입은 특정 값들로 제한되는 특별한 종류의 스칼라이다. 이를 통해 다음과 같은 작업을 할 수 있다.

1. 타입의 인자가 허용된 값 중 하나임을 검증한다.
2. 필드가 항상 값의 열거형 집합 중 하나가 될 것임을 타입 시스템을 통해 의사소통한다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204095057-e21b6cd4-6591-40c4-885e-ac532f69ce03.png">

즉, 스키마에서 `Episode` 타입을 사용할 때마다 정확히 `NEWHOPE`, `EMPIRE`, `JEDI` 중 하나일 것이라는 뜻이다.

## 리스트와 Non-Null

객체 타입, 스칼라 타입, 열거형 타입은 GraphQL에서 정의할 수 있는 유일한 타입이다. 하지만 스키마의 다른 부분이나 쿼리 변수 선언에서 타입을 사용하면 해당 값의 유효성 검사를 할 수 있는 타입 수정자(type modifiers)를 적용할 수 있다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204128251-9076ac62-a5da-488b-bc67-f1676445f743.png">

`String` 타입을 사용하고 타입 뒤에 느낌표를 추가하여 Non-Null로 표시한다. 즉, 서버는 항상 이 필드에 대해 null이 아닌 값을 반환할 것을 기대하며, null값이 발생되면 GraphQL 실행 오류가 발생하고, 클라이언트에게 무언가 잘못되었음을 알린다.

Non-Null 타입 수정자는 필드에 대한 인자를 정의할 때에도 사용할 수 있다. 이는 GraphQL 서버가 문자열이나 변수 상관없이 null값이 해당 인자로 전달되는 경우, 유효성 검사 오류를 반환하게 한다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204128594-0c6d4e97-69e4-4699-a80d-e86f9a2873ba.png">

리스트도 비슷한 방식으로 동작한다. 타입 수정자를 사용하여 타입을 `List`로 표시할 수도 있다. 이 필드는 해당 타입의 배열을 반환한다. 스키마 언어에서, 타입을 대괄호 `[]` 로 묶는 것으로 표현된다. 유효성 검사 단계에서 해당 값에 대한 배열이 필요한 인자에 대해서도 동일하게 작동한다.

Non-Null 및 List 수정자를 결합할 수도 있다. 예를 들면, Null이 아닌 문자열 리스트를 가질 수 있다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204128604-70a669fd-69db-48bf-bdd0-0613faebd3b2.png">

즉, List 자체는 null일 수 있지만, null을 가질 수 없다. 예를 들면,

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204128619-2bad1b04-523c-47f0-b348-256418638b11.png">

null이 아닌 문자열 리스트를 정의한다고 가정하면,

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204128629-6e523e8b-5486-4beb-a1f2-14e48eaf9665.png">

목록 자체는 null일 수 없지만 null값을 포함할 수 있다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204128644-c31534d4-19ca-4c47-9150-42d02b922003.png">

필요에 따라 여러개의 Null, List 수정자를 중첩할 수 있다.

## 유니온 타입

유니온 타입은 인터페이스와 매우 유사하지만, 타입 간에 공통 필드를 특정하지 않는다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204247618-2ac05c84-dd23-458a-834d-65900a3c5798.png">

스키마에서 `SearchResult` 타입을 반환할 때마다 `Human`, `Droid`, `Starship`을 얻을 수 있다. 유니온 타입의 멤버는 구체적인 객체 타입이어야 한다. 인터페이스나 유니온 타입에서 다른 유니온 타입을 사용할 수 없다.

이 경우, `SearchResult` 유니언 타입을 반환하는 필드를 쿼리하면, 어떤 필드라도 쿼리할 수 있는 조건부 프래그먼트를 사용해야 한다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204247966-72e5827e-0f70-4b56-b08c-7e978a758df9.png">

## 입력 타입

지금까지는 열거형이나 문자열 같은 스칼라 값을 인자로 필드에 전달하는 방법을 알아봤다. 하지만 복잡한 객체도 쉽게 전달할 수 있다. 이는 뮤테이션에서 특히 유용하다. 뮤테이션은 생성될 전체 객체를 전달하고자 할 수 있다. GraphQL 스키마 언어에서 입력 타입은 일반 객체 타입과 정확히 같지만, `type` 대신 `input`을 사용한다.

<img width="695" alt="image" src="https://user-images.githubusercontent.com/98325285/204248508-1682425f-95a9-4463-b009-cb74ddf16c45.png">

다음은 뮤테이션에서 입력 객체 타입을 사용하는 방법이다.

<img width="982" alt="image" src="https://user-images.githubusercontent.com/98325285/204249769-27ad6ee6-ab3f-40d2-ab22-805bd70e5c46.png">

입력 객체 타입의 입력란은 입력 객체 타입을 참조할 수 있지만, 입력 및 출력 타입을 스키마에 혼합할 수 없다. 또한 필드에 인자를 가질 수 없다.
