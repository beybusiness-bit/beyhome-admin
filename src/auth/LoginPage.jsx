import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { GOOGLE_CLIENT_ID, WHITELIST } from '../utils/config';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState('');

  // 이미 로그인된 경우 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/sites';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Google OAuth 스크립트 로드
  useEffect(() => {
    // Google Identity Services 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Google OAuth 초기화
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        // 로그인 버튼 렌더링
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          {
            theme: 'outline',
            size: 'large',
            width: 350,
            text: 'continue_with',
            locale: 'ko',
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Google OAuth 콜백
  const handleCredentialResponse = (response) => {
    try {
      // JWT 토큰 디코딩
      const credential = response.credential;
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const userData = JSON.parse(jsonPayload);

      // 화이트리스트 검증
      if (!isWhitelisted(userData.email)) {
        setError('접근 권한이 없습니다. 관리자에게 문의하세요.');
        return;
      }

      // 로그인 성공
      login({
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        sub: userData.sub,
      });

      const from = location.state?.from?.pathname || '/sites';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  // 화이트리스트 확인
  const isWhitelisted = (email) => {
    // 특정 이메일 확인
    if (WHITELIST.emails.includes(email)) {
      return true;
    }

    // 도메인 확인
    const domain = email.split('@')[1];
    if (WHITELIST.domains.includes(domain)) {
      return true;
    }

    return false;
  };

  // 임시 개발용 로그인 (개발 중에만 사용)
  const handleDevLogin = () => {
    if (import.meta.env.DEV) {
      login({
        name: '개발자',
        email: 'dev@example.com',
        picture: null,
        sub: 'dev-user',
      });
      navigate('/sites');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        {/* 로고 및 제목 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Home Admin
          </h1>
          <p className="text-gray-600">
            사이트 관리 시스템
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Google 로그인 버튼 */}
        <div className="mb-6">
          <div id="googleSignInButton" className="flex justify-center"></div>
        </div>

        {/* 개발용 버튼 (프로덕션에서는 숨김) */}
        {import.meta.env.DEV && (
          <div className="border-t pt-6">
            <p className="text-xs text-gray-500 text-center mb-3">
              개발 모드 전용
            </p>
            <button
              onClick={handleDevLogin}
              className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              개발자 계정으로 로그인
            </button>
          </div>
        )}

        {/* 안내 문구 */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            화이트리스트에 등록된 계정만 로그인할 수 있습니다
          </p>
          <p className="text-xs text-gray-400 mt-1">
            접근 권한이 필요하시면 관리자에게 문의하세요
          </p>
        </div>
      </div>

      {/* 푸터 */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-gray-500">
          &copy; 2024 Home Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
