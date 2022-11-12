# 달라진 점

> [Next.js 공식문서](https://nextjs.org/)를 참고하여 작성함

- [app Directory (beta)](#chapter-1)
  - Layouts
  - React Server Components
  - Streaming
- Turbopack (alpha) : 최대 700배 빠른 Rust 기반 Webpack 대체
- 새로워진 `next/image` : 더 빨라진 레이지 로딩
- 새로워진 `@next/font` (beta) : 구글 폰트 내장
- 향상된 `next/link` : 자동 <a>를 통해 단순해준 API

Next.js 13 업데이트

```bash
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

## New app Directory (beta) <a id="chapter-1" />

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
