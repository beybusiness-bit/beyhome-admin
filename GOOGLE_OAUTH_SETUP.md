# Google OAuth 2.0 설정 가이드

## 1. Google Cloud Console 설정

### Step 1: 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택

### Step 2: OAuth 동의 화면 구성
1. 왼쪽 메뉴에서 **APIs & Services** > **OAuth consent screen** 선택
2. User Type 선택:
   - **Internal**: G Suite 조직 내부용 (권장)
   - **External**: 외부 사용자도 허용
3. 앱 정보 입력:
   - **App name**: Home Admin
   - **User support email**: 지원 이메일
   - **Developer contact**: 개발자 이메일
4. Scopes 추가 (기본값 사용):
   - `openid`
   - `email`
   - `profile`
5. 저장

### Step 3: OAuth 2.0 Client ID 생성
1. **APIs & Services** > **Credentials** 선택
2. **+ CREATE CREDENTIALS** > **OAuth client ID** 클릭
3. Application type: **Web application** 선택
4. Name: `Home Admin Web Client`
5. **Authorized JavaScript origins** 추가:
   ```
   http://localhost:5173
   https://home-admin.vercel.app
   ```
6. **Authorized redirect URIs** 추가:
   ```
   http://localhost:5173
   https://home-admin.vercel.app
   ```
7. **CREATE** 클릭
8. 생성된 **Client ID** 복사

## 2. 로컬 환경 설정

### Step 1: 환경 변수 파일 생성
프로젝트 루트에 `.env.local` 파일 생성:

```bash
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
```

발급받은 Client ID로 `YOUR_CLIENT_ID` 부분을 교체하세요.

### Step 2: 화이트리스트 설정
`src/utils/config.js` 파일에서 화이트리스트 수정:

```javascript
export const WHITELIST = {
  domains: ['yourcompany.com'], // 허용할 이메일 도메인
  emails: [
    'admin@example.com',
    'dev@example.com',
    // 추가 이메일...
  ]
};
```

## 3. Vercel 배포 설정

### Step 1: Vercel 환경 변수 설정
1. Vercel 프로젝트 대시보드 접속
2. **Settings** > **Environment Variables** 선택
3. 환경 변수 추가:
   - **Name**: `VITE_GOOGLE_CLIENT_ID`
   - **Value**: 발급받은 Client ID
   - **Environment**: Production, Preview, Development 모두 선택

### Step 2: 재배포
환경 변수 추가 후 자동으로 재배포되거나, 수동으로 재배포

## 4. 테스트

### 로컬 테스트
1. 개발 서버 실행:
   ```bash
   npm run dev
   ```
2. http://localhost:5173/login 접속
3. Google 로그인 버튼 클릭
4. 화이트리스트에 등록된 계정으로 로그인

### 프로덕션 테스트
1. https://home-admin.vercel.app/login 접속
2. Google 로그인 테스트

## 5. 보안 주의사항

### ✅ 해야 할 것
- Client ID만 공개 (안전함)
- 화이트리스트 엄격히 관리
- HTTPS 사용 (프로덕션)
- 정기적으로 접근 권한 검토

### ❌ 하지 말아야 할 것
- Client Secret을 프론트엔드 코드에 포함
- 화이트리스트 없이 모든 사용자 허용
- HTTP로 프로덕션 배포

## 6. 문제 해결

### "redirect_uri_mismatch" 에러
- Google Cloud Console의 Authorized redirect URIs에 현재 URL이 정확히 등록되어 있는지 확인
- 프로토콜(http/https), 도메인, 포트가 정확히 일치해야 함

### "Access blocked" 에러
- OAuth consent screen이 올바르게 구성되었는지 확인
- Internal로 설정한 경우 G Suite 조직의 계정만 사용 가능

### 로그인 버튼이 보이지 않음
- 브라우저 콘솔에서 에러 확인
- GOOGLE_CLIENT_ID가 올바르게 설정되었는지 확인
- Google Identity Services 스크립트가 로드되었는지 확인

## 7. 개발 모드

개발 중에는 화이트리스트 없이 테스트하려면, 로그인 페이지의 "개발자 계정으로 로그인" 버튼을 사용하세요 (개발 모드에서만 표시됨).
