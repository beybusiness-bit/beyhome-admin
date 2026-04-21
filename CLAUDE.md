# lmp작업실 홈페이지 + 멀티 사이트 관리 어드민

## 📌 1. 프로젝트 개요

### 프로젝트 목적

1. **1차 목표**: lmp작업실 홈페이지를 우피(Oopy) 유료 서비스에서 **무료 자가 운영**으로 전환
2. **2차 목표**: lmp뿐만 아니라 **여러 사이트를 생성·관리할 수 있는 멀티 사이트 관리 어드민** 구축

### 프로젝트 구성 — 두 개의 저장소

**① lmp작업실 홈페이지** (첫 번째 사이트)
- 저장소: `beybusiness-bit/lmp-website` (Private)
- 로컬 작업 폴더: `~/Downloads/lmp-website`
- 배포 URL: `lmp-website.vercel.app`
- 커스텀 도메인: **lazymaxpotential.kr**
- 호스팅: **Vercel**
- 기술 스택: HTML/CSS/JS 정적 사이트
- 결제: 토스페이먼츠 + Vercel Serverless Function
- 회원 인증(예정): Firebase Auth
- 현재 상태: **Phase 3.5 완료** (배포 환경 + 결제 시스템 세팅)

**② 멀티 사이트 관리 어드민** (이 저장소)
- 저장소: `beybusiness-bit/beyhome-admin`
- 로컬 작업 폴더: `~/Downloads/beyhome-admin` (권장 → `~/projects/` 이동 권장, 샌드박스 이슈)
- 배포 URL: **https://beybusiness-bit.github.io/beyhome-admin**
- 호스팅: **GitHub Pages (main 브랜치 루트)**
- 기술 스택: **단일 HTML 파일** (Vanilla JS, ~5000줄)
- 인증: Google OAuth 2.0 (화이트리스트)
- 기능: 여러 사이트 생성/관리, 블록 에디터, GitHub API 연동(예정)
- 현재 상태: **Phase 4 완료** (단일 HTML 전환 및 UI/UX 개선 완료)

---

## 🔄 2. 중요 변경사항 히스토리

### 2026-04-15: React → 단일 HTML 전환 결정

**배경**:
- 원래 기술 스택: Vite + React 18
- Phase 5 진행 중 Google OAuth가 배포 환경에서 **CORS 에러 발생**
- Vercel·Netlify 양쪽에서 모두 작동 불가, 12시간 디버깅 끝에 모든 방법 실패

**결정**: React 전면 포기, 단일 HTML 파일로 재구현

**근거**:
- 선례: lmp 프로그램 관리자 앱 (단일 HTML 6000줄, Google OAuth 완벽 작동)
- "**검증된 선례 > 트렌드**"
- 포스트모템 완료, webapp-builder 스킬에 반영

### 2026-04-17: 단일 HTML Phase 4 완료

- React Phase 4 기능 전체를 Vanilla JS로 재구현 완료 (축약/삭제 없이)
- Google Identity Services (GIS) 방식으로 OAuth 적용
- GitHub Pages 배포 성공
- UI/UX 개선 완료 (사이트 선택 화면, 사이드바 토글, 4탭 설정, 모바일 반응형)

### 2026-04-20~21: 배포 인프라 정리 + CLAUDE.md 맥락 복원 (Claude Code 이행)

이 프로젝트는 원래 **claude.ai Projects**에서 진행되다가 이 시점에 **Claude Code CLI**로 작업 환경을 옮김. 아래는 그 과정에서 일어난 일들.

