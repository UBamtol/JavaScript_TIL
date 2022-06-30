# Next.js란

Next.js를 알아보기에 앞서 React는 무엇일까?

## React란?

리액트는 대화형 사용자 인터페이스를 구축하기 위한 JavaScript라이브러리이다.

사용자 인터페이스는 사용자가 화면에서 보고 상호작용하는 요소를 말한다.

그럼 Next.js는 무엇일까?

## Next.js란?

Next.js는 React 라이브러리의 프레임워크이다.

프레임워크는 Next.js가 React에 필요한 도구 및 구성을 처리하고 애플리케이션에 대한 추가 구조, 기능 및 최적화를 제공하는 것을 의미한다.

![image](https://user-images.githubusercontent.com/98325285/176468385-72f1cabe-993d-4aff-b876-df7f224c793e.png)

React를 사용하여 UI를 구축한 다음 Next.js 기능을 점진적으로 채택하여 라우팅, 데이터 가져오기, 통합과 같은 일빈적인 애플리케이션 요구 사항을 해결하는 동시에 개발자와 최종 사용자 경험을 개선할 수 있다.

## Next.js를 통해 얻는 가장 큰 장점?

SEO(Search Engine Optimization)를 위한 Server Side Rendering(SSR)을 가능하게 하기 때문이다.

기본적으로 React는 Client Side Rendering(CSR)을 한다.

웹사이트를 요청했을 때 빈 Html을 가져와 script를 로딩하기 때문에, 첫 로딩 시간도 오래 걸리고 SEO에 취약하다는 단점이 있다.

반면, next.js는 pre-reloading을 통해 미리 데이터가 렌더링된 페이지를 가져올 수 있게 해주므로 사용자에게 더 좋은 경험을 주고, 검색 엔진에 잘 노출될 수 있도록 해주는 SEO에서도 장점을 얻을 수 있다.

pre-reloading은 SSR뿐만 아니라 정적 사이트 생성(Static-Site Generate(SSG))도 가능하게 해준다.

또, SSR과 CSR도 혼합하여 사용 가능하다.

## Next.js없이는 SSR을 구현할 수 없을까?

결론은 가능하다.

next.js없이 react-helmet등의 라이브러리로 SEO에 대응할 수 있다.

하지만 이미 진행된 react 프로젝트에서 갑자기 프레임워크를 도입하는 것이 리팩토링 등 꽤 비용이 드는 작업이기 때문에 다른 방법을 사용했다고 한다.

## 또 어떤 기능들을 제공할까?

### 직관적인 페이지 기반 라우팅 시스템

next.js는 pre-rendering뿐 아니라 **페이지 기반 라우팅 시스템**도 제공한다. 프로젝트의 가장 바깥 폴더인 /page 폴더에서 컴포넌트를 export하면 폴더명이 페이지 route가 된다. (/pages/index.js → /, /pages/store/t-shirt → /store/t-shirt)

또, /look/[id]와 같은 dynamic route도 지원한다.

### 페이지간 빠르고 매끄러운 전환을 위한 client-side navigation

next는 <Link /> 컴포넌트를 통해 페이지간의 빠르고 매끄러운 이동을 가능하게 한다.HTML의 a태그와 달리 페이지를 리로딩하지 않고도 페이지간 이동이 가능하고, link 컴포넌트가 뷰포트에 보였을 때 관련 페이지를 백그라운드에서 미리 가져다놓기 때문에 사용자가 링크를 클릭했을 때 매우 빠르게 해당 페이지로 이동할 수 있게 해준다.

### Code Splitting(코드 분할)

웹의 첫 페이지가 로딩될 때, 큰 javascript payload를 보내는 것이 아니라, 번들을 여러 조각으로 조각내어서 처음에 갖아 필요한 부분만 전송해주는 방식을 통해 어플리케이션 로드 타임을 줄여준다. 코드 분할은 webpack, parcel, rollup 등의 모듈 번들러도 지원하고 있는 기능이지만 next.js를 사용하면 별도의 설정없이 자동으로 프로젝트에 적용된다.
