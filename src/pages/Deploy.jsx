import { useState } from 'react';
import { Rocket, CheckCircle, XCircle, Clock, User, AlertTriangle, Settings } from 'lucide-react';
import { deployToGitHub } from '../utils/github';

function Deploy() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployLog, setDeployLog] = useState([]);
  const [deployError, setDeployError] = useState(null);

  // GitHub 설정 (실제로는 SiteSettings에서 가져옴)
  const [githubConfig] = useState({
    repo: localStorage.getItem('github_repo') || '',
    branch: localStorage.getItem('github_branch') || 'gh-pages',
    token: localStorage.getItem('github_token') || '',
  });

  // 배포 이력 (실제로는 API에서 가져옴)
  const [deployHistory] = useState([
    {
      id: 1,
      status: 'success',
      version: 'v1.2.3',
      timestamp: '2024-04-14 15:30:25',
      duration: '2분 15초',
      deployer: {
        name: '김개발',
        email: 'dev@example.com',
        avatar: null,
      },
      changes: [
        '홈페이지 헤더 디자인 변경',
        '제품 페이지 이미지 추가',
        '푸터 연락처 정보 업데이트'
      ]
    },
    {
      id: 2,
      status: 'success',
      version: 'v1.2.2',
      timestamp: '2024-04-13 10:15:42',
      duration: '1분 58초',
      deployer: {
        name: '이디자인',
        email: 'design@example.com',
        avatar: null,
      },
      changes: [
        '메인 배너 이미지 교체',
        '서비스 소개 섹션 추가'
      ]
    },
    {
      id: 3,
      status: 'failed',
      version: 'v1.2.1',
      timestamp: '2024-04-12 16:45:10',
      duration: '45초',
      deployer: {
        name: '박관리',
        email: 'admin@example.com',
        avatar: null,
      },
      error: 'GitHub API 연결 실패',
      changes: [
        '메뉴 구조 변경'
      ]
    },
  ]);

  const handleDeploy = async () => {
    // GitHub 설정 확인
    if (!githubConfig.repo) {
      alert('GitHub 저장소가 설정되지 않았습니다.\n사이트 기본 설정에서 GitHub 저장소를 설정해주세요.');
      return;
    }

    if (!githubConfig.token) {
      alert('GitHub Personal Access Token이 설정되지 않았습니다.\n사이트 기본 설정에서 토큰을 설정해주세요.');
      return;
    }

    if (!window.confirm('사이트를 배포하시겠습니까?\n현재 GitHub Pages에 배포됩니다.')) {
      return;
    }

    setIsDeploying(true);
    setDeployLog([]);
    setDeployError(null);

    try {
      // 배포할 사이트 데이터 수집
      const siteData = {
        title: '내 사이트', // TODO: 실제 데이터
        description: '사이트 설명', // TODO: 실제 데이터
        pages: [], // TODO: 페이지 데이터
        images: [], // TODO: 이미지 데이터
      };

      // 진행 상황 표시
      setDeployLog([{ step: '배포 시작...', status: 'progress', timestamp: new Date().toISOString() }]);

      // GitHub Pages로 배포
      const result = await deployToGitHub(siteData, githubConfig.repo, githubConfig.branch);

      setDeployLog([
        ...result.log,
        {
          step: `배포 완료! 사이트 URL: ${result.url}`,
          status: 'success',
          timestamp: new Date().toISOString()
        }
      ]);

      alert(`배포가 완료되었습니다!\n\n사이트 URL: ${result.url}\n\n참고: GitHub Pages 반영까지 1-2분 정도 소요될 수 있습니다.`);
    } catch (error) {
      console.error('Deploy error:', error);
      setDeployError(error.message);
      setDeployLog(prev => [
        ...prev,
        { step: `배포 실패: ${error.message}`, status: 'error', timestamp: new Date().toISOString() }
      ]);
      alert(`배포에 실패했습니다.\n\n${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'failed':
        return <XCircle className="text-red-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return { text: '성공', color: 'text-green-700' };
      case 'failed':
        return { text: '실패', color: 'text-red-700' };
      case 'pending':
        return { text: '진행 중', color: 'text-yellow-700' };
      default:
        return { text: '알 수 없음', color: 'text-gray-700' };
    }
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">배포</h1>
        <p className="text-gray-600 mt-1">사이트를 GitHub Pages로 배포합니다</p>
      </div>

      {/* 배포 실행 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">새 배포</h2>

        <div className="space-y-4">
          {/* GitHub 설정 확인 */}
          {(!githubConfig.repo || !githubConfig.token) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-medium text-yellow-900 mb-1">GitHub 설정 필요</h3>
                <p className="text-sm text-yellow-800 mb-2">
                  배포하려면 먼저 GitHub 저장소와 Personal Access Token을 설정해야 합니다.
                </p>
                <a
                  href="/settings"
                  className="inline-flex items-center gap-1 text-sm text-yellow-900 underline hover:text-yellow-700"
                >
                  <Settings size={14} />
                  사이트 기본 설정으로 이동
                </a>
              </div>
            </div>
          )}

          {githubConfig.repo && githubConfig.token && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">연결된 GitHub 저장소</h3>
              <p className="text-sm text-green-800">
                📦 {githubConfig.repo} (브랜치: {githubConfig.branch})
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">배포 전 체크리스트</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ 모든 변경사항이 저장되었는지 확인</li>
              <li>✓ 미리보기로 페이지가 정상적으로 표시되는지 확인</li>
              <li>✓ 이미지가 제대로 업로드되었는지 확인</li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleDeploy}
              disabled={isDeploying || !githubConfig.repo || !githubConfig.token}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2
                ${isDeploying || !githubConfig.repo || !githubConfig.token
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              `}
            >
              <Rocket size={20} />
              {isDeploying ? '배포 중...' : '지금 배포하기'}
            </button>

            {isDeploying && (
              <div className="flex items-center gap-2 text-gray-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">배포를 진행하고 있습니다...</span>
              </div>
            )}
          </div>

          {/* 배포 로그 */}
          {deployLog.length > 0 && (
            <div className="mt-4 bg-gray-900 rounded-lg p-4 text-sm font-mono">
              {deployLog.map((log, index) => (
                <div key={index} className="flex items-start gap-2 mb-1">
                  <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                  <span className={
                    log.status === 'success' ? 'text-green-400' :
                    log.status === 'error' ? 'text-red-400' :
                    'text-blue-400'
                  }>
                    {log.step}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 배포 에러 */}
          {deployError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-900 mb-2">배포 오류</h3>
              <p className="text-sm text-red-800">{deployError}</p>
            </div>
          )}
        </div>
      </div>

      {/* 배포 이력 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">배포 이력</h2>
        </div>

        <div className="divide-y">
          {deployHistory.map((deploy) => {
            const statusInfo = getStatusText(deploy.status);

            return (
              <div key={deploy.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* 상태 아이콘 */}
                  <div className="mt-1">
                    {getStatusIcon(deploy.status)}
                  </div>

                  {/* 배포 정보 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {deploy.version}
                          </h3>
                          <span className={`text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.text}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {deploy.timestamp} · 소요 시간: {deploy.duration}
                        </p>
                      </div>
                    </div>

                    {/* 배포자 정보 */}
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                      <User size={16} />
                      <span className="font-medium">{deploy.deployer.name}</span>
                      <span className="text-gray-400">({deploy.deployer.email})</span>
                    </div>

                    {/* 변경 사항 */}
                    {deploy.changes && deploy.changes.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">변경 사항:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {deploy.changes.map((change, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 에러 메시지 */}
                    {deploy.status === 'failed' && deploy.error && (
                      <div className="mt-3 bg-red-50 border border-red-200 rounded p-3">
                        <p className="text-sm text-red-800">
                          <strong>오류:</strong> {deploy.error}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {deployHistory.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Rocket size={48} className="mx-auto mb-4 text-gray-400" />
            <p>배포 이력이 없습니다</p>
            <p className="text-sm mt-1">첫 배포를 진행해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Deploy;
