# GraphQL이란

<aside>
💡 [GraphQL 공식문서](https://graphql-kr.github.io/), [외부문서](https://tech.kakao.com/2019/08/01/graphql-basic/)를 참고하여 작성함

</aside>

GrahphQL은 페이스북에서 만든 쿼리 언어이다.

GraphQL(gql)은 Structed Query Language(sql)와 같은 쿼리 언어이다. 하지만 둘은 언어적 구조 차이가 있다. 또한 둘은 실전에서 사용되는 방법에 있어서도 차이가 크다.

기본적으로 sql은 **데이터베이스 시스템**에 저장된 데이터를 효율적으로 가져오는 것이 목적이고, gql은 **웹 클라이언트**가 데이터를 서버로부터 효율적으로 가져오는 것이 목적이다. sql은 주로 백엔드 시스템에서 작성, 호출하지만, gql은 주로 클라이언트 시스템에서 작성, 호출한다.

ex)

```sql
-- sql
SELECT lastName, firstName FROM employees;
```

```graphql
# gql
{
  hero {
    name
    friends {
      name
    }
  }
}
```

## RestAPI와의 차이

RestAPI는 URL, METHOD 등을 조합하기 때문에 다양한 end point가 존재한다. 하지만, gql은 단 하나의 end point만이 존재한다. 또한 gql API에서는 불러오는 데이터의 종류를 쿼리 조합을 통해서 결정한다. RestAPI는 각 end point마다 데이터베이스 sql쿼리가 달라지지만, gql API에서는 gql 스키마 타입마다 데이터 베이스 sql쿼리가 달라진다.

![https://tech.kakao.com/files/graphql-stack.png](https://tech.kakao.com/files/graphql-stack.png)

_HTTP와 gql의 기술 스택 비교_

![https://tech.kakao.com/files/graphql-mobile-api.png](https://tech.kakao.com/files/graphql-mobile-api.png)

Rest API와 GraphQL API의 사용

위 그림처럼 gql API를 사용하면 여러번 네트워크 호출할 필요 없이 단 한번의 호출로 처리할 수 있다.

## GraphQL의 구조

### query & mutation

GraphQL에서 특정 필드를 요청하는 것은 매우 간단하다.

![https://tech.kakao.com/files/graphql-example.png](https://tech.kakao.com/files/graphql-example.png)

쿼리와 결과가 거의 동일한 형태이다.

gql에서는 쿼리와 뮤테이션을 나누어서 사용하는데 사실 이 두개는 별 차이가 없다.

쿼리는 데이터를 읽어오는데 사용하고 뮤테이션은 데이터를 입력, 수정, 삭제할 때 사용한다는 규약만이 존재한다.

위에서는 query 키워드와 query 이름을 생략한 단축문을 사용했다. 하지만 실제 애플리케이션에서는 헷갈리지 않게 작업타임, 작업이름을 정해주는 것이 좋다.

<img width="728" alt="image" src="https://user-images.githubusercontent.com/98325285/202834340-f16b76bf-0d80-4b3e-a6d2-6b3c9e1188bd.png">

작업 타입은 쿼리(query), 뮤테이션(mutation), 구독(subscription)이 될 수 있고, 어떤 작업의 타입인지를 기술한다.

작업 이름은 의미있고 명시적으로 지어주는 것이 좋다. 디버깅이나 서버 측에서 로깅하는데 훨씬 유용하기 때문이다. 만약 네트워크 로그나 GraphQL 서버에 문제가 발생했을 경우 내용을 확인하는 대신 코드에서 쿼리의 작업이름을 찾아내는 것이 더욱 쉽다.

## 프래그먼트

예를 들어 친구를 가진 두 영웅을 순서대로 요청한다고 가정해보자. 그러면 필드를 최소 두번 반복해야 하기 때문에 쿼리가 복잡해질 수 있다.

이것이 **프래그먼트**라는 재사용 가능한 단위가 GrahpQL에 포함된 이유이다. 프래그먼트를 사용하면 필드셋을 구성한 다음 필요한 쿼리에 포함시킬 수 있다.

<img width="688" alt="image" src="https://user-images.githubusercontent.com/98325285/202901014-41ffd4fb-16a9-4396-b15c-7d5611d40d84.png">

필드가 반복될 경우 위 쿼리가 꽤 반복될 것을 알 수 있다. 프래크먼트 개념은 복잡한 응용프로그램의 데이터 요구사항을 작은 단위로 분할하는데 사용된다. 특히 청크가 다른 여러 UI구성 요소를 하나의 초기 데이터 fetch로 통합해야 하는 경우에 많이 사용된다.

## 변수

지금까지는 모든 인자를 쿼리 문자열 안에서 작성했다. 하지만 대부분 응용프로그램에서 필드에 대한 인자(parameter)는 동적이다. 예를 들어, 어떤 스타워즈 에피소드에 관심이 있는지를 선택할 수 있는 드롭다운, 검색필드, 필터 등이 있을 수도 있다.

지금까지 해왔던 문자열 안에 인자를 작성하는 방법은 좋은 방법이 아니다. 대신 GraphQL은 동적 값을 쿼리 안에서 없애고, 이를 별도로 전달하는 방법을 제공한다. 이것을 변수라고 한다.

변수를 사용하기 위해서는 다음과 같은 작업을 해야한다.

1. 쿼리 안의 정적 값을 `$variableName`으로 변경한다.
2. `$variableName`을 쿼리에서 받는 변수로 선언한다.
3. 별도의 전송규약(일반적으로는 JSON) 변수에 `variableName: value`를 전달한다.

<img width="730" alt="image" src="https://user-images.githubusercontent.com/98325285/203086163-9300941d-fdc6-43e2-9af4-cf7a83f9ba04.png">

위와 같은 방법을 사용하여 코드에서 새로운 쿼리를 작성하지 않고 간단하게 다른 변수를 전달할 수 있다. 이 방법은 일반적으로 쿼리가 어떤 인자가 동적인지를 나타내는 좋은 방법이다.

## 프래그먼트 안에서 변수 사용하기

쿼리나 뮤테이션에 선언된 변수는 프래그먼트에 접근할 수 있다.

<img width="688" alt="image" src="https://user-images.githubusercontent.com/98325285/202901150-1505688d-6931-4e1e-adba-1991d7c2753c.png">
