# Next.js 시작하기

## create-next-app 설치하기

```bash
npm install -g create-next-app
```

설치가 완료되었다면 다음 명령어로 설치가 잘 되었는지 확인

```bash
create-next-app --version
```

## Next.js 프로젝트 생성하기

```bash
npx create-next-app 프로젝트명
```

이렇게 코드를 입력하면 Next.js 프로젝트가 생성되고 생성된 폴더와 파일은 다음과 같다.

- public: create-next-app으로 개발할 Next.js 프로젝트의 Static 파일들(이미지 파일 등)이 저장된 폴더
- pages: Next.js 프로젝트에서 화면에 표시될 페이지들을 저장하는 폴더
- pages/index.js: index페이지(/)에 해당하는 파일
- pages/\_app.js: 모든 페이지에 공통으로 사용되는 컴포넌트이다. 모든 페이지에 레이아웃 등을 설정할 때 사용한다.
- styles: 스타일 파일(css)을 저장하는데 사용하는 폴더
- styles/globals.css: 전체 페이지에 적용되는 스타일 파일
- styles/Home.module.css: index.js 파일에서 사용하는 스타일 파일
- .eslintrc.json: 정적 코드 분석 툴인 EsLint 설정에 관한 파일
- next.config.js: Next.js 프로젝트 설정에 관한 파일
- package.json: 개발에 필요한 라이브러리를 관리하는 파일

## 프로젝트 실행하기

create-next-app으로 생성한 Next.js 프로젝트의 package.json파일을 열면 다음과 같은 내용을 확인할 수 있다.

```bash
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
},
```

다음은 create-next-app으로 생성한 Next.js 프로젝트에서 사용 가능한 스크립트이다.

- dev: Next.js 프로젝트를 개발 모드(development mode)로 실행한다.
- build: Next.js 프로젝트를 production mode로 빌드한다.
- start: Next.js 프로젝트를 production mode로 실행한다.
- lint: Next.js에 기본 설정된 EsLint 설정을 사용하여 EsLint를 실행한다.

새롭게 생성한 Next.js 프로젝트를 실행하기 위해서 다음 명령어를 실행한다.

```bash
npm run dev
```
