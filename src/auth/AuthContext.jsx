import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// 허용된 이메일 목록
const ALLOWED_EMAILS = [
  'itsbeybusiness@gmail.com',
  'baekeun0@gmail.com',
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 초기화 및 OAuth 콜백 처리
  useEffect(() => {
    // URL에서 id_token 확인 (OAuth redirect 후)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const idToken = params.get('id_token');

    if (idToken) {
      try {
        // JWT 디코딩
        const payload = JSON.parse(atob(idToken.split('.')[1]));
        console.log('📧 로그인 시도 이메일:', payload.email);
        
        // 화이트리스트 체크
        if (ALLOWED_EMAILS.includes(payload.email)) {
          const userData = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture
          };
          
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('✅ 로그인 성공!');
          
          // URL 정리
          window.history.replaceState({}, document.title, window.location.pathname);
        } else {
          console.log('❌ 권한 없음!');
          alert('접근 권한이 없는 계정입니다.');
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error('토큰 처리 실패:', error);
      }
    } else {
      // 저장된 사용자 정보 확인
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    
    setLoading(false);
  }, []);

  // Google OAuth2 로그인
  const login = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    console.log('🔑 Client ID:', clientId);

    if (!clientId) {
      alert('Google Client ID가 설정되지 않았습니다.');
      return;
    }

    // OAuth2 파라미터
    const redirectUri = window.location.origin;
    const nonce = Math.random().toString(36).substring(7);
    
    // OAuth2 URL 생성
    const authUrl = 
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(clientId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=id_token&` +
      `scope=openid%20email%20profile&` +
      `nonce=${nonce}&` +
      `prompt=select_account`;
    
    console.log('🔗 OAuth URL로 이동...');
    window.location.href = authUrl;
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
