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
    // 저장된 사용자 확인
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Google 로그인 (GIS 방식)
  const login = () => {
    return new Promise((resolve, reject) => {
      if (!window.google) {
        alert('Google API가 로드되지 않았습니다. 페이지를 새로고침해주세요.');
        reject(new Error('Google API not loaded'));
        return;
      }

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        alert('Google Client ID가 설정되지 않았습니다.');
        reject(new Error('No client ID'));
        return;
      }

      console.log('🔑 Google 로그인 시작 (GIS)...');

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        callback: async (response) => {
          if (response.error) {
            console.error('❌ 토큰 에러:', response.error);
            reject(new Error(response.error));
            return;
          }

          try {
            // 사용자 정보 가져오기
            const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: {
                Authorization: `Bearer ${response.access_token}`
              }
            });

            const userInfo = await userInfoResponse.json();
            console.log('📧 로그인 시도 이메일:', userInfo.email);

            // 화이트리스트 체크
            if (!ALLOWED_EMAILS.includes(userInfo.email)) {
              console.log('❌ 권한 없는 이메일');
              alert('접근 권한이 없는 계정입니다.');
              reject(new Error('Unauthorized email'));
              return;
            }

            const userData = {
              name: userInfo.name,
              email: userInfo.email,
              picture: userInfo.picture,
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            console.log('✅ 로그인 성공!');
            resolve(userData);
          } catch (error) {
            console.error('❌ 사용자 정보 가져오기 실패:', error);
            reject(error);
          }
        },
        error_callback: (error) => {
          console.error('❌ OAuth 에러:', error);
          reject(new Error(error.type || 'OAuth error'));
        }
      });

      // 토큰 요청 (팝업)
      client.requestAccessToken({ prompt: 'select_account' });
    });
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    console.log('👋 로그아웃 완료');
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
