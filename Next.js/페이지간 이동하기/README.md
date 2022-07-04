# 페이지간 이동하기

## Next.js에서의 페이지

Next.js에서의 페이지는, pages 디렉토리 안에 있는 파일에서 export한 react 컴포넌트이다.

각 페이지들은 기본적으로 그들의 파일명과 연관된다. 예를 들어 pages/index.js는 / 라우트이다. pages/posts/first-post.js는 /posts/first-post와 연결된다.

컴포넌트명은 아무거나 상관 없지만 export할 때 default를 붙여주어야 한다.

해당 페이지에 들어가고 싶으면 [localhost:3000/해당페이지컴포넌트명을](http://localhost:3000/해당페이지컴포넌트명을) 입력하면 된다. ex) localhost:3000/mypage

이런 식으로 간단하게 pages 디렉토리 안에 URL경로가 될 파일을 생성해주기만 하면 된다.

새로운 페이지로의 링크를 추가하고 이동하는 법은 무엇일까?

## Link컴포넌트

웹사이트에서 페이지를 연결하고 이동할 때는 \<a> 태그를 사용한다.

Next.js에서는 Link컴포넌트가 \<a> 태그를 래핑하여 사용한다. next/link의 \<Link> 컴포넌트는 애플리케이션에서 페이지 간에 클라이언트 사이드 네비게이션이 가능하게 해준다. 사용법은 다음과 같다.

먼저, pages/index.js를 열고 next/link에서 Link컴포넌트를 import해준다.

```jsx
import Link from 'next/link';
```

그 다음 예를 들어 홈페이지에서 다음과 같은 링크를 작성하면 된다.

```jsx
import Link from 'next/link';

function Home() {
  return (
    <ul>
      <li>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href='/about'>
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href='/blog/hello-world'>
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  );
}

export default Home;
```

위의 경우에는 “Home”을 누르면 메인페이지로 이동하고 About Us를 누르면 /about 링크로 이동하게 된다.

코드에서 보이는대로 Link 컴포넌트는 \<a> 태그와 사용법이 비슷하다. \<a href=’~~’> 대신 \<Link href=’~~’>로 사용하고, Link 컴포넌트 안에 \<a> 태그를 넣어주는 것이 다르다.

### Link는 다음과 같은 props를 허용한다.

- href - 이동할 경로 혹은 URL, 유일한 필수 prop. (필수이기 때문에 href를 안 적으면 에러가 난다.)
- as - 브라우저 URL 표시 줄에 표시 될 경로에 대한 선택적 데코레이터
- passHref - href 프로퍼티를 Link 자식에게 강제로 전달하게 한다. 기본값은 false이다.
- prefetch - 백그라운드에서 페이지를 미리 가져온다. 기본값은 true. \<Link /> 뷰 포트에 있는 모든 항목이 미리 로드된다. prefetch={false}를 통해 프리페치를 비활성할 수 있다.
- replace - history 스택(방문 기록)에 새 url을 추가하는 대신 현재 상태를 변경한다. 기본값은 false
- scroll - 페이지 전환 후 페이지 상단으로 스크롤할지 여부. 기본값은 true
- shallow - getStaticProps, getServerSideProps, getInitialProps을 다시 실행하지 않고 현재 경로를 업데이트, 기본값은 false

### 주의할 점

- Next.js 앱 외부의 페이지로 링크를 걸 때는, Link없이 a태그만을 사용한다.
- className과 같은 속성을 추가할 때는 Link태그에 추가하지 않고 a태그에 추가해야한다.

## Client-Side Navigation

Link컴포넌트는 Next.js 앱에서 두 페이지 간 클라이언트 사이드 네비게이션을 가능하게 해준다.

클라이언트 사이드 네비게이션이 의미하는 것은 기존의 브라우저가 사용하는 기본 네비게이션 기능보다 빠른 자바스크립트를 사용하는 페이지를 변경하는 것을 말한다.

이것을 확인하는 법

- 개발자 도구를 열고 html의 background 속성을 hotpink로 바꾼다.
- 두 페이지에서 만든 링크를 클릭해본다.
- hotpink로 설정한 배경 색상이 페이지가 이동해도 지속되는 것을 볼 수 있다.

이것은 브라우저가 전체 페이지를 로딩하지 않고 클라이언트 사이드 네비게이션이 동작한다는 말이다.

만약 Link 컴포넌트를 사용하지 않고 기존의 방식대로 a태그를 사용했다면 페이지를 이동할 때 브라우저가 전체를 새로고침하기 때문에 배경화면이 흰색으로 초기화 될 것이다.

## Code splitting and prefetching

Next.js는 자동으로 코드 스플릿팅을 해준다. 따라서 각 페이지는 정말 필요한 자원들만 로드하게 된다. 이것은 홈페이지가 렌더링 될 때, 다른 페이지의 코드들은 로드되지 않는 것을 말한다.

이러한 특징은 만일 페이지가 수백개가 있다고 해도 홈페이지의 빠른 로딩 속도를 보장한다.

내가 요청한 페이지의 코드만 로딩이 된다는 것은 각 페이지가 독립적이라는 말도 된다. 만약 한 페이지가 에러가 발생했다고 해도, 애플리케이션의 다른 페이지들은 계속 동작할 수 있다.

게다가 Next.js는 자동으로 백그라운드에서 링크된 페이지의 코드를 프리페치하기 때문에 Link컴포넌트를 사용할 때마다 브라우저 viewport에 나타나게 된다. 링크를 클릭하면 링크된 페이지에 대한 코드가 이미 백그라운드에 로드되어 페이지 전환이 거의 바로 이루어지게 되는 것이다.

### 요약

Next.js는 코드 스플릿팅, 클라이언트 사이드 네비게이션, 프리페칭을 통해 우리의 애플리케이션을 최적화해준다.

pages폴더 안에 파일을 만드는 것으로 라우트 시스템을 편하게 구현할 수 있고, Link컴포넌트를 사용하여 간단하게 페이지를 전환할 수 있다.
