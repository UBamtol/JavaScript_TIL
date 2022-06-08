# 폼에 입력한 데이터 서버로 전송하는 법(POST 요청)

<form> 태그 기능 개발

```jsx
// 꼭 있어야 하는 2개 속성
// action = 요청할 경로
// method = submit을 누르면 GET요청을 할지 POST요청을 할지
<form action="/액션" method="POST">
  {' '}
  // /액션 경로로 POST 요청한다.
</form>
```

서버 파일에 post 코드 추가

```jsx
// app.post('경로', 콜백함수)
app.post('/액션', function (req, res) {
  res.send('전송완료');
});
```

이렇게 서버에 보낸 정보는 req에 들어 있다.

이걸 꺼내려면 body-parser 라이브러리가 필요하다.

```powershell
# npm이 경우
npm install body-parser

# yarn의 경우
yarn add body-parser
```

이제 서파 파일 상단에 코드 추가

```jsx
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
```

하지만 2021년 이후로 설치한 프로젝트들은 body-parser 라이브러리가 express 안에 기본 포함되어 있어서 따로 npm으로 설치할 필요 없이 아래 코드만 추가해주면 된다.

```jsx
app.use(express.urlencoded({ extended: true }));
```

POST 요청으로 서버에 데이터 전송방법

1. body-parser 라이브러리 필요
2. form 데이터의 경우 input에 name 쓰기(서버에서 input을 구분하기 위해서)
   form 데이터의 경우 input에 name 쓰기(서버에서 input을 구분하기 위해서)
