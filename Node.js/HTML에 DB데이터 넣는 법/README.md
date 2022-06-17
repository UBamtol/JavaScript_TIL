# HTML에 DB 데이터 넣는 법

# EJS

/add 로 post 요청시 DB에 저장하는 법

```jsx
app.post('/add', function (req, res) {
  res.send('전송완료');
  console.log(req.body); // req.body까지만 하면 요청했던 form에 적힌 데이터 수신 가능, 중요 정보니깐 어딘가에 저장을 할 것
  db.collection('post').insertOne({todo: req.body.todo, date: req.body.date}, function () {
    console.log('저장완료');
  });
});
```

이렇게 하면 폼에서 뭔가를 전송시킬 때 DB에 데이터를 저장한다.

그리고 **res.send()은 항상 존재해야 한다.**

전송이 성공하든 실패하든 뭔가 서버에서 보내주어야 한다. 안 그러면 브라우저가 멈춘다.

메세지가 싫다면 간단한 응답코드나 리다이렉트(페이지 강제이동)를 해주는 코드도 있다.

**/list 로 방문하면 ejs 파일을 보내는 법**

그냥 HTML 파일만 보내주면 static페이지가 된다.

HTML에 실제 DB 데이터를 넣어서 보내줄 수가 없다.

그래서 EJS, Pug같은 템플릿 엔진을 사용한다.

EJS는 서버 데이터를 HTML에 쉽게 넣을 수 있게 도와주는 일종의 HTML 렌더링 엔진이다.

```bash
npm install ejs
```

```jsx
// 이걸 Server.js 상단에 적어준다. const 여러개 있는 곳 밑 
app.set('view engine', 'ejs');
```

### EJS 파일 만들기

작성법은 html과 똑같다.

다만, 중간중간 EJS 문법으로 데이터를 넣을 뿐이다.

**주의할 점 : 작업폴더 내에서 views라는 이름의 폴더를 하나 만든 후 거기에 list.ejs 파일을 만들어야 한다.**

```html
(views/list.ejs)

<!doctype html>
<head>
  index.html에 있던거 전부 복붙
</head>

<body>
  index.html에 있던거 전부 복붙
</body>

</html>
```

### EJS 파일 기본적인 문법

```html
// HTML 중간에 서버 데이터를 집어넣고 싶을 때 이렇게 사용, h2는 예시
<h2><%= 서버에서 보낸 데이터 변수명 %></h2>
```

이렇게 하면 html 글자로 렌더링 된다.

EJS를 사용하면 HTML에 여러가지 자바스크립트 문법을 사용할 수 있다.

```html
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
```

이런 식으로 <% %> 내부에 자바스크립트 문법을 담으면 된다.

### MongoDB에서 데이터를 꺼내는 법

```jsx
db.collection('post'),find();
db.collection('post'),findOne();
```

이런 식으로 코드를 작성하면 된다.

“POST” 콜렉션에 저장된 모든 데이터를 가져와라"라는 명령을 쓸 때는

```jsx
(server.js)

app.get('/list', function(req, res){
  db.collection('post').find().toArray(function(err, result){
    console.log(result);
    res.render('list.ejs');
  })
})
```

find().toArray()라는 코드를 사용하면 collection(’post’)에 있는 모든 데이터를 Array자료형으로 가져온다.

[자료1, 자료2…] 이런 식으로 담겨온다. **자료가 안 오거나 에러가나면 실제 DB에 데이터 몇개가 제대로 자장되어 있는지를 확인하자**

### 데이터를 list.ejs 파일에 보내는 법

```jsx
(server.js)

app.get('/list', function(req, res){
  db.collection('post').find().toArray(function(err, result){
    console.log(result);
    res.render('list.ejs', { posts: result );
  })
})
```

.render()라는 함수에 두번째 파라미터를 이렇게 적어주면 list.ejs 파일을 렌더링하는 동시에{post:result}라는 데이터를 함께 보낼 수 있다. (정확히는 result라는 데이터를 post라는 이름으로 ejs파일에 보내라는 명령이다.)

### 데이터를 가지고 EJS 파일을 꾸미기

```html
(views/list.ejs)

<h4>임시 투두</h4>
<p>임시 날짜</p>

<h4>임시 투두</h4>
<p>임시 날짜</p>

▼▼▼

<h4><%= posts %></h4>
<p><%= posts %></p>

<h4>임시 투두</h4>
<p>임시 날짜</p>
```

하지만 이런식으로 하면 출력이 제대로 나오지 않는다.

원하는 할일과 날짜 데이터를 출력하려면

```html
(views/list.ejs)

<h4><%= posts[0].todo %></h4>
<p><%= posts[0].date %></p>

<h4><%= posts[1].todo %></h4>
<p><%= posts[1].date %></p>
```

하지만 이런 반복되는 코드는 반복문으로 축약할 수 있다.