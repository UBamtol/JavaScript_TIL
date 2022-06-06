# Basic GET request

## 서버 기본 세팅

```jsx
// 서버를 띄우기 위한 기본 세팅(express 라이브러리)
const express = require('express');
const app = express();

app.listen();
```

```jsx
// listen(서버를 띄울 포트번호, 띄운 후 실행할 코드);
app.listen(8080, function () {
  console.log('listening on 8080');
});
```

브라우저에 **localhost:8080**입력하면 된다.

```jsx
// /라는 경로(홈)로 방문하면 함수 실행
app.get('/', function (req, res) {
  res.send('홈페이지 사이트입니다.');
});

// study라는 경로로 방문하면 함수 실행
app.get('/study', function (req, res) {
  res.send('스터디 사이트입니다.');
});

// gym이라는 경로로 방문하면 함수 실행
app.get('/gym', function (req, res) {
  res.send('헬스장 사이트입니다.');
});
```

하나 추가할 때마다 서버를 재실행 해줘야 한다.

**이것을 자동화 시키는 방법**

```powershell
# npm의 경우
npm install -g nodemon # -g : 내 컴퓨터 모든 폴더에서 이용할 수 있게 설치해라

# yarn의 경우
yarn add global nodemon

# 서버 실행방법(서버 파일 이름이 server.js인 경우)
nodemon server.js
```

**만약 보안오류가 뜨는 경우**

powershell 관리자 권한으로 실행 → executionpolicy 입력 → Restriced가 뜰 경우 허가한 스크립트만 실행할 수 있다는 것 →set-executionpolicy unrestricted 입력 → Y[예] 입력

```powershell
executionpolicy
set-set-executionpolicy unrestricted
y
```

### URL을 들어왔을 때 파일 전송하는 법

```jsx
// 이제 홈으로 들어가면 파일을 전송해보는 코드로 변경해보자
app.get('/', function (req, res) {
  res.send('홈페이지 사이트입니다.');
});

▼▼▼

// .sendFile(보낼 파일 경로)
app.get('/', function (req, res) {
  res.sendFile(__dirname + './index.html');
});
```