**(1) 저장소 정리 & 깃헙 재연결**
- 기존 `gh-pages` 분리 배포 방식 폐기 — 실제로는 사용된 적이 없었음 (CLAUDE.md에만 기재되어 있던 유령 설정)
- `main` 브랜치 루트에서 GitHub Pages 서비스로 단순화 (다른 웹앱들과 동일한 배포 패턴)
- 저장소 정리: React 잔재 파일(`package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `vercel.json`, `README.md`, `STEP2_COMPLETE.md`, `PROJECT_STRUCTURE.md`, `GOOGLE_OAUTH_SETUP.md`) 삭제 후 `main`에 푸시
- force push로 리모트의 웹UI 업로드 히스토리("Add files via upload" ×4)를 덮어쓰고 로컬 기준 히스토리 확정 (내용은 동일)
- CLAUDE.md를 repo에 포함하여 다른 컴퓨터에서도 지침이 따라가도록

**(2) CLAUDE.md 맥락 복원**
- Claude Code로 이행하면서 가져온 CLAUDE.md가 **어드민 단독 관점으로 축약**되어 있음이 드러남. 사용자님이 claude.ai Projects 시절의 전체 프로젝트 지침을 다시 붙여주셨고, 그걸 기반으로 이 문서 전반을 재구성.
- 되살아난 핵심 맥락:
  - 이 프로젝트는 **lmp작업실 홈페이지 + 멀티 사이트 관리 어드민** 두 저장소가 **짝을 이루는 프로젝트** (어드민 단독 앱이 아니라, lmp를 관리하기 위한 어드민)
  - Phase 1~3.5는 lmp홈페이지 작업, Phase 4부터 어드민 작업, Phase 5는 둘 사이 연동, Phase 6/6.5는 회원 시스템/게시판
  - 블록 에디터(7종), 이미지 라이브러리, 배포 페이지, 대시보드의 상세 기능 스펙
  - 디자인 방침(컬러/폰트/Z세대 Y2K 컨셉), 헤더/푸터/플로팅 버튼 구조
  - 개발 규칙(복수 선택 UI 패턴, 확인 창, 미저장 경고, **lmp는 항상 소문자**)

**(3) macOS TCC 권한 이슈 발견** ⚠️ 중요
- Claude Code CLI는 macOS의 TCC(Transparency, Consent, Control) 보호 때문에 `~/Downloads/` 하위 파일을 **쓰기 못함**. 읽기/디렉토리 탐색도 중간에 차단됨.
- `dangerouslyDisableSandbox`는 Claude Code 내부 샌드박스만 풀기 때문에 macOS TCC 위로는 못 올라감.
- 사용자 Terminal.app도 **권한 부여 전에 실행된 프로세스는 권한 미반영** — 터미널 완전 종료(Cmd+Q) 후 재실행해야 반영됨.
- **이 세션 막바지에 터미널 재시작이 필요해져 세션 종료** (아래 "미결 과제" 참조)

---

## ⏸️ 2-1. 현재 미결 상태 (2026-04-21 세션 종료 시점)

> 다음 세션에서 가장 먼저 확인할 것.

### 🔴 이 세션에서 시도했지만 완결되지 않은 것

**① 복원된 CLAUDE.md의 repo 푸시 — 미완료**
- 현재 파일: `/Users/bey/projects/beyhome-admin/CLAUDE.md` (Claude Code 작업 폴더, 이 문서 — 최신)
- Repo 쪽: `~/Downloads/beyhome-admin/CLAUDE.md` — **이전 축약본이 여전히 커밋되어 있음** (리모트 HEAD: `472c839`)
- 차단 원인: macOS TCC가 Claude Code의 `~/Downloads` 쓰기를 막아서 sync 불가
- 다음 세션에서 해야 할 것:
  1. 사용자가 **새로 시작한 Terminal.app** 에서 아래 실행:
     ```
     cp -f /Users/bey/projects/beyhome-admin/CLAUDE.md ~/Downloads/beyhome-admin/CLAUDE.md
     cd ~/Downloads/beyhome-admin
     git add CLAUDE.md && git commit -m "docs: restore full project context" && git push origin main
     ```
  2. 또는 repo를 Downloads 밖(`~/projects/beyhome-admin`)으로 이동한 뒤 동일 절차.

**② 사용자님의 이번 세션 패치 피드백 — 대기 중**
- 사용자가 명시적으로 말씀하심: "이번에 너가 해준 패치의 피드백도 다음 세션에서 할 거야"
- 피드백 대상:
  - CLAUDE.md를 재정리한 내용 (섹션 구성, 설명의 적절성, 빠진 게 없는지)
  - 배포 방식 전환(`gh-pages` → `main`) 결정과 설명
  - 저장소 정리(React 잔재 삭제) 결정
  - macOS 권한 이슈 대응 제안
- 다음 세션에서는 **피드백 요청이 먼저 올 가능성 높음** — 받은 피드백을 CLAUDE.md에 반영할 것.

### 🟡 사용자 액션이 필요한 검증/확정 항목 (이 세션에서도 요청했지만 아직 확인 안 됨)

**③ GitHub Pages Source 설정 확정**
- Settings → Pages → Branch가 `main` / `/ (root)` 로 되어있는지 사용자가 확인 필요.
- 현재 실제 배포 URL(https://beybusiness-bit.github.io/beyhome-admin)이 main 브랜치 내용을 반영하는지 육안 확인.

**④ Google OAuth Client ID 단일화** ⚠️
- 두 값이 병존:
  - `27055656717-pgddfisd182i8jqlg574v7vrbkff2b2b.apps.googleusercontent.com` (`.env.save`, `.envt` 및 이전 claude.ai Projects 지침)
  - `27055656717-ed149rm5e49uhd7gaoicadd62fbe6hoh.apps.googleusercontent.com` (이전 축약본 CLAUDE.md)
- `index.html` 내 `GOOGLE_CLIENT_ID` 상수가 무엇인지 확인 필요 — **Claude Code가 권한 문제로 `index.html` 내용을 읽지 못해 확인 불가였음**.
- 다음 세션에서 repo를 이동하거나 권한 해결되면 즉시 grep해서 이 문서에 단일 값으로 확정.

**⑤ Phase 4 실환경 검증 3종** (CLAUDE.md 원본부터 남아있던 숙제)
- lmp작업실 홈페이지 실제 배포 테스트 (어드민에서 `beybusiness-bit/lmp-website` repo로 배포까지 해보기, Personal Access Token 발급 필요)
- 커스텀 도메인(lazymaxpotential.kr) 연결 테스트
- 모든 브라우저(Chrome, Edge, Safari, Firefox)에서 로그인 테스트

### 🟢 Phase 5 시작 전 준비 (다음 세션 본격 작업 대상)

**⑥ Google Sheets API 환경 세팅**
- Google Cloud Console에서 Sheets API 활성화
- OAuth 동의 화면에 Sheets API 범위 추가 (기존 OAuth 클라이언트 재사용)
- Spreadsheet `1QHzz73LzPSGWCwl6SN7TPaxxdyqnkIxzlq9TQpGopag` 에 어드민용 시트 4개 구조 최종 확정 (섹션 9 참조)
- GAS(Google Apps Script) 웹훅 스크립트 작성 (쓰기 경로)

**⑦ 어드민 코드에 Sheets 연동 붙이기**
- 현재: 모든 데이터가 `localStorage`에만 있음 (섹션 9 참조)
- 목표: 앱 시작 시 Sheets에서 로드 → 수정 시 Sheets에 저장 (또는 저장 버튼으로 일괄 sync)

### 🔵 장기 로드맵 (코드 미반영, 계획만 존재)

**⑧ 어드민에서 새 사이트 생성 기능** (CLAUDE.md 섹션 5에서 "추가 필요 기능"으로 명시)
- SiteList 페이지에 "새 사이트 만들기" 버튼
- 사이트명, GitHub 저장소, 템플릿 선택 후 초기 구조 자동 생성, `config.js` 자동 설정
- Phase 4에서 미구현 상태로 남은 항목

**⑨ Phase 6 — 회원 시스템 (Firebase Auth)**
- lmp홈페이지용, 닉네임 + 비밀번호
- 재방문 시 자동완성, 개인정보 수집·이용 동의

**⑩ Phase 6.5 — 게시판/갤러리/댓글**
- 게시판(CRUD), 갤러리(그리드/확대), 댓글(로그인 회원만)
- 신규 시트: `contents`, `comments`, `pages_config`

**⑪ 콘텐츠 채우기 + 뼈대 개선 1차**
- 뼈대 개선은 **모아서 한 번에** 하기로 규칙 정해져 있음 (섹션 7 개발 규칙)

**⑫ Phase 7 — 이후 관리 방법 안내**

---

## 📋 3. 전체 프로젝트 진행 단계

### lmp작업실 홈페이지 (사이트)

- [x] **Phase 1** — 사이트 구조 설계 및 승인 ✅
- [x] **Phase 2** — 사이트 코딩 (정적 사이트 빈 집) ✅
- [x] **Phase 3** — 배포 환경 세팅 (GitHub + Vercel + 도메인 연결) ✅
- [x] **Phase 3.5** — 결제 시스템 세팅 (토스페이먼츠 + Vercel Function) ✅

### 멀티 사이트 관리 어드민

- [x] **Phase 4** — 어드민 웹앱 제작 ✅
  - React 프로토타입 완성 → 폐기 (OAuth CORS)
  - 단일 HTML 재구현 완료
  - UI/UX 개선 완료 (사이트 선택, 사이드바 토글, 4탭 설정, 모바일 반응형)
  - GitHub Pages 배포 완료
- [ ] **Phase 5** — 홈페이지 ↔ 어드민 연동 🔲 **← 다음 단계**
  - Google Sheets API 연동
  - 페이지/메뉴/설정 데이터 저장/불러오기 (현재는 localStorage만)
  - 앱 시작 시 데이터 자동 로드
  - GAS 웹훅 설정
- [ ] **Phase 6** — 회원 시스템 🔲
  - Firebase Auth
  - 닉네임 + 비밀번호
  - 재방문 시 자동완성
  - 개인정보 수집·이용 동의
- [ ] **Phase 6.5** — 게시판/갤러리/댓글 🔲
  - 게시판 (글 목록/상세/쓰기/수정/삭제)
  - 갤러리 (사진 그리드, 확대)
  - 댓글 (로그인 회원만)

### 콘텐츠 채우기 및 마무리

- [ ] 페이지 내용 채우기 + 뼈대 개선(1차)
- [ ] 어드민에서 새 사이트 추가 기능 (멀티 사이트 생성)
- [ ] **Phase 7** — 이후 관리 방법 안내

**현재 진행 상태**: **Phase 4 완료, Phase 5 시작 대기 중**

---

## 🌐 4. lmp작업실 홈페이지 명세

### 사이트 URL 구조

URL 경로(`/lazy`, `/max`, `/potential`)는 SEO 보호를 위해 유지.

**[게으르지만] — lmp를 소개해요** `/lazy`
- `/lazy/info` — lmp작업실 소개
- `/lazy/way-to-come` — 찾아오는 길
- `/lazy/lmpeople` — 작업실의 사람들

**[뭔가] — 공간과 커뮤니티** `/max`
- `/max/monthly-tenency` — 작업실 입주
- `/max/rental` — 공간대여
- `/max/jmgc` — 저스트모닝기지개클럽
- `/max/undone-gallery` — 안 한 거 전시회

**[저지를 인간] — 행사, 상점, 콘텐츠** `/potential`
- `/potential/events` — 작업실에서 벌어진 일들
- `/potential/gmbf` — 게을러서 못 열 뻔한 플리마켓
- `/potential/shop` — 상점
- `/potential/workwithus` — 작업실과 협업하려면?

**[보관 중 — 네비에 노출 안 됨]**
- `/max/tour` — 작업실 투어 신청 (숨김)
- `/potential/gmbs` — 게을러서 못 열 뻔한 상점 (숨김)

### 파일 구조

```
lmp-website/
├── index.html
├── hidden.html
├── login.html, mypage.html, cart.html
├── lazy/ (info.html, way-to-come.html, lmpeople.html)
├── max/ (monthly-tenency.html, rental.html, jmgc.html, undone-gallery.html, tour.html)
├── potential/ (events.html, gmbf.html, shop.html, workwithus.html, gmbs.html)
├── assets/
│   ├── css/main.css
│   ├── images/coming-soon.jpg
│   └── js/ (config.js, main.js)
├── api/confirm-payment.js
├── payment/ (success.html, fail.html)
└── vercel.json
```

### 배포 환경

- GitHub 저장소: `beybusiness-bit/lmp-website` (Private)
- Vercel 프로젝트: `lmp-website`
- 배포 URL: `lmp-website.vercel.app`
- 커스텀 도메인: **lazymaxpotential.kr**
- 로컬 작업 폴더: `~/Downloads/lmp-website`

### 준비중 모드 (현재 활성화 중)

- **일반 방문자**: `coming-soon.jpg`만 표시
- **관리자 접근**: `?preview=lmp관리자` 파라미터
- 한 번 접속하면 `localStorage`에 기억

### 결제 시스템 (현재 테스트 모드)

- **PG사**: 토스페이먼츠
- **클라이언트 키·시크릿 키**: Vercel 환경변수
- **결제 승인 함수**: `/api/confirm-payment.js`
- **실운영 전환 시**: GAS 웹훅 주석 풀기, 실키로 교체

### 디자인 방침

**컨셉**: 느슨하고 서툰 게으름뱅이 + 발랄하고 과감한 개성
- 한국 Z세대 감성의 Y2K — 레트로빈티지하고 톡톡 튀는 귀여움

**컬러 변수 기본값** (어드민에서 변경 가능):
- 배경 아이보리: `#FFF9F3`
- 배경 핑크: `#FFF0F8`
- 포인트 연두: `#BAFF47`
- 포인트 핑크: `#FF6B9D`
- 텍스트: `#2A2A2A`
- 푸터 배경: `#1E1E1E`

**원칙**:
- CSS에 디자인 의도 없음. 뼈대(레이아웃·변수)만 유지
- 실제 디자인은 어드민에서 설정
- 애니메이션 없음
- 폰트: **Pretendard** (CDN)
- **lmp는 항상 소문자**로만 표기

### 헤더 구조

- **PC**: [로고(좌)] | [메뉴(중앙)] | [로그인·장바구니(우)]
- **모바일**: [로고(좌)] | [햄버거(우)] → 사이드바 오픈
- **Sticky** (스크롤 시 상단 고정)
- **드롭다운**: hover 방식
- **로그인 상태**: 마이페이지로 자동 전환 (Firebase Auth)

**로고 옵션** (어드민에서 선택):
- 옵션 A: 텍스트 로고 (폰트/크기/색상 설정)
- 옵션 B: 이미지 로고 (업로드)
- 기본값: 텍스트 "lmp작업실"

### 푸터 명세

**배경**: 다크 차콜 (`#1E1E1E`)

**상단**:
- 로고, 슬로건
- SNS: 인스타그램, 카카오채널
- 이용약관, 개인정보처리방침 링크

**하단 — 법적 필수 정보**:
- 상호 및 대표자, 주소, 전화, 이메일
- 사업자등록번호, 통신판매업신고번호
- 개인정보관리책임자
- 호스팅제공자: Vercel Inc.

### 플로팅 버튼

- **카카오채널**: 우하단 고정 / URL: `http://pf.kakao.com/_xijvcG/chat`
- **스크롤 버튼**: 좌하단 고정, 1화면 이상 스크롤 시 등장, ↑ 맨 위 / ↓ 맨 아래

### 페이지 숨김 기능

- `config.js > pages > status: "active" | "hidden"`
- `hidden`: 네비게이션에서 제거 + 직접 접속 시 `/hidden.html` 리다이렉트
- 콘텐츠 파일 보존, `active`로 복원 가능

---

## 🎨 5. 멀티 사이트 관리 어드민 명세

### 현재 구현된 기능 (Phase 4 완료 — 단일 HTML)

#### Step 1-2: 프로젝트 초기 세팅 ✅
- Google OAuth 로그인 (화이트리스트 방식)
- 단일 HTML에서 탭 기반 라우팅 (`showTab()`)
- 자체 CSS (Tailwind 유사)

#### Step 3-5: 레이아웃 · 디자인 · 사이트 설정 ✅

**레이아웃 설정**:
- 헤더: 높이, 위치, 배경색, 로고, 메뉴 스타일, 드롭다운, 모바일 메뉴, 로그인 버튼
- 푸터: 높이, 위치, 색상, 레이아웃(1/2/3컬럼), 회사정보, 소셜미디어, 약관 링크

**기본 디자인 설정**:
- 색상: Primary, Secondary, Accent, Success, Warning, Error (HEX 색상 선택기)
- 타이포그래피: 본문/제목 폰트, 크기, 줄간격, 자간
- 레이아웃: 컨테이너 너비, 요소 간격, 테두리 둥글기, 카드 그림자
- 버튼: 모양, 크기
- 애니메이션: 활성화 여부, 속도
- **실시간 미리보기**

**사이트 기본 설정** (4개 탭으로 분리):
- **기본정보**: 사이트명, URL, 설명, 파비콘, 공개 여부, 언어, 타임존
- **배포 설정**: GitHub 연동(저장소·브랜치·Personal Access Token) + 커스텀 도메인
- **SEO**: 메타 타이틀/설명/키워드, OG 이미지, GA, Search Console, 네이버, robots.txt, 사이트맵
- **플로팅 버튼**: 우하단/좌하단 (스크롤/외부 링크/카카오채널)

#### Step 6: 페이지 관리 & 메뉴 설정 ✅ (UI만, 데이터 연동은 Phase 5에서)

**페이지 관리**:
- 페이지 목록 (카테고리별)
- 시스템 페이지 (로그인, 마이페이지, 장바구니, 약관)
- 노출 여부 토글
- 편집 버튼 → 블록 에디터 연결

**메뉴 설정**:
- 메뉴 항목 관리
- 드롭다운 서브메뉴

⚠️ 실제 페이지/메뉴 추가·삭제는 UI만 구현, 데이터 저장은 Phase 5에서 연동.

#### Step 7: 블록 에디터 ⭐ 핵심 ✅

**7가지 블록 타입**:
1. **텍스트** (H2, H3, 본문, 굵게/기울임)
2. **이미지** (URL 입력, 라이브러리 연동, Alt/캡션)
3. **구분선** (실선/긴점선/짧은점선, 색상, 두께)
4. **스페이서** (0-200px)
5. **버튼** (텍스트/URL, primary/secondary/outline, 새탭)
6. **임베드** (HTML 코드)
7. **컬럼** (2/3/4컬럼, 너비 조절, 순서 변경)
   - ⚠️ 컬럼 내부 블록 추가 불가 (재귀 구조 복잡)

**에디터 기능**:
- 블록 추가/편집/삭제(확인 창)/순서 변경(위/아래)
- 데스크탑/모바일 미리보기 전환
- 페이지 설정 사이드바 (제목, 슬러그, SEO, 블록 여백)
- 페이지 트리 사이드바
- 미저장 경고 (`beforeunload`)

#### Step 8: 이미지 라이브러리 ⭐ ✅

**핵심 기능**:
- 이미지 업로드 (multiple, 5MB 제한, 총 950MB 차단)
- 폴더 관리
- 검색 (파일명)
- **체크박스 선택**: 각 이미지마다 항상 표시, 복수 선택, 전체 선택
- 이미지 삭제 (개별/일괄, 확인 창)
- 용량 표시 (800MB 경고, 950MB 차단)

**뷰 설정**:
- 4가지 뷰 모드 (작게 6열, 보통 4열, 크게 3열, 목록)
- 페이지네이션 (20/50/100/200개씩)

#### Step 9: GitHub API 연동 + 배포 ⭐ ✅ (UI 완성, 실제 배포 로직은 Phase 6)

**GitHub API (내부 함수)**:
- `uploadToGitHub`, `fetchFromGitHub`, `deleteFromGitHub`
- `deployToGitHub` (HTML 생성, 이미지 업로드, 배포 로그)
- `getRepoInfo`
- Personal Access Token 기반 인증 (localStorage)

**배포 페이지**:
- GitHub 설정 확인 (저장소/토큰 없으면 경고)
- 연결된 저장소 표시
- 배포 버튼 (확인 창)
- 실시간 배포 로그 (터미널 스타일, 타임스탬프)
- 배포 성공/실패 메시지
- 배포 이력

#### Step 10: 대시보드 ✅

**통계 카드** (4개):
- 페이지 수, 이미지 수, 저장 용량, 최근 배포 시간

**빠른 작업** (4개 링크):
- 새 페이지 만들기, 이미지 업로드, 사이트 배포, 사이트 설정

**최근 활동**: 페이지 수정/생성, 이미지 업로드, 사이트 배포, 설정 변경

**시작 가이드**: 처음 사용자를 위한 5단계 안내

### 추가 필요 기능 (구현 대상)

**새 사이트 생성 기능** (현재 미구현):
- SiteList 페이지에서 "새 사이트 만들기" 버튼
- 사이트명, GitHub 저장소, 템플릿 선택
- 초기 구조 자동 생성
- `config.js` 자동 설정

### 사이드바/메인 UI 구조

```
로그인 화면
  ↓
사이트 선택 화면 (카드 그리드)
  ↓
어드민 화면
  ├─ 사이드바 (접기/펼치기 가능)
  │   ├─ 현재 사이트 정보
  │   ├─ 메뉴 (대시보드, 페이지 관리, 블록 에디터, 이미지, 디자인, 레이아웃, 설정, 배포)
  │   └─ 사이트 전환 / 로그아웃
  └─ 메인 컨텐츠 (탭 전환)
```

---

## 🎯 6. 단일 HTML 전환 원칙 (계속 지킬 것)

### 절대 원칙

**❌ 금지**:
- 기능 축약·삭제 금지
- 임의 수정 금지
- UI 간소화 금지
- React·Vue 등 외부 프레임워크 도입 금지

**✅ 필수**:
- React Phase 4의 **모든 기능** 그대로
- **모든 UI** 동일하게
- **모든 데이터 흐름** 보존
- Vanilla JavaScript만 사용
- 외부 라이브러리 최소화 (Google OAuth, Tailwind CDN 정도만)

### 구현 패턴 (lmp 스타일)

```javascript
// 전역 STATE 객체
const STATE = {
  user: null,
  sites: [],
  currentSite: null,
  pages: [],
  settings: {},
  images: []
};

// 탭 전환
function showTab(tabName) { ... }

// 렌더링 함수들
function renderDashboard() { ... }
function renderPageManager() { ... }
```

### 수정 방식

**작은 수정**: `Edit` 도구로 문자열 교체 (정확한 매칭 필요)

**큰 수정** (함수 전체 교체): 파일을 3부분으로 분리 → 새 함수 작성 → 재조립

```bash
head -3992 index.html > part1.html
tail -n +4285 index.html > part2.html
cat part1.html new_function.js part2.html > index.html
```

### 코드 스타일

**HTML**:
- 들여쓰기: 2칸 스페이스
- 주석: `<!-- 섹션명 -->`

**CSS**:
- 들여쓰기: 2칸 스페이스
- 섹션 구분: `/* ==================== 섹션명 ==================== */`
- 클래스명: kebab-case

**JavaScript**:
- 들여쓰기: 2칸 스페이스
- 함수 구분: `// ==================== 기능명 ====================`
- 변수명: camelCase
- 상수명: UPPER_SNAKE_CASE

---

## 💡 7. 개발 규칙

### 세션 운영 원칙

**Claude Code 세션 시작 시**:
1. 이 파일(CLAUDE.md)을 먼저 읽고 프로젝트 맥락 파악
2. "전체 프로젝트 진행 단계" 섹션에서 현재 진행 상황 확인
3. "다음 세션 시작점" 섹션에서 이어서 할 작업 확인

**세션 마무리 시**:
1. 이 파일(CLAUDE.md)을 직접 갱신:
   - 진행 단계 업데이트 (✅ 완료, 🔄 진행 중)
   - 가이드 문서 참고 내용에 새 UX 주의사항 추가
   - "다음 세션 시작점" 업데이트
2. 변경사항 커밋 & 푸시

**중요 원칙**:
- 절대 기억에 의존하지 말 것 — 모든 정보는 이 파일에 기록
- 매 세션마다 이 파일을 최신 상태로 유지
- 새로운 발견사항은 즉시 기록

### 작업 원칙

- **코딩 전** 구조·디자인 설계 → 승인 후 진행
- 각 Phase 완료 후 **다음 단계 진행 여부 확인**
- 단계별로 **사용자가 할 부분 친절하게 안내**
- 지시·승인 없이 혼자 작업 금지
- **한국어 대화**, 기술 용어 최소화
- 한 단계 = 하나의 대화창 기준
- **lmp는 항상 소문자**
- 뼈대 개선은 모아서 한 번에

### 개발 패턴

**복수 선택 UI**:
- ❌ "복수 선택 모드" 토글 버튼
- ✅ 각 항목마다 **체크박스 항상 표시**

**GitHub 설정**:
1. 사이트 설정 → GitHub 정보 입력
2. 저장 → localStorage
3. 배포 페이지 → 자동 불러오기

**확인 창 필수**: 삭제 / 배포 / 중요 변경

**미저장 경고**: `beforeunload` 이벤트

### 배포 프로토콜 (어드민 — GitHub Pages)

```bash
# 1. 로컬 테스트 (http://localhost:5500 등)
# 2. 커밋 & 푸시
git add index.html CLAUDE.md
git commit -m "feat: [기능 설명]"
git push origin main
# 3. 확인 (1-2분 후)
# → https://beybusiness-bit.github.io/beyhome-admin
```

**체크리스트**:
- [ ] 로컬 테스트 완료
- [ ] 로그인 작동 확인
- [ ] 주요 기능 동작 확인
- [ ] 모바일 반응형 확인
- [ ] 콘솔 에러 없음

---

## 🔑 8. 중요 정보

### Google OAuth

⚠️ **Client ID 확인 필요**: 코드 내에서 실제로 사용 중인 값 기준.
과거 기록상 두 개의 ID가 병존:
- 초기값: `27055656717-pgddfisd182i8jqlg574v7vrbkff2b2b.apps.googleusercontent.com` (`.env.save`, `.envt` 참조)
- 갱신값: `27055656717-ed149rm5e49uhd7gaoicadd62fbe6hoh.apps.googleusercontent.com` (이전 CLAUDE.md 기록)

→ `index.html` 내 `GOOGLE_CLIENT_ID` 상수를 확인하여 이 문서에 단일 값으로 정리 필요.

### 화이트리스트 (접근 허용 이메일)

```
itsbeybusiness@gmail.com
baekeun0@gmail.com
```

### Google Sheets ID (Phase 5+ 사용 예정)

```
1QHzz73LzPSGWCwl6SN7TPaxxdyqnkIxzlq9TQpGopag
```

lmp 프로그램 관리자 앱과 공용.

### 토스페이먼츠 (lmp 홈페이지)

테스트 모드, 키는 Vercel 환경변수에 저장.

---

## 🗄️ 9. DB 구조

### 현재 상태 (어드민 — localStorage)

```javascript
localStorage.user = { name, email, picture }

localStorage.sites = [
  {
    id: "site1",
    name: "lmp작업실",
    repo: "beybusiness-bit/lmp-website",
    template: "business",
    createdAt: "2024-04-10",
    deployPlatform: "github-pages",
    githubPagesUrl: "beybusiness-bit.github.io/lmp-website",
    customDomain: "lazymaxpotential.kr",
    domainConnected: false
  }
]

localStorage.currentSiteId = "site1"
localStorage.currentTab = "dashboard"

localStorage['site_site1_data'] = {
  pages: [...],
  blocks: [...],
  settings: { layout, design, site, menu },
  images: [...],
  deployHistory: [...],
  activityLog: [...]
}
```

### Phase 5+ Google Sheets 구조 (예정)

**시트 1: sites** — id, name, repo, template, createdAt, deployPlatform, githubPagesUrl, customDomain, domainConnected

**시트 2: pages** — siteId, pageId, title, slug, category, status, blocks, createdAt, updatedAt

**시트 3: settings** — siteId, category, key, value, updatedAt

**시트 4: images** — siteId, imageId, filename, folder, url, size, uploadedAt

### Phase 6.5 추가 시트 (lmp 홈페이지 회원/게시판)

**기존 시트** (lmp 프로그램 관리자 앱 공용):
- `sessions`, `programs`, `members`, `participation_logs`
- `add_options`, `log_options`, `benefits`, `gifts`

**신규 시트**:
- `contents`: 게시판/갤러리 통합 DB
- `comments`: 댓글
- `pages_config`: 페이지 설정

---

## 📝 10. 가이드 문서 참고 내용 누적

### UX 주의사항

**사이드바**:
- ⚠️ 데스크탑: X 버튼으로 접기/펼치기, 접으면 ☰ 버튼 표시
- ⚠️ 모바일: 햄버거 메뉴, 오버레이 클릭 시 닫힘
- ⚠️ 메뉴 선택 시 모바일에서 자동 닫힘

**사이트 선택**:
- ⚠️ 로그인 후 → 사이트 선택 화면
- ⚠️ 사이트 클릭 → 어드민 진입
- ⚠️ "사이트 전환" 버튼 → 다시 선택 화면

**새로고침**:
- ⚠️ 마지막 선택한 사이트 자동 복원
- ⚠️ 마지막 보던 탭 자동 복원
- ⚠️ localStorage에 상태 저장

**사이트 설정**:
- ⚠️ 4개 탭으로 분리: 기본 정보, 배포 설정, SEO, 플로팅 버튼
- ⚠️ 배포 설정 = GitHub 연동 + 도메인 설정 통합
- ⚠️ 커스텀 도메인 연결 완료는 수동 체크 (사용자가 DNS 설정 후)

**배포 관련**:
- ⚠️ "사이트 설정 → 배포" = 연결 설정 (한 번만)
- ⚠️ "사이드바 → 배포" = 실제 배포 실행 (여러 번)
- ⚠️ Personal Access Token 필요 (repo 권한 전체)

### 입력 규칙

- **저장소 형식**: `username/repository` (예: `beybusiness-bit/lmp-website`), 슬래시 필수
- **도메인 형식**: `example.com` (https:// 제외), 서브도메인 가능
- **브랜치명**: 사이트마다 지정 가능 (어드민에서 관리하는 "다른 사이트"의 배포 브랜치 기본값)

### 기술적 제약

- **localStorage 용량**: 브라우저별 약 5-10MB 제한 (이미지는 URL만 저장, 실제 파일은 GitHub)
- **GitHub Pages**: Public 저장소 무료, Private는 GitHub Pro
- **브라우저 호환성**: Chrome, Edge, Safari, Firefox (최신) — IE 미지원

---

## 📚 11. 참고 자료

- Google OAuth 문서: https://developers.google.com/identity/gsi/web
- GitHub Pages 문서: https://docs.github.com/pages
- GitHub API 문서: https://docs.github.com/rest
- Google Sheets API 문서: https://developers.google.com/sheets/api
- Firebase Auth 문서: https://firebase.google.com/docs/auth
- 토스페이먼츠 문서: https://docs.tosspayments.com/

---

## 🎯 12. 다음 세션 시작점

> 이 섹션은 "지금 여기서부터 다시 시작하면 된다"의 체크리스트. 상세 맥락은 **섹션 2-1(현재 미결 상태)** 참조.

### STEP 0 — 세션 시작 시 가장 먼저 할 일

1. **이 문서 전체를 먼저 읽어** 프로젝트 맥락 파악 (특히 섹션 1, 2, 2-1)
2. 사용자로부터 **이전 세션 패치에 대한 피드백**이 먼저 올 가능성 높음 — 받고 반영
3. **repo 위치 확인** — `~/Downloads/beyhome-admin/` 그대로인지, `~/projects/beyhome-admin/`으로 이동됐는지 확인

### STEP 1 — CLAUDE.md 푸시 완료 여부 확인 (이전 세션 잔여)

다음 세션 시작 전에 사용자가 터미널에서 다음을 수행했어야 함:
```bash
cp -f /Users/bey/projects/beyhome-admin/CLAUDE.md ~/Downloads/beyhome-admin/CLAUDE.md
cd ~/Downloads/beyhome-admin
git add CLAUDE.md && git commit -m "docs: restore full project context" && git push origin main
```

확인 방법: `git ls-remote https://github.com/beybusiness-bit/beyhome-admin.git HEAD`
- 출력이 `472c8394...` 이면 **아직 안 됨** (이전 세션 마지막 커밋) → 사용자에게 다시 안내
- 새 해시면 완료됨

### STEP 2 — 사용자 액션 확인 사항

- [ ] **GitHub Pages Source 설정** — Settings → Pages → Branch가 `main` / `/ (root)` 인지 확정
- [ ] **실환경 검증 3종** (섹션 2-1 ⑤ 참조) — 진행 상황 물어보기
- [ ] **Client ID 단일화** (섹션 2-1 ④ 참조) — `index.html`의 `GOOGLE_CLIENT_ID` 값 확인해서 문서에 단일 값으로 확정

### STEP 3 — Phase 5 시작 (본격 작업)

위 체크리스트 끝나면 Phase 5 진입:

1. **Google Cloud Console**:
   - Sheets API 활성화
   - OAuth 동의 화면에 Sheets API 범위 추가 (기존 OAuth 클라이언트에 scope 추가)
2. **Spreadsheet 구조 최종 확정** (섹션 9의 4개 시트 스키마 검토 + 필요 시 수정)
3. **GAS(Google Apps Script) 웹훅 스크립트** 작성
4. 어드민 코드(`index.html`)에 Sheets 읽기/쓰기 호출 구현 — localStorage에서 이행

### STEP 4~ — 장기 로드맵

- Phase 6: Firebase Auth 회원 시스템 (lmp홈페이지용)
- Phase 6.5: 게시판/갤러리/댓글
- 어드민에 "새 사이트 생성" 기능 추가
- 페이지 내용 채우기 + 뼈대 개선 1차 (모아서 한 번에)
- Phase 7: 관리 방법 안내

### 작업 시 반드시 지킬 것 (섹션 7 요약)

- **코딩 전** 구조·디자인 설계 → 승인 후 진행
- 각 Phase 완료 후 **다음 단계 진행 여부 확인**
- **지시·승인 없이 혼자 작업 금지**
- **한국어 대화**, 기술 용어 최소화
- **lmp는 항상 소문자**
- 기능 축약·삭제 금지, **모든 기능/UI/데이터 흐름 보존**
- 뼈대 개선은 **모아서 한 번에**

---

**마지막 업데이트**: 2026-04-21 (세션 종료 시점, 터미널 재시작 직전)
**현재 Phase**: Phase 4 완료 ✅
**다음 Phase**: Phase 5 — 홈페이지 ↔ 어드민 데이터 연동 🔲
**미결 상태**: CLAUDE.md repo 푸시 + 사용자 피드백 반영 대기 중 (섹션 2-1 참조)
