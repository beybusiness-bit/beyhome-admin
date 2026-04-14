# Home Admin 프로젝트 구조

```
home-admin/
├── 📄 index.html                    # HTML 진입점
├── 📄 package.json                  # 프로젝트 의존성 및 스크립트
├── 📄 vite.config.js                # Vite 설정
├── 📄 tailwind.config.js            # Tailwind CSS 설정
├── 📄 postcss.config.js             # PostCSS 설정
├── 📄 vercel.json                   # Vercel 배포 설정
├── 📄 .gitignore                    # Git 무시 파일 목록
├── 📄 .env.example                  # 환경 변수 예시
├── 📄 README.md                     # 프로젝트 개요
├── 📄 GOOGLE_OAUTH_SETUP.md        # Google OAuth 설정 가이드
├── 📄 STEP2_COMPLETE.md            # Step 2 완료 요약
│
├── src/
│   ├── 📄 main.jsx                  # React 앱 진입점
│   ├── 📄 App.jsx                   # 라우터 설정
│   ├── 📄 index.css                 # 글로벌 CSS (Tailwind)
│   │
│   ├── 🔐 auth/                     # 인증 관련
│   │   ├── AuthContext.jsx          # 인증 상태 관리 (Context API)
│   │   └── LoginPage.jsx            # Google OAuth 로그인 페이지
│   │
│   ├── 🧩 components/               # 공통 컴포넌트
│   │   ├── Layout.jsx               # 메인 레이아웃 (사이드바 + 콘텐츠)
│   │   └── Sidebar.jsx              # 사이드바 네비게이션
│   │
│   ├── 📱 pages/                    # 페이지 컴포넌트
│   │   ├── SiteList.jsx             # 사이트 목록 (멀티 사이트 선택)
│   │   ├── Dashboard.jsx            # 대시보드 (통계)
│   │   ├── PageManager.jsx          # 페이지 관리 (카테고리 + 페이지 목록)
│   │   ├── BlockEditor.jsx          # 블록 에디터 (핵심 기능)
│   │   ├── MenuSettings.jsx         # 메뉴 설정 (네비게이션)
│   │   ├── LayoutSettings.jsx       # 레이아웃 설정 (헤더/푸터)
│   │   ├── DesignSettings.jsx       # 기본 디자인 설정 (색상/폰트)
│   │   ├── SiteSettings.jsx         # 사이트 기본 설정 (정보/부가버튼)
│   │   ├── ImageLibrary.jsx         # 이미지 라이브러리
│   │   └── Deploy.jsx               # 배포 관리
│   │
│   └── 🛠️ utils/                    # 유틸리티
│       ├── config.js                # 설정 (OAuth, 화이트리스트)
│       └── github.js                # GitHub API 헬퍼 (Step 9)
│
└── 📦 node_modules/                 # 의존성 패키지 (npm install 후 생성)
```

## 주요 파일 설명

### 📄 루트 설정 파일

#### `package.json`
- 프로젝트 메타데이터
- 의존성 관리 (React, React Router, Tailwind, Lucide)
- 스크립트: `dev`, `build`, `preview`

#### `vite.config.js`
- Vite 빌드 설정
- React 플러그인
- 개발 서버 포트 (5173)

#### `vercel.json`
- SPA 라우팅 지원 (모든 경로를 index.html로 리다이렉트)
- 정적 자산 캐싱 설정

### 🔐 인증 (auth/)

#### `AuthContext.jsx`
- Context API 기반 전역 인증 상태 관리
- 로그인/로그아웃 함수
- localStorage를 사용한 세션 지속성
- 페이지 새로고침 시 자동 복원

#### `LoginPage.jsx`
- Google OAuth 2.0 로그인 UI
- Google Identity Services 스크립트 로드
- JWT 토큰 디코딩 및 사용자 정보 추출
- 화이트리스트 검증
- 개발 모드 로그인 (DEV only)

### 🧩 공통 컴포넌트 (components/)

#### `Layout.jsx`
- 메인 레이아웃 래퍼
- 인증 확인 (미로그인 시 리다이렉트)
- 사이드바 + 콘텐츠 영역

#### `Sidebar.jsx`
- 왼쪽 고정 사이드바
- 사이트 이름 표시
- 메뉴 네비게이션
- 사이트 목록으로 돌아가기 버튼

### 📱 페이지 컴포넌트 (pages/)

#### `SiteList.jsx`
- 멀티 사이트 목록
- 사이트 선택 및 관리
- 새 사이트 추가

#### `Dashboard.jsx`
- 사이트 통계 대시보드
- 페이지 수, 이미지 수, 최근 배포 등

