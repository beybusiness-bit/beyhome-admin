# Home Admin

멀티 사이트 관리를 위한 어드민 웹앱

## 기술 스택

- **Frontend**: Vite + React 18 + React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Google OAuth 2.0
- **Deployment**: Vercel (Admin), GitHub Pages (Sites)

## 프로젝트 구조

```
home-admin/
├── src/
│   ├── auth/          # 인증 관련 (Google OAuth)
│   ├── components/    # 공통 컴포넌트 (Sidebar, Layout)
│   ├── pages/         # 페이지 컴포넌트
│   ├── utils/         # 유틸리티 (config, github API)
│   ├── App.jsx        # 라우터 설정
│   ├── main.jsx       # 진입점
│   └── index.css      # 글로벌 스타일
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 개발 환경 설정

### 1. 패키지 설치 (처음 한 번만)

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가:

```
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 으로 접속

### 4. 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 파일 업데이트 받는 방법

Claude가 파일을 수정/추가했을 때 프로젝트에 반영하는 방법입니다.

### 📝 Case 1: 개별 파일 수정 (가장 일반적)

Claude가 "파일명.jsx를 이렇게 수정했습니다" 하고 코드를 보여주면:

1. **해당 파일 열기** (VS Code 등)
2. **전체 선택** `Cmd + A` (Mac) 또는 `Ctrl + A` (Windows)
3. **삭제 후 붙여넣기**: Claude가 준 코드 복사 → 붙여넣기
4. **저장** `Cmd + S` 또는 `Ctrl + S`
5. **확인**: 브라우저 자동 새로고침 ✨

**npm 명령어 필요 없음!** 서버가 켜져 있으면 자동 반영됩니다.

### 📦 Case 2: 새 파일 추가

Claude가 새 파일을 만들었다고 하면:

1. **해당 경로에 파일 생성**
   - 예: `src/components/NewComponent.jsx`
2. **코드 복사 → 붙여넣기**
3. **저장**
4. **자동 반영됨**

**npm 명령어 필요 없음!**

### 🗜️ Case 3: zip 파일로 여러 파일 한꺼번에

1. **zip 다운로드 및 압축 해제**
2. **방법 A - 전체 교체** (간단하지만 재설치 필요):
   ```bash
   # 기존 프로젝트 폴더 삭제
   # 새 폴더 사용
   cd home-admin
   npm install          # 다시 설치 필요!
   npm run dev
   ```

3. **방법 B - 파일만 교체** (추천):
   - 압축 해제한 폴더에서 수정된 파일만 찾아서
   - 기존 프로젝트 폴더에 복사/붙여넣기 (덮어쓰기)
   - **npm install 필요 없음!**

### 🆕 Case 4: package.json이 수정됨 (새 패키지 추가)

드물지만, 새로운 npm 패키지가 추가된 경우:

```bash
npm install          # 새 패키지 설치
# npm run dev는 그대로 실행 중
```

### ⚡ 빠른 참고

| 상황 | npm install 필요? | npm run dev 재실행? |
|------|------------------|-------------------|
| 코드 파일 수정 (.jsx, .js, .css) | ❌ 필요 없음 | ❌ 필요 없음 (자동 반영) |
| 새 파일 추가 | ❌ 필요 없음 | ❌ 필요 없음 (자동 반영) |
| package.json 수정 | ✅ 필요함 | ❌ 필요 없음 |
| 전체 프로젝트 교체 | ✅ 필요함 | ✅ 필요함 |

### 💡 팁

- **개발 서버는 계속 켜두세요**: 터미널 창 그대로 두기
- **파일 저장만 하면 됩니다**: Vite가 자동으로 감지해서 브라우저 새로고침
- **에러가 나면**: 터미널에서 에러 메시지 확인

## Phase 4 개발 단계

- [x] **Step 1**: Vite + React 프로젝트 초기 세팅
- [x] **Step 2**: Google OAuth 로그인 + 화이트리스트
- [ ] **Step 3**: 사이드바 + 라우팅 UI 피드백 반영
- [ ] **Step 4**: 사이트 기본 설정 + 기본 디자인 설정
- [ ] **Step 5**: 레이아웃 설정 (헤더/푸터)
- [ ] **Step 6**: 페이지 관리 + 메뉴 설정
- [ ] **Step 7**: 블록 에디터 (핵심)
- [ ] **Step 8**: 이미지 라이브러리
- [ ] **Step 9**: GitHub API 연동 + 배포 기능
- [ ] **Step 10**: 대시보드 + 마무리

## 주요 기능

### 인증
- Google OAuth 2.0 로그인
- 화이트리스트 기반 접근 제어

### 사이트 관리
- 멀티 사이트 지원
- 사이트별 독립 설정

### 페이지 에디터
- 블록 기반 에디터
- 드래그 앤 드롭
- 미리보기 (데스크탑/모바일)
- SEO 설정

### 배포
- GitHub Pages 자동 배포
- 배포 이력 관리

## 라이선스

MIT
