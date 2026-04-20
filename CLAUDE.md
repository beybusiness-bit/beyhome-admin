# 멀티 사이트 관리 어드민 - Claude Code 개발 가이드

## 📌 1. 앱 기본 정보

### 앱 이름
**멀티 사이트 관리 어드민 (Multi-Site Admin)**

### 배포 정보
- **저장소**: `beybusiness-bit/beyhome-admin`
- **배포 URL**: https://beybusiness-bit.github.io/beyhome-admin
- **배포 방식**: GitHub Pages (gh-pages 브랜치)
- **로컬 작업 폴더**: `~/Downloads/beyhome-admin` (권장)

### AUTH 상수

```javascript
// Google OAuth Client ID
const GOOGLE_CLIENT_ID = '27055656717-ed149rm5e49uhd7gaoicadd62fbe6hoh.apps.googleusercontent.com';

// 화이트리스트 (접근 허용 이메일)
const ALLOWED_EMAILS = [
  'itsbeybusiness@gmail.com',
  'baekeun0@gmail.com'
];

// Google Sheets ID (Phase 5+에서 사용)
const SPREADSHEET_ID = '1QHzz73LzPSGWCwl6SN7TPaxxdyqnkIxzlq9TQpGopag';
```

### 중요 파일 정보
- **메인 파일**: `index.html` (단일 HTML 파일, 약 4,900줄)
- **파일 구조**: HTML + CSS + JavaScript (모두 하나의 파일에 포함)

---

## 🏗️ 2. 앱 아키텍처 요약

### 앱 성격
- **프론트엔드 전용** 웹앱 (백엔드 없음)
- **단일 HTML 파일** 구조 (React 아님!)
- **멀티 사이트 관리** 도구 (여러 정적 사이트를 한 곳에서 관리)

### UI 구조
```
로그인 화면
  ↓
사이트 선택 화면 (카드 그리드)
  ↓
어드민 화면
  ├─ 사이드바 (접기/펼치기 가능)
  │   ├─ 현재 사이트 정보
  │   ├─ 메뉴 (대시보드, 페이지 관리, 블록 에디터, ...)
  │   └─ 사이트 전환 / 로그아웃
  └─ 메인 컨텐츠 (탭 전환)
```

### 로그인 방식
- **Google OAuth 2.0** (Google Identity Services)
- **화이트리스트 방식**: `ALLOWED_EMAILS` 배열에 있는 이메일만 접근 가능
- **테스트 앱 모드**: Google Cloud Console에서 테스트 사용자로 등록된 계정만 로그인 가능

### 사용자 역할
- **관리자만 존재** (화이트리스트에 등록된 2명)
- 역할 구분 없음 (모든 기능 접근 가능)

### 외부 연동
- **Google OAuth**: 로그인 인증
- **GitHub API**: 파일 배포 (Phase 5+)
- **Google Sheets API**: 데이터 저장 (Phase 5+)

### 데이터 저장 (현재)
- **localStorage**: 모든 데이터 임시 저장
  - `user`: 사용자 정보
  - `sites`: 사이트 목록
  - `currentSiteId`: 현재 선택된 사이트 ID
  - `currentTab`: 마지막 보던 탭
  - `site_{id}_data`: 각 사이트별 설정/페이지/블록 데이터

---

## 🔄 3. 세션 운영 원칙

### Claude Code 세션 시작 시
1. **이 파일(CLAUDE.md)을 먼저 읽고** 프로젝트 맥락 파악
2. "개발 단계 현황" 섹션에서 현재 진행 상황 확인
3. "다음 세션 시작점" 섹션에서 이어서 할 작업 확인

### 세션 마무리 시
1. **이 파일(CLAUDE.md)을 직접 갱신**:
   - 개발 단계 현황 업데이트 (✅ 완료, 🔄 진행 중)
   - 가이드 문서 참고 내용에 새로운 UX 주의사항 추가
   - "다음 세션 시작점" 업데이트
2. **변경사항 커밋 & 푸시**

