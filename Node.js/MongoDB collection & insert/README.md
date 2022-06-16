# MongoDB collection & insert

오류 중 대부분은 URL 오타이다

## database / collection 만들기

1. MongoDB Atlas 메인 대시보드에서 Collections
2. Add my own data(혹은 이미 뭐가 있다면 create database
3. database, collection 이름을 정하고 저장
    1. database : todoapp
    2. collection : post

둘의 차이

![image](https://user-images.githubusercontent.com/98325285/174098701-e6a87cb9-80ec-48a0-b291-971c42cc8ebb.png)


database - 하나의 폴더

collection - 하나의 엑셀파일

## server.js →db 통신하기

```jsx
MongoClient.connect('URL', { useUnifiedTopology: true }, function (err, client) {
	if (err) return console.log(err)
	db = client.db('todoapp');

	app.listen(8080, function () {
		console.log('listening on 8080')
	});
});
```

{useUnifiedTopology: true} - 워닝메시지 제거

### Collection에 자료 추가하는 방법

```jsx
MongoClient.connect('URL', { useUnifiedTopology: true }, function (err, client) {
	if (err) return console.log(err)
	db = client.db('todoapp');

	db.collection('post').insertOne({name: 'InJun', _id: 100 }, function(err, res) {
	  console.log('저장완료');
  });

	app.listen(8080, function () {
		console.log('listening on 8080')
	});
});
```

- insertOne() - 자료 추가(Object 형식)
    - insertOne(추가할 자료, 콜백함수)

```jsx
db.collection('post').insertOne();
```

이 패턴이 중요하다.

나중에 데이터 추가하고 삭제하고 수정할 때도 이거와 동일한 형식으로 사용한다.

### _id를 붙이는 이유?

mongoDB에선 자료들을 서로 구분하기 위해 _id가 꼭 있어야 한다.

직접 삽입해야하며 안 만들면 알아서 하나 만들어 준다.

- _id : ~~~~ 이런 식으로 유니크한 아이디를 하나 자동으로 부여한다.
- 이런 식으로 이상한 문자를 보고 싶지 않으면 _id: 1, _id: 2 이렇게 저장하는 자료들에 항상 유니크한 번호를 붙여서 저장하는 게 좋다.