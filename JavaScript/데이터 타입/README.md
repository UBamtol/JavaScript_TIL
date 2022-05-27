# 데이터 타입

데이터 타입(줄여서 “타입”이라고도 한다)은 값의 종류를 말한다. 자바스크립트의 모든 값은 데이터 타입을 갖는다. 자바스크립트(ES6)는 7개의 데이터 타입을 제공한다. 7개의 데이터 타입은 원시타입과 객체 타입으로 분류할 수 있다.

![image](https://user-images.githubusercontent.com/98325285/170677433-bb370d39-2398-4342-97a1-acc8f5770522.png)
ex) 1과 ‘1’은 전혀 다른 값이다. 1 = number, ‘1’ = string

## 숫자 타입

C나 Java의 경우, 정수와 실수를 구분해서 int, long, float, double 등과 같은 다양한 숫자 타입을 제공한다. 하지만 자바스크립트는 독특하게 하나의 숫자 타입만 제공한다.

```jsx
// 모두 숫자 타입이다.
var integer = 10; // 정수
var double = 10.12; // 실수
var negative = -20; // 음의 정수
```

정수, 실수, 2진수, 8진수 16진수 리터를은 모두 메모리에 배정밀도 64비트 부동 소수점 형식의 2진수로 저장된다. 자바스크립트는 2진수, 8진수, 16진수를 표혀하기 위한 데이터 타입을 제공하지 않기 때문에 이들 값을 참조하면 모두 10진수로 해석된다.

```jsx
var binary = 0b01000001; // 2진수
var octal = 0o101; // 8진수
var hex = 0x41; // 16진수

// 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); //65
console.log(octal); //65
console.log(hex); //65
console.log(binary === octal); // true
console.log(octal === hex); // true
```

자바스크립트의 숫자는 타입은 정수만을 위한 타입이 없고 모든 수를 실수로 처리한다. 이는 정수로 표시된다 해도 사실은 실수라는 것을 의미한다. 따라서 정수로 표시되는 수끼리 나누더라도 실수가 나올 수 있다.

```jsx
// 숫자 타입은 모든 실수로 처리된다.
console.log(1 === 1.0); // true
console.log(4 / 2); // 2
console.log(3 / 2); // 1.5
```

숫자 타입은 추가적으로 세 가지 특별한 값도 표현할 수 있다.

Infinity: 양의 무한대

-Infinity: 음의 무한대

NaN: 산술 연산 불가(not-a-number)

```jsx
// 숫자 타입의 세 가지 특별한 값
console.log(10 / 0); // Infinity
console.log(10 / -0); // -Infinity
console.log(1 * 'String'); // NaN
```

자바스크립트는 대소문자를 구별하므로 NaN을 NAN, Nan, nan과 같이 표현하면 에러가 발생한다.

자바스크립트 엔진은 NAN, Nan, nan을 값이 아닌 식별자로 해석한다.

```jsx
// 자바스크립트는 대소문자를 구별한다.
var x = nan; // ReferenceError: nan is not defined
```

## 문자열 타입

문자열 타입은 텍스트 데이터를 나타내는 데 사용한다. 문자열은 0개 이상의 16비트 유니코드 문자의 집합으로 전 세계 대부분의 문자를 표현할 수 있다.

**문자열은 작음따옴표(’ ‘), 큰따옴표(” “) 또는 백틱(` `)으로 텍스트를 감싼다. 자바스크립트에서 가장 일반적인 표기법은 작은따옴표를 사용하는 것이다.**

```jsx
// 문자열 타입
var string;
string = '문자열'; // 작은따옴표
string = '문자열'; // 큰따옴표
string = `문자열`; // 백틱(ES6)
string = '작은따옴표로 감싼 문자열 내의 "큰따옴표"는 문자열로 인식된다.';
string = "큰따옴표로 감싼 문자열 내의 '작은따옴표'는 문자열로 인식된다.";
```

다른 타입의 값과 달리 문자열을 따옴표로 감싸는 이유는 키워드나 식별가 같은 토큰과 구분하기 위해서다. 만약 문자열을 따옴표로 감싸지 않으면 자바스크립트 엔진은 키워드나 식별자 같은 토큰으로 인식한다.

