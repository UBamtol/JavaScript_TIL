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
