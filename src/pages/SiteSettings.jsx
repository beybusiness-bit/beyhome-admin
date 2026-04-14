import { useState, useEffect } from 'react';
import { Upload, X, Github, Check } from 'lucide-react';
import { useData } from '../contexts/DataContext';

function SiteSettings() {
  const { siteSettings, setSiteSettings } = useData();

  // 기본 사이트 설정 (DataContext에서 가져오거나 기본값)
  const [siteInfo, setSiteInfo] = useState(siteSettings.siteInfo || {
    name: '우리 회사',
    url: 'https://ourcompany.com',
    description: '최고의 제품과 서비스를 제공합니다',
    favicon: '',
    isPublic: true,
    language: 'ko',
    timezone: 'Asia/Seoul',
  });

  // SEO 설정 (DataContext에서 가져오거나 기본값)
  const [seoSettings, setSeoSettingsLocal] = useState(siteSettings.seo || {
    metaTitle: '우리 회사 - 최고의 제품과 서비스',
    metaDescription: '최고의 제품과 서비스를 제공하는 우리 회사입니다',
    metaKeywords: '제품, 서비스, 회사',
    ogImage: '',
    googleAnalyticsId: '',
    googleSearchConsole: '',
    naverSiteVerification: '',
    robotsTxt: 'User-agent: *\nAllow: /',
    sitemap: true,
  });

  // GitHub 연동 설정
  const [githubSettings, setGithubSettings] = useState({
    connected: false,
    repo: '',
    branch: 'gh-pages',
    token: '',
  });

  // localStorage에서 GitHub 설정 불러오기
  useEffect(() => {
    const savedRepo = localStorage.getItem('github_repo');
    const savedBranch = localStorage.getItem('github_branch');
    const savedToken = localStorage.getItem('github_token');

    if (savedRepo && savedToken) {
      setGithubSettings({
        connected: true,
        repo: savedRepo,
        branch: savedBranch || 'gh-pages',
        token: savedToken,
      });
    }
  }, []);

  // 화면 하단 부가 버튼 설정
  const [bottomButtons, setBottomButtons] = useState({
    bottomRight: {
      type: 'scroll', // 'scroll', 'external-link', 'none'
      scrollButton: {
        showUp: true,
        showDown: false,
        design: 'default-1', // 'default-1', 'default-2', 'default-3', 'custom'
        customImage: '',
        size: 50,
        marginBottom: 20,
        marginSide: 20,
      },
      externalLink: {
        image: '',
        url: '',
        size: 60,
        marginBottom: 20,
        marginSide: 20,
      },
    },
    bottomLeft: {
      type: 'none',
      scrollButton: {
        showUp: true,
        showDown: false,
        design: 'default-1',
        customImage: '',
        size: 50,
        marginBottom: 20,
        marginSide: 20,
      },
      externalLink: {
        image: '',
        url: '',
        size: 60,
        marginBottom: 20,
        marginSide: 20,
      },
    },
  });

  // 기본 스크롤 버튼 디자인
  const defaultScrollDesigns = [
    { id: 'default-1', name: '심플 화살표', preview: '↑' },
    { id: 'default-2', name: '둥근 화살표', preview: '⬆' },
    { id: 'default-3', name: '굵은 화살표', preview: '⏫' },
  ];

  const updateBottomButton = (position, field, value) => {
    setBottomButtons({
      ...bottomButtons,
      [position]: {
        ...bottomButtons[position],
        [field]: value,
      },
    });
  };

  const updateScrollButton = (position, field, value) => {
    setBottomButtons({
      ...bottomButtons,
      [position]: {
        ...bottomButtons[position],
        scrollButton: {
          ...bottomButtons[position].scrollButton,
          [field]: value,
        },
      },
    });
  };

  const updateExternalLink = (position, field, value) => {
    setBottomButtons({
      ...bottomButtons,
      [position]: {
        ...bottomButtons[position],
        externalLink: {
          ...bottomButtons[position].externalLink,
          [field]: value,
        },
      },
    });
  };

  const handleSave = () => {
    // GitHub 설정을 localStorage에 저장
    if (githubSettings.connected) {
      localStorage.setItem('github_repo', githubSettings.repo);
      localStorage.setItem('github_branch', githubSettings.branch);
      localStorage.setItem('github_token', githubSettings.token);
    } else {
      localStorage.removeItem('github_repo');
      localStorage.removeItem('github_branch');
      localStorage.removeItem('github_token');
    }

    // TODO: 다른 설정들도 저장 (API 연동 시)
    console.log('Saving site settings:', { siteInfo, seoSettings, githubSettings, bottomButtons });
    alert('사이트 설정이 저장되었습니다!');
  };

  const renderBottomButtonSettings = (position, label) => {
    const settings = bottomButtons[position];

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{label}</h2>

        {/* 버튼 타입 선택 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            버튼 종류
          </label>
          <select
            value={settings.type}
            onChange={(e) => updateBottomButton(position, 'type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">사용 안 함</option>
            <option value="scroll">스크롤 버튼</option>
            <option value="external-link">외부 링크</option>
          </select>
        </div>

        {/* 스크롤 버튼 설정 */}
        {settings.type === 'scroll' && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium text-gray-900">스크롤 버튼 설정</h3>

            {/* 버튼 방향 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                버튼 방향
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.scrollButton.showUp}
                    onChange={(e) => updateScrollButton(position, 'showUp', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">위로 (맨 위로 이동)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.scrollButton.showDown}
                    onChange={(e) => updateScrollButton(position, 'showDown', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">아래로 (맨 아래로 이동)</span>
                </label>
              </div>
            </div>

            {/* 디자인 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                디자인
              </label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {defaultScrollDesigns.map(design => (
                  <label
                    key={design.id}
                    className={`
                      border-2 rounded-lg p-4 cursor-pointer transition-all
                      ${settings.scrollButton.design === design.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={`scroll-design-${position}`}
                      value={design.id}
                      checked={settings.scrollButton.design === design.id}
                      onChange={(e) => updateScrollButton(position, 'design', e.target.value)}
                      className="hidden"
                    />
                    <div className="text-3xl text-center mb-2">{design.preview}</div>
                    <div className="text-xs text-center text-gray-600">{design.name}</div>
                  </label>
                ))}
              </div>

              <label
                className={`
                  border-2 rounded-lg p-4 cursor-pointer transition-all block
                  ${settings.scrollButton.design === 'custom'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <input
                  type="radio"
                  name={`scroll-design-${position}`}
                  value="custom"
                  checked={settings.scrollButton.design === 'custom'}
                  onChange={(e) => updateScrollButton(position, 'design', e.target.value)}
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  <Upload size={24} className="text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">커스텀 이미지</div>
                    <div className="text-xs text-gray-500">권장 크기: 100x100px (투명 배경 PNG)</div>
                  </div>
                </div>
              </label>

              {settings.scrollButton.design === 'custom' && (
                <div className="mt-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm"
                    onChange={(e) => {
                      // TODO: 이미지 업로드 처리
                      console.log('Upload custom scroll button image:', e.target.files[0]);
                    }}
                  />
                </div>
              )}
            </div>

            {/* 버튼 크기 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                버튼 크기 (px)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="30"
                  max="80"
                  value={settings.scrollButton.size}
                  onChange={(e) => updateScrollButton(position, 'size', parseInt(e.target.value))}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="30"
                  max="80"
                  value={settings.scrollButton.size}
                  onChange={(e) => updateScrollButton(position, 'size', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 여백 설정 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  하단 여백 (px)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.scrollButton.marginBottom}
                  onChange={(e) => updateScrollButton(position, 'marginBottom', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  좌/우 여백 (px)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.scrollButton.marginSide}
                  onChange={(e) => updateScrollButton(position, 'marginSide', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 외부 링크 설정 */}
        {settings.type === 'external-link' && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium text-gray-900">외부 링크 설정</h3>

            {/* 이미지 업로드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                버튼 이미지
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">이미지를 업로드하세요</p>
                <p className="text-xs text-gray-500 mb-3">권장 크기: 120x120px (투명 배경 PNG)</p>
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm"
                  onChange={(e) => {
                    // TODO: 이미지 업로드 처리
                    console.log('Upload external link image:', e.target.files[0]);
                  }}
                />
              </div>
            </div>

            {/* URL 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                링크 URL
              </label>
              <input
                type="url"
                value={settings.externalLink.url}
                onChange={(e) => updateExternalLink(position, 'url', e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                새 창에서 열립니다
              </p>
            </div>

            {/* 버튼 크기 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                버튼 크기 (px)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={settings.externalLink.size}
                  onChange={(e) => updateExternalLink(position, 'size', parseInt(e.target.value))}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="40"
                  max="100"
                  value={settings.externalLink.size}
                  onChange={(e) => updateExternalLink(position, 'size', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 여백 설정 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  하단 여백 (px)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.externalLink.marginBottom}
                  onChange={(e) => updateExternalLink(position, 'marginBottom', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  좌/우 여백 (px)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.externalLink.marginSide}
                  onChange={(e) => updateExternalLink(position, 'marginSide', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">사이트 기본 설정</h1>
        <p className="text-gray-600 mt-1">사이트의 기본 정보와 기능을 설정합니다</p>
      </div>

      <div className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">기본 정보</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사이트 이름
                </label>
                <input
                  type="text"
                  value={siteInfo.name}
                  onChange={(e) => setSiteInfo({ ...siteInfo, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사이트 URL
                </label>
                <input
                  type="url"
                  value={siteInfo.url}
                  onChange={(e) => setSiteInfo({ ...siteInfo, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                사이트 설명
              </label>
              <textarea
                value={siteInfo.description}
                onChange={(e) => setSiteInfo({ ...siteInfo, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  언어
                </label>
                <select
                  value={siteInfo.language}
                  onChange={(e) => setSiteInfo({ ...siteInfo, language: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  타임존
                </label>
                <select
                  value={siteInfo.timezone}
                  onChange={(e) => setSiteInfo({ ...siteInfo, timezone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Asia/Seoul">서울 (Asia/Seoul)</option>
                  <option value="America/New_York">뉴욕 (America/New_York)</option>
                  <option value="Europe/London">런던 (Europe/London)</option>
                  <option value="Asia/Tokyo">도쿄 (Asia/Tokyo)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                파비콘 (Favicon)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">파비콘 업로드</p>
                <p className="text-xs text-gray-500 mb-2">권장 크기: 32x32px 또는 64x64px (PNG, ICO)</p>
                <input type="file" accept="image/png,image/x-icon,image/ico" className="text-sm" />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={siteInfo.isPublic}
                  onChange={(e) => setSiteInfo({ ...siteInfo, isPublic: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">사이트 공개</span>
              </label>
            </div>
          </div>
        </div>

        {/* SEO 설정 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO 설정</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                메타 타이틀
              </label>
              <input
                type="text"
                value={seoSettings.metaTitle}
                onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={60}
              />
              <p className="text-xs text-gray-500 mt-1">{seoSettings.metaTitle.length}/60자</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                메타 설명
              </label>
              <textarea
                value={seoSettings.metaDescription}
                onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">{seoSettings.metaDescription.length}/160자</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                메타 키워드 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={seoSettings.metaKeywords}
                onChange={(e) => setSeoSettings({ ...seoSettings, metaKeywords: e.target.value })}
                placeholder="제품, 서비스, 회사"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG 이미지 (소셜 미디어 공유 시)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">이미지 업로드</p>
                <p className="text-xs text-gray-500 mb-2">권장 크기: 1200x630px (PNG, JPG)</p>
                <input type="file" accept="image/*" className="text-sm" />
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-3">검색 엔진 연동</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={seoSettings.googleAnalyticsId}
                    onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Google Search Console 인증 코드
                  </label>
                  <input
                    type="text"
                    value={seoSettings.googleSearchConsole}
                    onChange={(e) => setSeoSettings({ ...seoSettings, googleSearchConsole: e.target.value })}
                    placeholder="google1234567890abcdef.html"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    네이버 사이트 인증 코드
                  </label>
                  <input
                    type="text"
                    value={seoSettings.naverSiteVerification}
                    onChange={(e) => setSeoSettings({ ...seoSettings, naverSiteVerification: e.target.value })}
                    placeholder="naver-site-verification: ..."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={seoSettings.sitemap}
                  onChange={(e) => setSeoSettings({ ...seoSettings, sitemap: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">자동 사이트맵 생성</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  robots.txt
                </label>
                <textarea
                  value={seoSettings.robotsTxt}
                  onChange={(e) => setSeoSettings({ ...seoSettings, robotsTxt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>

        {/* GitHub 연동 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Github size={24} />
            GitHub 연동
          </h2>

          {!githubSettings.connected ? (
            <div>
              <p className="text-gray-600 mb-4">
                GitHub 저장소에 연결하여 이미지를 저장하고 사이트를 배포합니다
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    저장소 (Repository)
                  </label>
                  <input
                    type="text"
                    value={githubSettings.repo}
                    onChange={(e) => setGithubSettings({ ...githubSettings, repo: e.target.value })}
                    placeholder="username/repository"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    브랜치
                  </label>
                  <input
                    type="text"
                    value={githubSettings.branch}
                    onChange={(e) => setGithubSettings({ ...githubSettings, branch: e.target.value })}
                    placeholder="main"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Access Token
                  </label>
                  <input
                    type="password"
                    value={githubSettings.token}
                    onChange={(e) => setGithubSettings({ ...githubSettings, token: e.target.value })}
                    placeholder="ghp_xxxxxxxxxxxx"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    GitHub Settings → Developer settings → Personal access tokens에서 생성
                  </p>
                </div>
                <button
                  onClick={() => setGithubSettings({ ...githubSettings, connected: true })}
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Github size={20} />
                  GitHub 연결
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <Check size={20} />
                <span className="font-medium">연결됨: {githubSettings.repo}</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 브랜치: {githubSettings.branch}</p>
                <p>• 이미지 저장 위치: assets/images/</p>
                <p>• 배포: GitHub Pages</p>
              </div>
              <button
                onClick={() => setGithubSettings({ ...githubSettings, connected: false })}
                className="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
              >
                연결 해제
              </button>
            </div>
          )}
        </div>

        {/* 화면 하단 부가 버튼 */}
        {renderBottomButtonSettings('bottomRight', '우하단 버튼')}
        {renderBottomButtonSettings('bottomLeft', '좌하단 버튼')}

        {/* 저장 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default SiteSettings;
