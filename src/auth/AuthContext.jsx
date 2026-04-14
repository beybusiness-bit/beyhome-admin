import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithRedirect, 
  getRedirectResult,
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext();

// 허용된 이메일 목록
const ALLOWED_EMAILS = [
  'itsbeybusiness@gmail.com',
  'baekeun0@gmail.com',
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 초기화 및 redirect 결과 처리
  useEffect(() => {
    // Redirect 결과 확인
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log('🔄 Redirect 로그인 결과:', result.user.email);
        }
      })
      .catch((error) => {
        console.error('❌ Redirect 에러:', error);
        if (error.code !== 'auth/popup-closed-by-user') {
          alert('로그인 중 오류가 발생했습니다.');
        }
      });

    // Firebase 인증 상태 감지
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log('🔍 Firebase 사용자 감지:', firebaseUser.email);
        
        // 화이트리스트 체크
        if (ALLOWED_EMAILS.includes(firebaseUser.email)) {
          const userData = {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            picture: firebaseUser.photoURL,
          };
          
          setUser(userData);
          console.log('✅ 로그인 성공:', firebaseUser.email);
        } else {
          console.log('❌ 권한 없는 이메일:', firebaseUser.email);
          alert('접근 권한이 없는 계정입니다.');
          await signOut(auth);
          setUser(null);
        }
      } else {
        console.log('👤 로그아웃 상태');
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Google 로그인 (Redirect 방식)
  const login = async () => {
    try {
      console.log('🔑 Google 로그인 시작 (Redirect)...');
      await signInWithRedirect(auth, googleProvider);
      // 페이지가 리다이렉트됨 - 돌아오면 getRedirectResult가 처리
    } catch (error) {
      console.error('❌ 로그인 실패:', error);
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      throw error;
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await signOut(auth);
      console.log('👋 로그아웃 완료');
    } catch (error) {
      console.error('❌ 로그아웃 실패:', error);
    }
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
