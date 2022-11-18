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
