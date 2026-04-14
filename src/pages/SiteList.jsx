import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Plus, ExternalLink, Settings } from 'lucide-react';

function SiteList() {
  const { isAuthenticated, user, logout } = useAuth();

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 사이트 목록 (실제로는 API에서 가져옴)
  const [sites] = useState([
    {
      id: 'site-1',
      name: '우리 회사 홈페이지',
      url: 'https://ourcompany.com',
      description: '메인 비즈니스 사이트',
      lastUpdated: '2024-04-14',
      status: 'active'
    },
    {
      id: 'site-2',
      name: '블로그',
      url: 'https://blog.ourcompany.com',
      description: '기술 블로그',
      lastUpdated: '2024-04-10',
      status: 'active'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Home Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.name} ({user?.email})
            </span>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">내 사이트</h2>
            <p className="text-gray-600 mt-1">관리할 사이트를 선택하세요</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus size={20} />
            새 사이트 추가
          </button>
        </div>

        {/* 사이트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {site.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {site.description}
                    </p>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {site.url}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <span
                    className={`
                      px-2 py-1 text-xs rounded-full
                      ${site.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                      }
                    `}
                  >
                    {site.status === 'active' ? '활성' : '비활성'}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  최근 업데이트: {site.lastUpdated}
                </div>

                <div className="flex gap-2">
                  <Link
                    to="/dashboard"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition-colors"
                  >
                    관리하기
                  </Link>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    <Settings size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SiteList;
