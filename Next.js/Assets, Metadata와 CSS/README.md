# Assets, Metadata와 CSS

## Assets

Next.js는 이미지와 같은 정적 자산을 최상위인 public 디렉토리에서 제공이 가능하다. public 안에 있는 파일들은 pages와 유사하게 애플리케이션 루트에서 접근이 가능하다.

또한 이 public디렉토리는 robots.txt, Google Site Verification과 다른 정적 자산에도 유용하다.

어떠한 사진을 public디렉토리에 다운로드 받고 불러온다고 가정했을 때 다음과 같은 방식으로 불러올 수 있다.

```jsx
<img src='/images/profile.jpg' alt='image' />
```

하지만 이 방법은 다음과 같이 따로 처리해야 하는 것이 있다.

- 달라지는 화면 사이즈에 대한 반응형 처리
- 써드파티 툴이나 라이브버리를 이용한 이미지 최적화
- 사용자가 viewport에 들어왔을 때에만 이미지를 로딩

이 밖에도 더 있지만 Next.js는 이런 문제들을 해결해줄 수 있는 image 컴포넌트를 제공한다.

### Image 컴포넌트와 이미지 최적화

next/image는 모던 웹을 위해 더 발전된 HTML<img>요소의 확장이다.

또한 Next.js는 이미지 최적화를 기본적으로 제공한다. 이를 통해 브라우저가 지원한는 경우 WebP와 같은 최신 포멧으로 이미지 사이즈를 조정하고 최적화할 수 있다. 사이즈가 큰 이미지를 작은 화면의 기기에 그대로 사용하는 경우를 피할 수 있고, 향후 이미지 형식을 자동으로 채택하고 해당 형식을 지원하는 브라우저에 제공할 수 있다.

자동 이미지 최적화는 어떠한 이미지 소스여도 동작이 되며, 심지어 이미지가 CMSㅗ와 같은 외부 데이터에서 제공되더라도 가능하다.

### Image 컴포넌트

Next.js는 빌드할 때 이미지를 최적화하는 대신에, 사용자가 요청한 것에 대해서 최적화를 진행한다. 정적 사이트 생성기 및 정적 전용 솔루션과 달리 빌드 시간은 이미지 10개를 전송하든 1,000만개를 전송하든 증가하지 않게 된다.

이미지는 기본적으로 lazy loading된다. 이 말은 페이지 로드 속도가 viewport 외부의 이미지에 의해 느려지지 않는다는 것이다. 즉 이미지는 viewport안에 있는 스크롤에 따라 로드된다.

예를 들어서 next/image를 통해 아까 저장한 사진을 보여주는 페이지를 만들 때, 원하는 높이와 넓이값을 주는데, **이때 기존 이미지 비율과 일치해야 한다.**

```jsx
import Image from 'next/image';

const Profile = () => {
  <Image src='/images/profile.jgp' height={300} width={400} alt='image' />;
};
export default Profile;
```

## Metadata

\<title> 태그와 같은 페이지의 메타데이터를 바꾸고 싶을 땐 어떻게 해야 할까?

\<title>은 \<head>태그에 있기 때문에 Next.js에서 \<head>태그를 어떻게 수정하는지 알아야 한다.

pages/index.js을 보면 다음과 같은 코드가 작성되어 있다.

```jsx
<Head>
  <title>Create Next App</title>
  <link rel='icon' href='/favicon.ico' />
</Head>
```

위의 코드를 보면 \<head> 태그 대신에 \<Head>로 작성된 React컴포넌트가 있는 것을 볼 수 있다. 이는 Next.js에서 기본적으로 제공하는 컴포넌트로, 페이지의 \<head> 태그를 수정할 수 있게 해준다.

Head컴포넌트는 next/head 모듈에서 import하여 사용이 가능하다.

```jsx
import Head from 'next/head';

const FirstPost = () => {
  return (
    <>
      <Head>
        <title>첫 번째 포스트</title>
      </Head>
      <h1>첫 포스트!</h1>
      <h2>
        <Link href='/'>
          <a>홈으로 돌아가기</a>
        </Link>
      </h2>
    </>
  );
};

export default FirstPost;
```

## CSS스타일

React에서는 보통 CSS-in-JS를 통해 스타일 작업을 진행한다.

그 중에서 styled-components, emotion이 가장 유명하고 많이 사용된다.

### styled-components

