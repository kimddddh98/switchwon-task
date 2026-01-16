# Switchwon-task

환율 조회 및 환전 요청을 위한 프론트엔드 과제 프로젝트입니다.

---

## 기술 스택

- **React**
- **TypeScript**
- **vite** 
- **react-router-dom** 
- **Tanstack-Query**
- **zustand** 
- **react-hook-form** 
- **Tailwind CSS** 

---

## 프로젝트 구조

```txt
src/
 ├ api/                    # API 요청 및 API 타입 정의
 │  ├ types/               # BaseResponse global 선언
 │  └ axios.ts             # Axios 인스턴스 설정 및 인터셉터
 ├ assets/                 
 │  ├ fonts/               # 폰트 파일
 │  ├ icons/               # SVG 아이콘
 │  └ images/              # 이미지 파일
 ├ components/             # 컴포넌트
 ├ const/                  # 관련 상수 정의
 │  └ query-key/           # QueryKey 정의
 ├ hooks/                  
 │  ├ mutations/           # Mutation 훅
 │  ├ queries/             # Query 훅
 ├ pages/                  # 페이지 
 ├ routes/                 # 라우터
 │  ├ ProtectedRoute.tsx   # 로그인 사용자만 접근 가능한 라우트
 │  └ PublicRoute.tsx      # 공개 라우트
 ├ store/                  # zustand 스토어
 ├ styles/                 # 스타일
 ├ utiles/                 # 유틸 함수
 ├ global.css              # 전역 css
 ├ main.tsx               
```

---

## 주요 기능

- **인증 시스템**: JWT 기반 토큰 인증
- **실시간 환율 조회**: 환율 정보 조회 및 환전
- **환전 내역 조회**: 환전 주문 내역 확인
- **지갑 정보**: 보유 통화 및 잔액 조회
- **토스트 알림**: 사용자 피드백 제공
- **반응형 UI**: Tailwind CSS 기반 반응형 웹 UI

---

## 시작하기

```env
VITE_API_PROXY_URL=your_proxy_api_base_url
VITE_WEB_BASE_URL=your_web_base_url (/api)
VITE_API_BASE_URL=your_api_base_url  (http://localhost:3000)
```

AND

```bash
npm run install
npm run dev
```
---

## 라우팅

- `/` - 홈(Home.tsx) (인증 상태에 따라 리다이렉트)

### 공개 라우트
- `/sign-in` - 로그인 페이지(SignIn.tsx)

### 인증 라우트
- `/exchange` - 환율 조회 및 환전 페이지(Exchange.tsx)
- `/exchange-list` - 환전 내역 페이지 (ExchangeList.tsx)

---

## 주요 구현 사항

### 로그인 및 인증
- **JWT 토큰 기반 인증**: localStorage를 활용한 토큰 관리
- **라우트 보호**: ProtectedRoute 컴포넌트를 통한 인증된 사용자만 접근 가능
- **자동 로그아웃**: 401 에러 발생 시 자동으로 로그인 페이지로 리다이렉트
- **Axios 인터셉터**: 요청 시 자동 토큰 주입, 401 로그아웃 처리 ,응답 에러 타입 공통화 


### 상태 관리
- **서버 상태**: Tanstack Query를 사용하여 서버 데이터 캐싱 및 쿼리 키 정의
  - 환율 정보 조회 시 refetchInterval를 사용하여 1분 주기 데이터 갱신
  - setQueryData를 활용하여 환전 견적 요청 시 적용된 환율과 현재 화면에 보여지는 환율이 다르다면 적용된 환율로 변경
  - 환전 주문 시 최신 환율ID를 가져오기 위해 환전 주문 요청 전 fetchQuery 및 currency 에 맞는 환율 ID를 확인
- **클라이언트 상태**: Zustand를 활용한 전역 상태 관리
  - 토스트 알림 상태 관리
  - 이외 구현 내용 중 별도의 상태 관리가 필요해 보이지 않다고 판단하여 useState 로 대체

### API 통신
- **타입 정의**: BaseResponse, EndPoint 를 정의하여 API 관련 타입 정의
- **에러 코드 관리**: 에러 코드 별 상수 정의
- **UI 처리**: 전역 토스트 컴포넌트를 활용하여 API 성공/실패 후 필요 시 메시지 표시
- **CORS**: 백엔드 서버의 CORS 비허용으로 인해 vite proxy 적용

- **검증**:react-hook-form을 활용한 입력 필드 검증
  - **ex**: 환전 요청 시 입력 폼에 소숫점 2자리 제한 및 0원 입력 후 API 요청 시 에러 토스트 알림 표시 

### 반응형 웹
-  1280px, 768px을 분기 처리하여 반응형 웹 구현