### 중요 원칙
- **절대 기억에 의존하지 말 것** - 모든 정보는 이 파일에 기록
- **매 세션마다 이 파일을 최신 상태로 유지**
- **새로운 발견사항은 즉시 기록**

---

## 💻 4. Phase 2 개발 진행 프로토콜

### 코드 작업 원칙

#### 파일 구조
```
beyhome-admin/
├── index.html          (메인 파일 - 모든 코드 포함)
├── CLAUDE.md          (이 파일)
├── README.md          (사용자 가이드)
└── (배포 시 gh-pages 브랜치로 push)
```

#### 개발 패턴
- **단일 HTML 파일**: 모든 HTML, CSS, JavaScript를 `index.html` 하나에 작성
- **lmp 스타일 패턴 사용**:
  ```javascript
  // 전역 STATE 객체로 상태 관리
  const STATE = { ... };
  
  // 탭 전환
  function showTab(tabName) { ... }
  
  // 렌더링 함수
  function renderDashboard() { ... }
  ```

### 절대 금지 사항

#### ❌ 기능 축약/삭제 금지
- 기존 기능을 임의로 간소화하거나 삭제하지 말 것
- 모든 UI 요소 그대로 유지
- 모든 데이터 흐름 보존

#### ❌ 외부 프레임워크 금지
- React, Vue 등 사용 금지
- Vanilla JavaScript만 사용
- 외부 라이브러리 최소화 (Google OAuth, Tailwind CDN 정도만)

#### ❌ 임의 수정 금지
- 사용자 승인 없이 구조 변경 금지
- 디자인 임의 변경 금지
- 기존 로직 함부로 수정 금지

### 수정 방식

#### 작은 수정
- `str_replace` 도구 사용
- 정확한 문자열 매칭 필요
- 변경 전 `view` 도구로 확인

#### 큰 수정 (함수 전체 교체)
1. 파일을 3부분으로 분리 (전/함수/후)
2. 새 함수 작성
3. 3부분 합치기
4. 결과 확인

#### 예시
```bash
# renderSiteSettings 함수 교체 예시
head -3992 index.html > part1.html
tail -n +4285 index.html > part2.html
cat part1.html new_function.js part2.html > index.html
```

### 코드 스타일

#### HTML
- 들여쓰기: 2칸 스페이스
- 주석: `<!-- 섹션명 -->`

#### CSS
- 들여쓰기: 2칸 스페이스
- 섹션 구분: `/* ==================== 섹션명 ==================== */`
- 클래스명: kebab-case

#### JavaScript
- 들여쓰기: 2칸 스페이스
- 함수 구분: `// ==================== 기능명 ====================`
- 변수명: camelCase
- 상수명: UPPER_SNAKE_CASE

---

## 🚀 5. Phase 3 배포 프로토콜

### 배포 방식
- **GitHub Pages** 사용
- **gh-pages 브랜치**에 push

### 배포 절차

#### 1. 로컬에서 테스트
```bash
# 로컬 서버 실행 (Live Server 등)
# 브라우저에서 http://localhost:5500 접속
# 모든 기능 테스트
```

#### 2. GitHub 커밋 & 푸시
```bash
git add index.html CLAUDE.md
git commit -m "feat: [기능 설명]"
git push origin main
```

#### 3. gh-pages 브랜치 배포
```bash
# index.html을 gh-pages 브랜치로 복사
git checkout gh-pages
git checkout main -- index.html
git add index.html
git commit -m "deploy: [배포 내용]"
git push origin gh-pages
```

#### 4. 배포 확인
- URL: https://beybusiness-bit.github.io/beyhome-admin
- 1-2분 후 반영 확인

### 배포 체크리스트
- [ ] 로컬 테스트 완료
- [ ] 로그인 작동 확인
- [ ] 주요 기능 동작 확인
- [ ] 모바일 반응형 확인
- [ ] 콘솔 에러 없음

---

## 📖 6. Phase 4 가이드 문서 작성 프로토콜