- CSS-in-JS 기술로, JavaScript내에 CSS를 작성하는 라이브러리
- 스타일 정의를 CSS 파일이 아닌 JavaScript로 작성된 **컴포넌트**에 바로 삽입하는 스타일 기법
- 클래스명을 해시값으로 자동 생성하고, 클래스명 오염을 방지할 수 있음
- 자바스크립트의 동적인 값들을 온전하게 사용이 가능
- 사용법

  1. 작성방법

     1. 코드 가독성을 위해 컴포넌트를 먼저 선언하고 하단에 styled-component를 작성한다.
     2. Template Literal을 사용하여 작성하며, const 컴포넌트명 = styeld.태그명으로 이루어져 있다.

        ```jsx
        const Title = styled.div`
        	font-size: 1.5em'
        	text-align: center;
        	color: black;
        `;
        ```

  2. styled-component에 props 사용 및 조건식 사용하기

     ```jsx
     const Title = styled.div`
     	font-size: 1.5em'
     	text-align: center;
     	color: ${(props) => (props.primary ? 'white' : 'black')};
     `;
     ```

     - 변수에 따라서 스타일을 바꿀 수 있다는 장점이 있다.
     - &&, || 연산자를 이용해서 스타일을 적용할 수 있다.

이 밖에도 여러가지 사용법이 있다.

### emotion

- css props 기능

  - 인라인 스타일을 작성하지만 클래스가 된다.
    ```jsx
    <div style={{ color: 'red' }} />
    ```
    기존 style 속성은 HTML 인라인 스타일로 주입이 된다.
    스타일 우선순위를 다루기 어렵고 스타일 재활용도 힘들다.
    ```jsx
    <div style={{ color: 'red' }} />;
    {
      /*혹은*/
    }
    <div
      css={css`
        color: red;
      `}
    />;
    ```
    emotion jsx에서 제공해주는 css 속성을 활용하면 이를 클래스로 변환해준다.
    기존 인라인으로 사용할 수 없었던 media query, pseudo selector(가상 선택자), nested selector(중첩 선택자) 등을 사용할 수 있다.
  - css props를 결합하여 복잡한 스타일링을 진행할 수 있다.

    ```jsx
    <div css={[style, themes[theme], sizes[size]]} />;

    const themes = {
      primary: css`
        color: red;
      `,
      secondary: css`
        color: blue;
      `,
    };
    const sizes = {
      small: css`
        fontsize: 0.75rem;
      `,
      medium: css`
        fontsize: 1rem;
      `,
    };
    ```

    위와 같이 css 변수를 조립하여 컴포넌트를 스타일링을 진행할 수 있다.

    ```tsx
    type ThemeType = keyof typeof themes;
    type SizeType = keyof typeof size;
    ```

    typescript로 자동 타입지정까지 할 수 있는 이점이 있다.
    css override도 가능하다.

- SSR
  - SSR에서 별도의 설정없이 동작된다.
  - 반면, styled-components 같은 경우 SercerStyleSheet을 설정해야 한다.
  -

Next.js는 기본적으로 styled-jsx를 지원하지만 styled-components나 emotion과 같은 다른 유명한 CSS-in-js라이브러리를 사용하는 것도 물론 가능하다.

## Layout 컴포넌트

프로젝트 최상위 경로에 components라는 디렉토리를 만들고, layout.js라는 파일을 만들어 보자.

모든 페이지에서 공유 가능한 Layout컴포넌트를 만들 거다.

```jsx
export default function Layout({ children }) {
  return <div>{children}</div>;
}
```

위에서 만든 pages/posts/first-post.js를 열어서 Layout컴포넌트를 import하고 그것으로 다른 컴포넌트를 감싸주자.

```jsx
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>첫 번째 포스트</title>
      </Head>
      <h1>첫 포스트!</h1>
      <h2>
        <Link href='/'>
          <a>홈으로 돌아가기</a>
        </Link>
      </h2>
    </Layout>
  );
}
```

나아가기 전 React에서 css 적용하는 방법들에 대해서 알아보자.

