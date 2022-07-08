# Pre-rendering과 DataFetching

- pre-rendering의 두가지 형식: Static Generation과 Server-side Rendering
- 데이터가 있을 때: Staitc Generation, 데이터가 없을 때의 Static Generation

## Pre-rendering

기본적으로 Next.js는 모든 페이지를 pre-render한다. 이 말은, client-side 자바스크립트와는 다르게 Next.js는 각 페이지에 대해 미리 HTML을 만들어 놓는다. 이러한 pre-rendering으로 인해 좋은 성능과 SEO를 얻을 수 있다.

생성된 HTML에는 최소한으로 필요한 자바스크립트 코드가 있다. 페이지가 브라우저에 의해 로드될 때, 그 자바스크립트 코드가 실행되고 페이지를 동적이게 만들어준다.(이 과정을 hydration이라고 부른다.)

![image](https://user-images.githubusercontent.com/98325285/178017970-31c1e93e-edd4-4e94-bbb4-3ca52d040f27.png)

![image](https://user-images.githubusercontent.com/98325285/178018075-7be4dc19-7834-4239-a1ad-dcfb781e8ef5.png)

이는 Server-side Rendering의 특징이기도 하다.

### Pre-rendering의 형식

Next.js는 pre-rendering을 **Static Genertaion**과 **Server-side Rendering**, 이 두가지 형식으로 제공한다. 이 **둘의 차이점은 HTML이 언제 생성되는지**이다.

**Static Generation**은 빌드 타임에 HTML을 생성하는 pre-rendering 방법이다. pre-rendering된 HTML은 각 요청마다 재사용이 가능하다.

**Server-side Rendering**은 각 요청마다 HTML을 생성하는 pre-rendering방법이다.

![image](https://user-images.githubusercontent.com/98325285/178018127-049f03dd-2e5a-49b7-9966-5cff41142617.png)

![image](https://user-images.githubusercontent.com/98325285/178018184-c833f0ff-ceab-4c9f-9ba5-44a3279040ae.png)

npm run dev나 yarn dev를 통해 개발을 하는 동안에는 Stati Generation 방식을 사용하고 있다해도 모든 페이지가 각 요청마다 pre-rendering된다.

여기서 중요한 점은, Next.js는 각 페이지마다 우리에게 어떠한 pre-rendering방식을 사용할지 선택할 수 있게 해주는 것이다. 따라서 특정 페이지에는 Static Generation방식을, 나머지 페이지에는 Server-side Rendering방식을 사용할 수 있는 ‘hybrid’앱을 만들 수 있다.

![image](https://user-images.githubusercontent.com/98325285/178018271-04d66cc8-a353-4a42-9f2e-585f9e725f0c.png)

### Static Generation VS Server-side Rendering

Next.js 공식 문서에서는 가능하면 Static Gerneration 방식을 사용하기를 권장한다. 왜냐하면 페이지가 한번 빌드되어 CDN\*에 의해 제공이 될 수 있으며 매번 페이지 요청을 하는 것보다 렌더링 속도가 빠르기 때문이다.

\*CDN이란 Content Delivery Network의 약자로 지리적 제약 없이 전 세계 사용자에게 빠르고 안전하게 콘텐츠를 전송할 수 있는 콘텐츠 전송 기술을 의미한다.

이러한 Static Generation은 다음과 같은 상황에서 사용할 수 있다.

- 마케팅 페이지
- 블로그 포스트
- E-commerce 상품 리스트
- 각종 문서 페이지

페이지를 제작할 때 ‘사용자의 요청보다 먼저 페이지가 렌더링 되어도 되는가?’에 대한 질문을 자신에게 던져보고, 대답이 ‘응' 이라면 Static Generation을 선택하는 게 좋을 것 같다. 반대로, 데이터의 업데이트가 많거나 사용자의 요청마다 매번 바뀌는 페이지라면 별로 좋은 선택이 아닐 것 같다.

마지막엔 설명한 상황에서 Server-side Rendering을 사용할 수 있다. 조금 느릴 순 있지만 페이지는 항상 최신의 상태를 유지한다. 아니면 pre-rendering을 생량하고 client-side Javascript를 통해 보여줄 수도 있다.
