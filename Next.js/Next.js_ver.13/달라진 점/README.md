# 달라진 점

> [Next.js 공식문서](https://nextjs.org/)를 참고하여 작성함

- [app Directory (beta)](#chapter-1)
  - [Layouts](#chapter-2)
  - [React Server Components](#chapter-3)
  - [Streaming](#chapter-4)
- [Turbopack (alpha)](#chapter-5) : 최대 700배 빠른 Rust 기반 Webpack 대체
- [새로워진 `next/image`](#chapter-6) : 더 빨라진 레이지 로딩
- [새로워진 `@next/font` (beta)](#chapter-7) : 구글 폰트 내장
- [향상된 `next/link`](#chapter-8) : 자동 <a>를 통해 단순해준 API

Next.js 13 업데이트

```bash
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

## New app Directory (beta) <a id="chapter-1" ></a>

![https://nextjs.org/_next/image?url=%2Fstatic%2Fblog%2Flayouts-rfc%2Fapp-folder.png&w=3840&q=75](https://nextjs.org/_next/image?url=%2Fstatic%2Fblog%2Flayouts-rfc%2Fapp-folder.png&w=3840&q=75)

기존 Next.js는 페이지 개념을 기반으로 구축된 파일 시스템 기반 라우터가 있었다.

파일이 pages 디렉토리에 추가되면 자동으로 경로를 사용할 수 있었다.

ex)

```tsx
pages/index.js → /
pages/blog/index.js → /blog

pages/blog/first-post.js → /blog/first-post
pages/dashboard/settings/username.js → /dashboard/settings/username
```

위와 같이 pages 디렉토리 안에 파일을 생성하면 별도의 라우터 없이도 애플리케이션 내부에서 즉시 경로를 생성할 수 있었다. 하지만 Next.js 13에서부터는 `app/` 이라는 새로운 디렉토리에 작성하는 형식으로 바뀌어 라우팅 및 레이아웃 기능이 개선되었다.

## Layouts <a id="chapter-2" ></a>

app/ 디렉토리는 리렌더링을 방지하고 고급 라우팅 패턴을 가능하게 한다. 또한 여러 페이지에서 공통으로 사용되는 헤더, 네이게이션바와 같은 UI를 공유하여 리렌더링을 방지할 수 있다.

app/ 내부에 ‘page.js’라는 단일 파일이 필요하다.

```jsx
// app/page.js
// 이 파일은 인덱스 경로에 맵핑된다. (/)
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}
```

그 다음 파일 시스템을 통해 레이아웃을 정의할 수 있다. 레이아웃은 여러 페이지 간에 UI를 공유한다. 레이아웃은 상태를 유지하고 인터랙티브한 상태를 유지하며 리렌더링하지 않는다.

```jsx
// app/blog/layout.js
export default function BlogLayout({ children }) {
  return <section>{children}</section>;
}
```

### 서버 구성요소 <a id="chapter-3" ></a>

**서버 구성요소를 사용하여 클라이언트에 전송되는 JavaScript의 양을 줄이면서** 복잡한 인터페이스를 구축할 수 있는 기반을 마련하여 초기 페이지 로드를 더 빠르게 수행할 수 있다.

경로가 로드되면 캐싱이 가능하고 크기를 예측할 수 있는 Next.js 및 React 런타임이 로드된다. 이 런타임은 응용프로그램이 커지더라도 크기가 증가하지 않는다. 또한 런타임은 비동기적으로 로드되어 서버에서 HTML을 클라이언트에서 점진적으로 향상시킬 수 있다.

### 스트리밍 <a id="chapter-4" ></a>

app/ 디렉토리에 loading.js 파일을 만들어서 렌더링이 되기 전에 로딩 중인 화면을 표시하는 기능이다.

[자세한 내용은 여기에서 참고](https://beta.nextjs.org/docs/routing/loading-ui)

### TurboPack <a id="chapter-5" ></a>

- webpack보다 700배 빠른 업데이트
- Vite보다 10배 빠른 업데이트
- Webpack보다 4배 빠른 콜드 스타드

```jsx
next dev -turbo
```

### next/image <a id="chapter-6" ></a>

몇가지 달라진 점이 있지만 내가 봤을 때 가장 많이 달라진 것은 이전 버전에서는 이미지의 width와 height를 무조건적으로 설정을 해줘야 했다. 그 이유는 [CLS](https://nextjs.org/learn/seo/web-performance/cls)를 방지하기 위함이었다. 하지만 Next.js 13에서는 가져온 파일 기반으로 이미지의 넓이와 높이를 자동으로 설정을 해주어 CLS를 방지해준다.

### next/font <a id="chapter-7" ></a>

- 글꼴을 자동으로 최적화
- 개인 정보 보호 및 성능 향상을 위해 외부 네트워크 요청 제거
- 모든 글꼴 파일에 대한 자동 자체 호스팅
- CSS `size-adjust`속성을 사용하여 자동으로 레이아웃 이동을 없앰

### next/link <a id="chapter-8" ></a>

이제 더 이상 `next/link`에 수동으로 <a> 태그를 자식으로 추가할 필요가 없다.

```jsx
import Link from 'next/link'

// Next.js 12
<Link href="/about">
  <a>About</a>
</Link>

// Next.js 13
<Link href="/about">
  About
</Link>
```
