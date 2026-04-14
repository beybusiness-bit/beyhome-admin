import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Menu,
  Image,
  Settings,
  Rocket,
  LogOut,
  Database
} from 'lucide-react';

export default function Layout({ children }) {
  const { user, logout, spreadsheetId } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: '대시보드' },
    { path: '/pages', icon: FileText, label: '페이지 관리' },
    { path: '/menu', icon: Menu, label: '메뉴 설정' },
    { path: '/images', icon: Image, label: '이미지' },
    { path: '/settings', icon: Settings, label: '설정' },
    { path: '/deploy', icon: Rocket, label: '배포' },
  ];

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 사이드바 */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* 로고 */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">Home Admin</div>
              <div className="text-xs text-gray-500">Phase 5</div>
            </div>
          </div>
        </div>

        {/* 메뉴 */}
        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 사용자 정보 */}
        <div className="p-4 border-t">
          {spreadsheetId && (
            <div className="mb-3 p-2 bg-green-50 rounded-lg">
              <div className="text-xs text-green-700 font-medium">
                ✓ Sheets 연동됨
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user?.picture}
              alt={user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{user?.name}</div>
              <div className="text-xs text-gray-500 truncate">{user?.email}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
