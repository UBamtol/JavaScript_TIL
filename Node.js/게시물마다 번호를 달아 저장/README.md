# 게시물마다 번호를 달아 저장

### 게시물마다 \_id 번호를 다는 이유와 중요성

MongoDB에 데이터를 저장할 땐 \_id라는 값을 꼭 넣어야 한다. 그래야 삭제와 수정이 쉬워진다.

안 넣으면 MongoDB에서 ObjectId()라는 걸 만들어서 강제로 아이디를 부여한다.

하지만 무작위의 숫자와 문자로 이루어져있기 때문에 좋지 않다.

### 게시물 갯수 기록을 위한 counter라는 collection 만들고 자료 넣기

![image](https://user-images.githubusercontent.com/98325285/174481966-331efa74-22c7-4162-939c-93d464953099.png)

이런 식으로 지금까지 발행한 게시물의 수를 기록할 공간을 따로 만들어 준다.

초기값은 아무것도 없었다 생각하고 0으로 해준다.

```jsx
// 누군가 폼에서 /add로 post 요청하면(res.body에 게시물 데이터가 담겨온다.)
app.post('/add', function (req, res) {
  res.send('전송완료');

  // db.collection('counter')에서 이름이 '게시물갯수'인 항목을 찾는다.
  db.collection('counter').findOne(
    { name: '게시물갯수' },
    function (err, result) {
      console.log(result.totalPost);
      let totalPost = result.totalPost;
      // db.collection('post')에 아래와 같은 데이터를 추가한다.
      db.collection('post').insertOne(
        { _id: totalPost + 1, todo: req.body.todo, date: req.body.date },
        function () {
          console.log('저장완료');
        }
      );
    }
  );
});
```

1. findOne함수를 쓰면 collection 내에서 내가 원하는 문서를 쉽게 찾을 수 있다. 찾은 결과는 function 내의 result라는 변수에 담겨온다.
2. 아까 MongoDB에서 만든 counter의 totalPost라는 자료도 출력 가능하다. 이것으로 totalPost라는 변수에 저장한다.
3. 그 다음 post라는 collection에 insertOne을 써서 제대로된 \_id와 함께 자료를 저장한다.
4. 마지막으로 res.send라는 코드를 이용해 응답해준다.( 이 코드는 꼭 있어야한다. res.render, res.redirect 같은 것도 이용 가능하다.)

### DB 데이터를 수정하고 싶을 때 updateOne 사용하기

counter라는 콜렉션 내의 자료를 수정하고 싶다면 이렇게 하면 된다.

```jsx
db.collection('counter').updateOne( {변경하고 싶은 자료 이름} , {수정하고 싶은 내용} , function(err, result){
  console.log('수정완료')
})
```

updateOne 함수엔 파라미터가 세개 필요하다.

**첫번째**, {name: ‘게시물갯수'} 이렇게 자료를 찾을 수 있는 이름이라든지 쿼리문을 적으면 된다.

**두번째**, 내가 수정할 값을 입력해주면 된다. 하지만 방법이 약간 특이하다.

{ $set : { totalPost: 100 } } 이렇게 값을 아예 100으로 변경할 수 도 있고

{ $inc : { totalPost: 5 } } 이렇게 값을 5만큼 더해줄 수도 있다.

$ 표시 붙은 게 바로 operator라는 문법이다.

**세번째**, 콜백함수다. 수정이 성공이나 실패시 실행할 코드를 안에 담으면 된다.

그럼 여기서 데이터를 1 증가시키려면 아래와 같은 코드가 필요하다.

```jsx
db.collection('counter').updateOne( {name: '게시물갯수'} , {$inc: { totalPost: 1 } , function(err, result){
  console.log('수정완료')
})
```

### 이 코드를 언제 실행해야할까

글을 발행할 때이다.

```jsx
// 누군가 폼에서 /add로 post 요청하면(res.body에 게시물 데이터가 담겨온다.)
app.post('/add', function (req, res) {
  res.send('전송완료');

  // db.collection('counter')에서 이름이 '게시물갯수'인 항목을 찾는다.
  db.collection('counter').findOne(
    { name: '게시물갯수' },
    function (err, result) {
      console.log(result.totalPost);
      let totalPost = result.totalPost;
      // db.collection('post')에 아래와 같은 데이터를 추가한다.
      db.collection('post').insertOne(
        { _id: totalPost + 1, todo: req.body.todo, date: req.body.date },
        function () {
          console.log('저장완료');
          // db.collection('counter')에서 name: '게시물갯수'인 항목을 1증가시킨다.
          db.collection('counter').updateOne(
            { name: '게시물갯수' },
            { $inc: { totalPost: 1 } },
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log(result);
              }
            }
          );
        }
      );
    }
  );
});
```

이렇게 글을 발행해주는 코드 안에 넣어주면 된다.