```jsx
// 따옴표로 감싸지 않은 문자를 식별자로 인식한다.
var string = hello; // ReferenceError: hello is not defined
```

만약 따옴표로 문자열을 감싸지 않는다면 스페이스와 같은 공백 문자도 포함시킬 수 없다.

C는 문자열 타입을 제공하지 않고 문자의 배열로 문자열을 표현하고, 자바는 문자열을 객체로 표현한다. 그러나 자바스크립트의 문자열은 원시타입임, 변경 불가능한 값(Immutable value)이다. 이것은 문자열이 생성되면 그 문자열을 변경할 수 없다는 것을 의미한다.

```jsx
var str = 'Hello';
str = 'world';
```

첫 번째 문이 실행되면 문자열 ‘Hello’가 생성되고 식별자 str은 문자열 ‘Hello’가 저장된 메모리 공간의 첫 번째 메모리 셀 주소를 가리킨다. 그리고 두 번째 문이 실행되면 이전에 생성된 문자열 ‘Hello’를 수정하는 것이 아니라 새로운 문자열 ‘world’를 메모리에 생성하고 식별자 str은 이것을 가리킨다. 이때 문자열 ‘Hello’와 ‘world’는 모두 메모리에 존재한다. 식별자 str은 문자열 ‘Hello’를 가리키고 있다가 문자열 ‘world’를 가리키도록 변경되었을 뿐이다.

## 템플릿 리터럴

ES6부터 템플릿 리터럴이라고 하는 새로운 문자열 표기법이 도입되었다. 템플릿 리터럴은 멀티라인 문자열, 표현식 삽입, 태그드 템플릿 등 편리한 문자열 처리 기능을 제공한다. 템플릿 리터럴은 런타임에 일반 문자열로 변환되어 처리된다.

템플릿 리터럴은 작은따옴표나 큰따옴표 대신 백틱(` `)을 사용해 표현한다.

```jsx
var template = `Template literal`;
console.log(template); // Template literal
```

### 멀티라인 문자열

일반 문자열 내에서는 줄바꿈(개행)이 허용되지 않는다.

```jsx
var str = 'Hello
world.'; // SyntaxError: Invalid or unexpected token
```

따라서 일반 문자열 내에서 줄바꿈 등의 공백을 표현하려면 백슬래시(\)로 시작하는 이스케이프 시퀸스를 사용해야 한다.

![image](https://user-images.githubusercontent.com/98325285/170677512-cf499d1c-4d03-4d07-9d38-9d11bad12af3.png)

### 표현식 삽입

문자열은 문자열 연산자 +를 사용해 연결할 수 있다. +연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작한다. 그 외의 경우는 덧셈 연산자로 동작한다.

```jsx
var first = 'In-jun';
var last = 'Yu';

// ES5: 문자열 연결
console.log('My name is ' + first + ' ' + last + '.'); // My name is In-jun Yu.
```

템플릿 리터럴 내에서는 표현식 삽입을 통해 간단히 문자열을 삽입할 수 있다.

```jsx
var first = 'In-jun';
var last = 'Yu';

// ES6: 표현식 삽입
console.log(`My name is ${first} ${last}.`); // My name is In-jun Yu.
```

표현식으로 삽입하려면 ${ }으로 표현식을 감싼다. 이때 표현식의 평가 결과가 문자열이 아니더라도 문자열로 타입이 강제 변환되어 삽입된다.

## 불리언 타입

불리언 타입의 값은 논리적 참, 거짓을 나타내는 true와 false뿐이다.

```jsx
var foo = true;
console.log(foo); // true

foo = false;
console.log(foo); // false
```

## undefined 타입

undefined 타입의 값은 undefined가 유일하다.

var 키워드로 선언된 변수는 암묵적으로 undefined로 초기화된다. 변수 선언에 의해 확보된 메모리 공간을 처음 할당이 이뤄질 때까지 빈 상태로 내버려두지 않고 자바스크립트 엔진이 undefined로 초기화한다.

```jsx
var foo;
console.log(foo); // undefined
```

변수에 값이 없다는 것을 명시하고 싶을 때는 null을 할당하면 된다.
