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

  // 초기화
  useEffect(() => {
    // 저장된 사용자 정보 확인
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // 로딩 완료
    setLoading(false);
  }, []);

  // Google 로그인
  const login = async () => {
    try {
      // Google API 로드 확인
      if (!window.google) {
        alert('Google API가 로드되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
      }

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      console.log('🔑 Client ID:', clientId);

      if (!clientId) {
        alert('Google Client ID가 설정되지 않았습니다.');
        return;
      }

      return new Promise((resolve, reject) => {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            try {
              // JWT 토큰 디코딩
              const payload = JSON.parse(atob(response.credential.split('.')[1]));
              
              console.log('📧 로그인 시도 이메일:', payload.email);
              console.log('✅ 허용된 이메일:', ALLOWED_EMAILS);
              
              // 이메일 화이트리스트 체크
              if (!ALLOWED_EMAILS.includes(payload.email)) {
                console.log('❌ 권한 없음!');
                alert('접근 권한이 없는 계정입니다.');
                reject(new Error('접근 권한 없음'));
                return;
              }

              const userData = {
                name: payload.name,
                email: payload.email,
                picture: payload.picture
              };

              // 사용자 정보 저장
              setUser(userData);
              localStorage.setItem('user', JSON.stringify(userData));

              console.log('✅ 로그인 성공!');
              resolve(userData);
            } catch (error) {
              console.error('로그인 처리 실패:', error);
              reject(error);
            }
          }
        });

        window.google.accounts.id.prompt();
      });
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.google?.accounts?.id?.disableAutoSelect();
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
