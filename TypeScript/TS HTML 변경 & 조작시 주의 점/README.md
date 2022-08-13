# TS HTML 변경 & 조작시 주의 점

```tsx
// 파일구조
./index.js
./index.ts
./index.html
```

위와 같이 있을 때

```html
<h4 id="title">안녕하세요</h4>
<a href="naver.com" class="link">링크</a>
<button id="button">버튼</button>
<script src="index.js"></script>
// index.ts를 tsc -w를 이용하여 변환된 index.js파일
```

타입스크립트 파일은 바로 script에 바로 첨부할 수 없기 때문에 터미널에 tsc -w명령어를 이용하여 index.js로 컴파일링을 해서 변환을 해주어야 한다.

그리고 tsconfig.json 파일에 { “strictNullChecks”: true }를 추가해준다.

```json
{
	"compilerOptions": {
		"target": es5,
		"module": "commonjs",
		"strictNullChecks": true,
	}
}
```

안에 설정은 사용자에 맞게 변경하면 된다.

### <h4> 태그 id 속성내용 변경

```tsx
let title = document.querySelector('#title');
title.innerHTML = '반가워요'; // error -> title의 타입은 element | null
```

타입을 하나로 narrowing을 해주어야 한다.

타입이 유니온인 이유는 가끔 HTML 태그를 잘못 쓸 경우 null이 들어오기 때문이다.

```tsx
let title = document.querySelector('#title');
if (title != null) {
  title.innerHTML = '반가워요';
}
```

## HTML 조작시 narrowing 하는 방법

1. 위와 같은 방법
2. instanceof 연산자

   ```tsx
   let title = document.querySelector('#title');
   if (title instanceof Element) {
     title.innerHTML = '반가워요';
   }
   ```

   이 방법을 가장 많이 사용한다.

3. as 키워드

   ```tsx
   let title = document.querySelector('#title') as Element;
   title.innerHTML = '반가워요';
   ```

   이 방법은 별로 좋지 않은 방법이다.

4. object에 붙이는 ?.(옵셔널 체이닝)

   ```tsx
   let title = document.querySelector('#title');
   if (title?.innerHTML != undefined) {
     title.innerHTML = '반가워요';
   }
   ```

   ?.의 의미는 title에 innerHTML이 있으면 출력을 하고 없으면 undefined를 리턴는 소리다.

5. tsconfig.json에서 strictNullChecks를 false로 바꾼다.

   이것도 좋은 방법은 아니다.

### <a> 태그 href속성내용 변경

```tsx
let link = document.querySelector('.link');
link.href = 'https://kakao.com'; // error -> title의 타입은 element | null
```

에러가 나는 이유는 위와 같다. 그렇기에 narrowing을 해줘야 한다.

```tsx
let link = document.querySelector('.link');
if (link instanceof Element) {
  link.href = 'https://kakao.com';
}
```

에러가 난다. 이유는 href라는 속성이 element타입에 없기 때문이다.

narrowing을 할 때 상세히 해주어야 한다.

```tsx
let link = document.querySelector('.link');
if (link instanceof HTMLAnchorElement) {
  link.href = 'https://kakao.com';
}
```

이렇게 해주어야 에러가 안 난다.

Element타입

- HTMLAnchorElement
- HTMLHeadingElement
- HTMLButtonElement

등 여러가지 타입이 존재한다.