#### `PageManager.jsx`
- 페이지 목록 관리
- 카테고리(대분류) 구조
- 시스템 페이지 (로그인, 마이페이지, 이용약관 등)
- 드래그 앤 드롭 순서 변경

#### `BlockEditor.jsx`
- **핵심 기능**: 블록 기반 페이지 에디터
- 왼쪽 사이드바: 페이지 트리 (다른 페이지로 이동)
- 중앙: 블록 편집 영역
- 오른쪽 사이드바: 페이지 설정 (제목, SEO)
- 미저장 경고 시스템
- 데스크탑/모바일 미리보기 전환

#### `MenuSettings.jsx`
- 네비게이션 메뉴 설정
- 메뉴 항목 추가/수정/삭제
- 중첩 메뉴 (2단계)
- 드래그 앤 드롭 순서 변경

#### `LayoutSettings.jsx`
- 헤더 설정: 높이, 고정 옵션
- 푸터 설정: 회사 정보
- 소셜미디어 채널: 다중 추가, 플랫폼 선택, URL

#### `DesignSettings.jsx`
- 글로벌 디자인 설정
- 색상: Primary, Secondary, 배경, 텍스트
- 폰트: 본문, 제목, 크기
- 테두리 둥글기
- 실시간 미리보기

#### `SiteSettings.jsx`
- 사이트 기본 정보 (이름, URL, 설명)
- 화면 하단 부가 버튼:
  - 좌하단/우하단 위치별 설정
  - 스크롤 버튼: 위/아래, 디자인, 크기, 여백
  - 외부 링크: 이미지, URL, 크기, 여백

#### `ImageLibrary.jsx`
- 이미지 업로드 및 관리
- 저장 용량 표시 (800MB 경고, 950MB 차단)
- 폴더 구조 지원
- GitHub 저장소 연동 (assets/images/)

#### `Deploy.jsx`
- GitHub Pages 배포
- 배포 이력 (배포자 정보 포함)
- 배포 전 체크리스트
- 성공/실패 상태 표시

### 🛠️ 유틸리티 (utils/)

#### `config.js`
- Google Client ID (환경 변수)
- 화이트리스트 (도메인, 이메일)
- API Base URL
- GitHub 설정

#### `github.js`
- GitHub API 헬퍼 함수 (Step 9에서 구현)
- 파일 업로드/다운로드/삭제
- 배포 자동화

## 데이터 흐름

```
로그인 (LoginPage)
  ↓
Google OAuth 인증
  ↓
화이트리스트 검증
  ↓
AuthContext (세션 저장)
  ↓
SiteList (사이트 선택)
  ↓
Layout + Sidebar (사이트별 관리)
  ↓
각 페이지 (Dashboard, PageManager, BlockEditor 등)
  ↓
GitHub API (저장 및 배포)
```

## 상태 관리

### Context API
- **AuthContext**: 인증 상태 (user, isAuthenticated)
- 추후 추가 예정: SiteContext (선택된 사이트), DataContext (페이지 데이터)

### Local Storage
- `user`: 로그인 사용자 정보
- 추후 추가 예정: 임시 저장 데이터, 에디터 상태

## 라우팅 구조

```
/login                     # 로그인 페이지
/sites                     # 사이트 목록
/                          # Layout 래퍼
  ├── /dashboard           # 대시보드
  ├── /pages               # 페이지 관리
  ├── /pages/:id/edit      # 블록 에디터
  ├── /menu                # 메뉴 설정
  ├── /layout              # 레이아웃 설정
  ├── /design              # 디자인 설정
  ├── /site-settings       # 사이트 설정
  ├── /images              # 이미지 라이브러리
  └── /deploy              # 배포
```

## 스타일링

- **Tailwind CSS**: 유틸리티 기반 CSS
- **Lucide React**: 아이콘 라이브러리
- **반응형**: 모바일 우선 디자인

## 빌드 및 배포

### 개발
```bash
npm run dev          # 개발 서버 (http://localhost:5173)
```

### 프로덕션
```bash
npm run build        # 빌드 (dist/ 폴더 생성)
npm run preview      # 프로덕션 미리보기
```

### Vercel 배포
- `vercel.json` 설정으로 자동 SPA 라우팅
- 환경 변수: `VITE_GOOGLE_CLIENT_ID`
- 자동 HTTPS, CDN 캐싱

---

**현재 상태**: Step 2 완료 (Google OAuth + 화이트리스트)  
**다음 단계**: Step 7 블록 에디터 구현 (핵심 기능)