### 가이드 문서 위치
- **README.md**: 사용자용 가이드
- **CLAUDE.md** (이 파일): 개발자용 가이드

### README.md 구성
```markdown
# 멀티 사이트 관리 어드민 사용 가이드

## 시작하기
## 사이트 만들기
## 페이지 관리
## 블록 에디터 사용법
## 배포하기
## 문제 해결
```

### 작성 원칙
- **스크린샷 포함** (가능하면)
- **단계별 설명** (1, 2, 3...)
- **주의사항 강조** (⚠️ 표시)
- **예시 포함**

### 업데이트 시점
- 새 기능 추가 시
- UI 변경 시
- 사용자 피드백 반영 시

---

## 📊 7. 개발 단계 현황

### Phase 1: 프로젝트 초기 설계 ✅
- [x] 프로젝트 구조 설계
- [x] 기술 스택 결정 (단일 HTML)
- [x] UI/UX 구조 기획

### Phase 2: React 프로토타입 ✅ (폐기)
- [x] React + Vite 프로젝트 생성
- [x] Google OAuth 구현
- [x] 모든 기능 구현 (10개 페이지)
- [x] OAuth CORS 문제 발생 → 폐기 결정

### Phase 3: 단일 HTML 전환 ✅
- [x] React 코드를 Vanilla JS로 재작성
- [x] 모든 Phase 2 기능 이식
- [x] Google Identity Services 적용
- [x] GitHub Pages 배포 성공

### Phase 4: UI/UX 개선 ✅
- [x] 사이트 선택 화면 추가
- [x] 사이드바 토글 기능 (데스크탑/모바일)
- [x] 배포 플랫폼 GitHub Pages 고정
- [x] 사이트 설정 탭 분리 (4개 탭)
- [x] 새로고침 시 상태 복원
- [x] 커스텀 도메인 설정 UI
- [x] 모바일 반응형 완성

### Phase 5: 데이터 연동 🔲
- [ ] Google Sheets API 연동
- [ ] 페이지/메뉴/설정 데이터 저장
- [ ] 앱 시작 시 데이터 자동 로드
- [ ] GAS 웹훅 설정

### Phase 6: HTML 변환 & 배포 자동화 🔲
- [ ] 블록 → HTML 변환 로직
- [ ] GitHub API로 파일 업로드
- [ ] 자동 배포 기능
- [ ] 배포 이력 관리

### Phase 7: 추가 블록 & 고급 기능 🔲
- [ ] 갤러리 블록
- [ ] 게시판 블록
- [ ] 상품 목록 블록
- [ ] 폼 블록
- [ ] 지도 블록
- [ ] FAQ 아코디언

### Phase 8: 최적화 & 문서화 🔲
- [ ] 성능 최적화
- [ ] 사용자 가이드 작성
- [ ] 개발자 문서 작성
- [ ] 배포 자동화

---

## 🗄️ 8. DB 구조

### 현재 상태 (localStorage)

```javascript
// 사용자 정보
localStorage.user = {
  name: "사용자 이름",
  email: "이메일",
  picture: "프로필 사진 URL"
}

// 사이트 목록
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

// 현재 선택된 사이트
localStorage.currentSiteId = "site1"

// 현재 탭
localStorage.currentTab = "dashboard"

// 각 사이트별 데이터
localStorage['site_site1_data'] = {
  pages: [...],
  blocks: [...],
  settings: {
    layout: {...},
    design: {...},
    site: {...},
    menu: [...]
  },
  images: [...],
  deployHistory: [...],
  activityLog: [...]
}
```

### Phase 5+ Google Sheets 구조 (예정)

#### 시트 1: sites
| id | name | repo | template | createdAt | deployPlatform | githubPagesUrl | customDomain | domainConnected |
|---|---|---|---|---|---|---|---|---|
| site1 | lmp작업실 | beybusiness-bit/lmp-website | business | 2024-04-10 | github-pages | ... | lazymaxpotential.kr | false |