- React에서 css 적용하기
  create-react-app으로 설치한 react프로젝트인 경우, css-loader, style-loader를 따로 설치하지 않아도 webpack에서 사용하는 css 설정을 사용할 수 있다.
  ```
  css-loader: @import, url() 등의 구문을 해석, 적용해준다.
  style-loader: <style>태그를 통해서 css를 DOM에 적용해준다.
  ```
  1. **인라인(inline) styling 적용**
     - html 태그 안에 직접 입력하는 방법. style={ } 형식으로 입력하며, 안에는 json 형식으로 속성명: ‘속성값'으로 입력한다.
     - 속성명은 케밥 케이스(kebab case)가 아닌, camelCase 속성명을 사용한다.(html에서 background-color는 react에서 backgroundColor이다.)
     - 인라인 스타일 적용은 가장 높은 우선순위를 갖는다.
     - ex) Main.js
       ```jsx
       import React from 'react';
       const Main = () => {
         return (
           <>
             <h1
               style={{
                 color: 'yellow',
                 backgroundColor: 'black',
               }}
             >
               제목입니다.
             </h1>
           </>
         );
       };
       ```
       또는 javascript object를 이용할 수도 있다.
       ```jsx
       import React from 'react';
       const Main = () => {
         const styleObj = {
           color: 'yellow',
           backgroundColor: 'black',
         };
         return (
           <>
             <h1 style={styleObj}>제목입니다.</h1>
           </>
         );
       };
       ```
  2. **css styling 작성, component에서 css파일 import**
     - 별도의 파일에 스타일을 정의해놓고, React컴포넌트 파일에서 해당 CSS파일을 import하여 사용할 수 있다.
     - 그 다음, 요소의 className 속성을 이요해서 외부 파일에 정의된 스타일을 맵핑시켜준다.
     - 이땐 camelCase로 작성하지 않고, 기존 css작성하는 것과 동일하게 작성한다.
       ```css
       /* Main.css */
       .title_box {
         color: yellow;
         background-color: black;
       }
       ```
       ```jsx
       import React from 'react';
       import './Main.css';
       const Main = () => {
         return (
           <>
             <h1 className='title_box'>제목입니다..</h1>
           </>
         );
       };
       ```
       하지만 이 방법은 해당 모듈 뿐만 아니라 모든 모듈에 적용이 된다.
       이로인해 읟와는 다르게 적용되기도 하며, css class명이 충돌하는 경우도 발생할 수 있다. 이를 해결하기 위한 방법은 다음과 같다.
  3. **css-module 사용하기**

     - css-moudle을 이용하면 클래스명이 충돌하는 단점을 해결할 수 있다.
     - css-moudle을 이용하면 컴포넌트 단위로 스타일을 적용할 수 있다.

     ```
     문법: {모듈명}.moudle.css(꼭 모듈명과 같아야 하는 건 아니지만 같게 작성하는 것이 좋다.)
     import 방법: import style from './모듈명.module.css';
     적용방법: {style.모듈명}
     ```

     ```css
     /* Main.module.css */
     .title_box {
       color: yellow;
       background-color: black;
     }
     ```

     ```jsx
     import React from 'react';
     import style from './Main.module.css';
     const Main = () => {
       return (
         <>
           <h1 className={style.title_box}>제목입니다..</h1>
         </>
       );
     };
     ```

     이렇게 되면 클래스명에 hash값이 붙어 고유한 값으로 변경된다. 이로인해 각각의 모듈별로 css를 적용할 수 있다.

  4. **scss를 사용해도 위와 동일하게 적용이 가능하다.**

이제 Layout컴포넌트에 스타일을 추가해보자. 그러기 위해서는 React컴포넌트에서 CSS파일을 import하게 해주는 CSS moudule을 사용할 거다. 그리고 그것을 사용하기 위해선 css파일의 이름을 .module.css로 끝나야 한다.

```css
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
  background-color: yellowgreen;
}
```

container클래스를 layout.js에서 사용하기 위해선 css파일을 styles이라는 이름으로 import해온다. 그리고 className을 style.container로 설정하여 사용한다.

```jsx
import styles from './layout.module.css';

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
```

이는 css modules가 자동적으로 고유의 클래스명을 생성해준다. 이처럼 css modules를 사용하면 고유의 클래스명을 생각하는데 힘을 쏟지 않아도 된다.

게다가 Next.js의 코드 스플릿팅은 css modules에서도 동작한다. 각 페이지마다 최소한의 css가 로드되는 것을 보장하고 이는 번들 사이즈를 줄여준다.

## Global Styles

CSS module은 컴포넌트별로 스타일링을 할 때 유용하다. 하지만 모든 페이지에 적용되는 스타일을 원할 때는 어떻게 할까?

global CSS를 로드하기 위해 pages/\_app.js 파일을 만들고 다음과 같이 작성한다.

```jsx
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

이 App컴포넌트는 모든 다른 페이지에서 공통되는 최상위 구성 요소이다. 이 App를 통해 페이지간 이동을 할 때 상태를 유지할 수 있다.

App컴포넌트를 추가했으면 서버를 재실행 해야한다.

### Global CSS추가

Next.js에서는 pages/\_app.js에서 global CSS를 import해줌으로써 사용할 수 있다. global css는 페이지의 모든 요소에 영향을 끼치기 때문에 \_app.js이외의 경로에서는 global css를 import할 수 없다.

만약 홈에서 /posts/first-post로 이동하게끔 했다면, 홈의 global 스타일은 /posts/first-post에 영향을 끼친다.

global css는 어디에나 위치할 수 있으며, 어떤 이름이나 가질 수 있다.

프로젝트 최상위 폴더에 styles디렉토리를 만들고 그 안에 global.css파일을 만들었다고 가정해보자. 그럼 다음과 같이 사용할 수 있다.

```jsx
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```
