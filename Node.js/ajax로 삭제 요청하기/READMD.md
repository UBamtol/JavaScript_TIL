# ajax로 삭제 요청하기

요청은 총 4개 종류가 있다. **GET, POST, PUT, DELETE**

하지만 HTML 폼에서 일반적으로 PUT, DELETE 요청을 할 수 없다.

```jsx
// 일반적으로는 불가능하다.
<form method='DELETE'>
  <button>버튼</button>
</form>
```

일반적인 HTML 폼 안에선 GET, POST 요청 밖에 못 보낸다.

그래서 삭제 요청을 할 때 쓸 수 있는 방법이 3가지 있다.

1. method-override 라이브러리를 사용한다.
2. ajax로 delete 요청을 보낸다.
3. 그냥 post 요청을 보내서 delete 작업을 수행한다.

여기서 가장 편한 건 3번이지만 REST한 API를 만들기 위해 1, 2번을 써야한다.

## AJAX는 무엇인가

프론트엔드에서 javascript를 이용해 서버에 여러가지 요청을 할 수 있는 문법 같은 거다. 장점은 새로고침 없이도 서버에 몰래몰래 요청을 할 수 있다는 것이다.

그래서 새로고침이 없는 스무스한 사이트를 만들고 싶으면 많은 요청을 ajax문법을 이용해 처리하게 된다.

## AJAX를 쓰기 위한 jQuery 설치

이미 bootstrap을 설치했기 때문에 아래와 같은 코드가 있을 것이다.

```jsx
<script
  src='https://code.jquery.com/jquery-3.4.1.slim.min.js'
  integrity='~~~'
  crossorigin='~~~'
></script>
```

이 코드가 jquery를 CDN 방식으로 설치하는 부분이다.

(CDN은 다른 사이트에서 호스팅해주는 jquery 파일을 내 HTML에 적용해달라는 뜻이다.)

하지만 jquery slim 버전으로는 ajax요청이 불가능하기 때문에 slim을 지워준다.

### AJAX 기본 문법

```jsx
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<script>
  $.ajax({
    method : 'POST',
    url : '/add',
    data : '공부하기'
  })
</script>
```

위 코드는 /add경로로 POST요청을 하는데 ‘공부하기'라는 데이터를 보내라는 뜻이다.

하지만 이렇게 해서는 성공한지 실패한지 모르기 때문에 아래와 같은 문법을 추가해줘야한다.

```jsx
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<script>
  $.ajax({
    method : 'DELETE',
    url : '/delete',
    data : '공부하기'
  }).done(function(결과){
    성공시 코드
  }).fail(function(에러){
    실패시 코드
  });
</script>
```

그 후 서버에 코드를 추가해주면 삭제 기능이 완성된다.

```jsx
// 대충 이런 식이다.
app.delete('/delete', function(req, res){
  db,collection('post').deleteOne()...
  res.send('삭제완료');
});
```

Data에 내가 원하는 id를 넣고 싶을 때는 어떻게 할까

```jsx
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<script>
  $.ajax({
    method : 'DELETE',
    url : '/delete',
    data : {_id: 원하는 id 번호}
  }).done(function(결과){
    성공시 코드
  }).fail(function(에러){
    실패시 코드
  });
</script>
```

이런 식으로 넣으면 된다. 서버에는 이런 식으로 써주면 된다.

```jsx
app.delete('/delete', function (req, res) {
  db,
    collection('post').deleteOne(req.body, function (err, result) {
      console.log('삭제완료');
    });
  res.send('삭제완료');
});
```

deleteOne(삭제하고 싶은 데이터 이름, function(){}) 이렇게 쓰면 된다.

Ajax요청시 data: {\_id: 원하는 id 번호} 라는 정보는 req.body에 담겨 온다.

하지만 삭제가 안 된다. 이유는 ajax 요청 등으로 데이터를 서버에 전송할 때 숫자자료들이 가끔 문자화 되어 넘어오는 경우가 있다. 그래서 parsInt()로 감싸줘서 숫자로 형변환을 시켜줘야한다.

```jsx
app.delete('/delete', function (req, res) {
  req.body._id = parseInt(req.body._id);
  db,
    collection('post').deleteOne(req.body, function (err, result) {
      console.log('삭제완료');
    });
  res.send('삭제완료');
});
```

**버튼을 누를 때 ajax요청을 하고 원하는 데이터를 삭제하기**

```jsx
<ul class="list-group">
  <% for (var i = 0; i < posts.length; i++){ %>
  <li class="list-group-item">
    <h4> 할일 제목 : <%= posts[i].제목 %> </h4>
    <p> 할일 마감날짜 : <%= posts[i].날짜 %> </p>
    <button class="delete">삭제</button>
  </li>
  <% } %>
</ul>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<script>
  $('.delete').click(function(){
    $.ajax({
      method : 'DELETE',
      url : '/delete',
      data : { _id : 1 }
    }).done(function(결과){
      //AJAX 성공시 실행할 코드는 여기
    })

  });
</script>
```

1. \<button> 태그에 ‘delete’라는 클래스를 추가하고
2. \$.ajax 코드를 $(’delete’).click이라는 함수로 감싼다.

이건 delete라는 클래스명을 가진 요소를 클릭하면 내부 $.ajax 코드를 실행하라는 의미이다.

하지만 위에 코드를 실행하면 항상 id가 1인 게시물만 삭제한다.

**원하는 글을 삭제하기**

```jsx
<ul class="list-group">
  <% for (var i = 0; i < posts.length; i++){ %>
  <li class="list-group-item">
    <h4> 할일 제목 : <%= posts[i].todo %> </h4>
    <p> 할일 마감날짜 : <%= posts[i].date %> </p>
    <button class="delete" data-id="<%= posts[i]._id %>">삭제</button>
  </li>
  <% } %>
</ul>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<script>
  $('.delete').click(function(){
    $.ajax({
      method : 'DELETE',
      url : '/delete',
      data : { _id : e.target.dataset.id }
    }).done(function(결과){
      //AJAX 성공시 실행할 코드
    })
  });
</script>
```

1. \<button> 태그에 data-id라는 속성을 추가
2. data: { } 부분을 변경

위에 코드를 보면 \_id: 부분을 e.target.dataset.id라는 코드로 바꼈다.

e.target은 지금 클릭한 요소를 뜻한다. 그럼 e.target.dataset.id는 무엇일까

지금 클릭한 요소의 datasetd의 id 속성값을 의미한다.

이젠 2번 글을 클릭하면 {\_id:2}가 되고 3번을 누르면{\_id:3}이 된다.