#### 시트 2: pages
| siteId | pageId | title | slug | category | status | blocks | createdAt | updatedAt |
|---|---|---|---|---|---|---|---|---|
| site1 | page1 | 홈 | / | main | active | [...] | ... | ... |

#### 시트 3: settings
| siteId | category | key | value | updatedAt |
|---|---|---|---|---|
| site1 | layout | header.height | 80 | ... |
| site1 | design | colors.primary | #3b82f6 | ... |

#### 시트 4: images
| siteId | imageId | filename | folder | url | size | uploadedAt |
|---|---|---|---|---|---|---|
| site1 | img1 | hero.jpg | / | https://... | 1024000 | ... |

---

## 📝 9. 가이드 문서 참고 내용 누적

### UX 주의사항

#### 사이드바
- ⚠️ 데스크탑: X 버튼으로 접기/펼치기, 접으면 ☰ 버튼 표시
- ⚠️ 모바일: 햄버거 메뉴, 오버레이 클릭 시 닫힘
- ⚠️ 메뉴 선택 시 모바일에서 자동 닫힘

#### 사이트 선택
- ⚠️ 로그인 후 → 사이트 선택 화면
- ⚠️ 사이트 클릭 → 어드민 진입
- ⚠️ "사이트 전환" 버튼 → 다시 선택 화면

#### 새로고침
- ⚠️ 마지막 선택한 사이트 자동 복원
- ⚠️ 마지막 보던 탭 자동 복원
- ⚠️ localStorage에 상태 저장

#### 사이트 설정
- ⚠️ 4개 탭으로 분리: 기본 정보, 배포 설정, SEO, 플로팅 버튼
- ⚠️ 배포 설정 = GitHub 연동 + 도메인 설정 통합
- ⚠️ 커스텀 도메인 연결 완료는 수동 체크 (사용자가 DNS 설정 후)

#### 배포 관련
- ⚠️ "사이트 설정 → 배포" = 연결 설정 (한 번만)
- ⚠️ "사이드바 → 배포" = 실제 배포 실행 (여러 번)
- ⚠️ Personal Access Token 필요 (repo 권한 전체)

### 입력 규칙

#### 저장소 형식
- 형식: `username/repository`
- 예: `beybusiness-bit/lmp-website`
- 슬래시(/) 필수

#### 도메인 형식
- 예: `example.com` (https:// 제외)
- 서브도메인 가능: `www.example.com`

#### 브랜치명
- 기본값: `gh-pages`
- 변경 가능: `main`, `master` 등

### 기술적 제약사항

#### localStorage 용량
- 브라우저별 약 5-10MB 제한
- 이미지는 URL만 저장 (실제 파일은 GitHub)

#### GitHub Pages
- Public 저장소 무료
- Private 저장소는 GitHub Pro 필요

#### 브라우저 호환성
- Chrome, Edge, Safari, Firefox (최신 버전)
- Internet Explorer 미지원

---

## 🎯 10. 다음 세션 시작점

### 즉시 진행할 작업
**없음 - Phase 4 완료 상태**

### Phase 5 시작 준비사항
1. Google Sheets API 설정
   - Google Cloud Console에서 Sheets API 활성화
   - OAuth 동의 화면에 Sheets API 범위 추가
2. Spreadsheet 구조 설계 확인
3. GAS 웹훅 스크립트 작성 준비

### 사용자 피드백 대기 중
- 현재 배포된 앱 사용 후 피드백
- 추가 요청사항 확인

### 확인 필요 사항
- lmp작업실 홈페이지 실제 배포 테스트
- 커스텀 도메인 연결 테스트
- 모든 브라우저에서 로그인 테스트

---

## 📚 참고 자료

### Google OAuth 문서
- https://developers.google.com/identity/gsi/web

### GitHub Pages 문서
- https://docs.github.com/pages

### GitHub API 문서
- https://docs.github.com/rest

### Google Sheets API 문서
- https://developers.google.com/sheets/api

---

**마지막 업데이트**: 2026-04-17  
**현재 Phase**: Phase 4 완료 ✅  
**다음 Phase**: Phase 5 준비 중 🔲
