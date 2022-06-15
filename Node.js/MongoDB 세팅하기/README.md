# MongoDB 세팅하기

### 웹사이트 기능 만들기 기본

1. 서버로 데이터 전송할 수 있는 UI 만들고
2. 서버에서 원하는대로 정보를 처리해주면 된다.

request값은 어딘가에 저장을 할 필요가 있다.

.txt 파일에 저장하는 것도 가능하다. 하지만 보통 사용하지 않는다. (대량의 데이터를 저장하기엔 무리가 있다.) → 엑셀이 가능 → 하지만 엑셀은 10만단위가 넘어가면 버벅거림 → Database를 사용

**DB종류**

1. 관계형
    1. 데이터 이름 달고
    2. 실제 데이터 기입
    3. but, 3차원 데이터를 잘 못 다룬다. → 테이블을 여러 개 만들어서 사용
    4. 대부분 sql이라는 언어를 사용한다.
2. NoSQL
    1. object 자료형으로 입출력 가능
    2. 종류
        1. Dynamo
        2. Oracle NoSQL
        3. MongoDB( 가장 유명)
        4. Redis
        5. Cassandra
    3. 데이터 입출력에만 신경쓸 수 있다.
    4. 데이터베이스를 하드에 설치하는 방법도 있지만 무료 호스팅을 받는 걸 가장 많이 쓴다. (512MB 정도)
    5. 순서
        1. 회원가입
        2. Shared 선택
        3. Google cloud, seoul
        4. ID, PW 입력
        5. DB user 추가
        6. Network Access IP Address 추가
        7. Database → Connect → Connect your application
        8. 어플리케이션 코드를 server.js에 추가
            
            ```jsx
            const MongoClient = require('mongodb').MongoClient;
            ```
            
        9. 위에 코드를 사용하기 위해선 MongoDB 라이브러리 설치해야함
            
            ```powershell
            npm install mongodb
            ```
            
        10. 추가 코드 입력
            
            ```jsx
            MongoClient.connect(
              'URL', // 어플리케이션 코드입력, <password>에는 본인 pw 입력
              function (err, client) {
            		app.listen(8080, function () {
                  console.log('listening on 8080');
                });
            	}
            );
            ```
            
        11. 작성 후 nodemon server.js 실행