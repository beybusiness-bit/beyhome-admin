import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Image, Rocket, Clock, TrendingUp,
  Edit2, Plus, Github, Settings, BarChart3
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

function Dashboard() {
  const { pages, images } = useData();

  // 통계 계산
  const stats = {
    totalPages: pages.length,
    totalImages: images.length,
    storageUsed: Math.round(images.reduce((sum, img) => sum + (img.size || 0), 0) / 1024 / 1024), // MB
    lastDeploy: '2024-04-14 15:30',
  };

  const [recentActivities] = useState([
    { id: 1, type: 'page', action: '페이지 수정', target: '홈페이지', time: '10분 전' },
    { id: 2, type: 'image', action: '이미지 업로드', target: 'hero-banner.jpg', time: '1시간 전' },
    { id: 3, type: 'deploy', action: '사이트 배포', target: 'v1.2.3', time: '2시간 전' },
    { id: 4, type: 'page', action: '페이지 생성', target: '제품 소개', time: '3시간 전' },
    { id: 5, type: 'settings', action: '레이아웃 설정 변경', target: '헤더', time: '어제' },
  ]);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'page': return <FileText size={16} className="text-blue-600" />;
      case 'image': return <Image size={16} className="text-green-600" />;
      case 'deploy': return <Rocket size={16} className="text-purple-600" />;
      case 'settings': return <Settings size={16} className="text-orange-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-1">사이트 관리 현황을 한눈에 확인하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">페이지 수</h3>
            <FileText size={24} className="opacity-80" />
          </div>
          <p className="text-3xl font-bold">{stats.totalPages}</p>
          <p className="text-xs opacity-75 mt-1">총 페이지</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">이미지</h3>
            <Image size={24} className="opacity-80" />
          </div>
          <p className="text-3xl font-bold">{stats.totalImages}</p>
          <p className="text-xs opacity-75 mt-1">총 이미지</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">저장 용량</h3>
            <BarChart3 size={24} className="opacity-80" />
          </div>
          <p className="text-3xl font-bold">{stats.storageUsed}</p>
          <p className="text-xs opacity-75 mt-1">MB 사용 중</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">최근 배포</h3>
            <Rocket size={24} className="opacity-80" />
          </div>
          <p className="text-lg font-semibold">{stats.lastDeploy.split(' ')[0]}</p>
          <p className="text-xs opacity-75 mt-1">{stats.lastDeploy.split(' ')[1]}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 빠른 작업 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              빠른 작업
            </h2>
            <div className="space-y-3">
              <Link
                to="/pages"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="p-2 bg-blue-100 rounded group-hover:bg-blue-200 transition-colors">
                  <Plus size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">새 페이지 만들기</p>
                  <p className="text-xs text-gray-500">콘텐츠 추가</p>
                </div>
              </Link>

              <Link
                to="/image-library"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
              >
                <div className="p-2 bg-green-100 rounded group-hover:bg-green-200 transition-colors">
                  <Image size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">이미지 업로드</p>
                  <p className="text-xs text-gray-500">라이브러리 관리</p>
                </div>
              </Link>

              <Link
                to="/deploy"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group"
              >
                <div className="p-2 bg-purple-100 rounded group-hover:bg-purple-200 transition-colors">
                  <Rocket size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">사이트 배포</p>
                  <p className="text-xs text-gray-500">GitHub Pages</p>
                </div>
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group"
              >
                <div className="p-2 bg-orange-100 rounded group-hover:bg-orange-200 transition-colors">
                  <Settings size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">사이트 설정</p>
                  <p className="text-xs text-gray-500">GitHub 연동</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock size={20} />
              최근 활동
            </h2>
            <div className="space-y-3">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {activity.target}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>

            {recentActivities.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock size={48} className="mx-auto mb-2 text-gray-400" />
                <p>아직 활동 내역이 없습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 도움말 */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">🚀 시작하기</h3>
        <p className="text-sm text-blue-800 mb-3">
          어드민 사용이 처음이신가요? 아래 순서대로 진행해보세요:
        </p>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>사이트 기본 설정 → GitHub 저장소 연결</li>
          <li>레이아웃 설정 → 헤더/푸터 디자인</li>
          <li>페이지 관리 → 페이지 생성 및 블록 추가</li>
          <li>이미지 라이브러리 → 이미지 업로드</li>
          <li>배포 → GitHub Pages로 사이트 배포!</li>
        </ol>
      </div>
    </div>
  );
}

export default Dashboard;
