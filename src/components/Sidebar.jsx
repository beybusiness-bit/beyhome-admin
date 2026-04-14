import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Menu, Layout, Palette, 
  Settings, Image, Rocket, Home 
} from 'lucide-react';

function Sidebar({ currentSite }) {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: '대시보드' },
    { path: '/pages', icon: FileText, label: '페이지 관리' },
    { path: '/menu', icon: Menu, label: '메뉴 설정' },
    { path: '/layout', icon: Layout, label: '레이아웃 설정' },
    { path: '/design', icon: Palette, label: '기본 디자인 설정' },
    { path: '/site-settings', icon: Settings, label: '사이트 기본 설정' },
    { path: '/images', icon: Image, label: '이미지 라이브러리' },
    { path: '/deploy', icon: Rocket, label: '배포' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed left-0 top-0">
      {/* 사이트 정보 헤더 */}
      <div className="p-4 border-b border-gray-700">
        <Link to="/sites" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3">
          <Home size={16} />
          <span className="text-sm">사이트 목록으로</span>
        </Link>
        {currentSite && (
          <div className="mt-2">
            <h2 className="text-lg font-bold text-white truncate" title={currentSite.name}>
              {currentSite.name}
            </h2>
            <p className="text-xs text-gray-400 truncate" title={currentSite.url}>
              {currentSite.url}
            </p>
          </div>
        )}
      </div>

      {/* 메뉴 항목 */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 transition-colors
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 하단 정보 */}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
        <p>Home Admin v1.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
