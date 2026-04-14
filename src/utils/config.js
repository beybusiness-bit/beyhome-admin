// Google OAuth 설정
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

// 화이트리스트 (허용된 이메일 도메인 또는 특정 이메일)
export const WHITELIST = {
  domains: ['example.com'], // 허용된 도메인
  emails: [
    'admin@example.com',
    'dev@example.com',
  ] // 허용된 특정 이메일
};

// API 엔드포인트 (추후 백엔드 구축 시)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// GitHub 설정
export const GITHUB_CONFIG = {
  owner: 'beybusiness-bit',
  defaultBranch: 'main'
};
