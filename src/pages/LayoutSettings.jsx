import { useState } from 'react';
import { Plus, Trash2, GripVertical, Upload } from 'lucide-react';

function LayoutSettings() {
  // 헤더 설정
  const [headerSettings, setHeaderSettings] = useState({
    height: 80,
    position: 'fixed', // 'fixed' or 'scroll'
    backgroundColor: '#FFFFFF',
    transparent: false,
    shadow: true,

    // 로고 설정
    logoType: 'image', // 'image' or 'text'
    logoImage: '',
    logoText: '우리 회사',
    logoTextSize: '24',
    logoTextColor: '#1F2937',
    logoTextWeight: 'bold', // 'normal', 'bold', 'bolder'
    logoPosition: 'left', // 'left', 'center', 'right'
    logoSize: 'medium', // 'small', 'medium', 'large' (이미지일 때만)
    showLogo: true,

    // 메뉴 스타일
    menuTextColor: '#1F2937',
    menuHoverColor: '#3B82F6',
    menuFontSize: '16',
    menuFontWeight: 'normal',
    menuSpacing: 'normal', // 'tight', 'normal', 'loose'
    menuStyle: 'underline', // 'none', 'underline', 'background', 'border'

    // 드롭다운 메뉴
    dropdownBgColor: '#FFFFFF',
    dropdownTextColor: '#1F2937',
    dropdownHoverBgColor: '#F3F4F6',
    dropdownHoverTextColor: '#3B82F6',
    dropdownBorderRadius: '8', // 모서리 둥글기
    dropdownShowDivider: true, // 구분선 표시
    dropdownDividerColor: '#E5E7EB', // 구분선 색상
    dropdownDividerStyle: 'solid', // 'solid', 'dashed', 'dotted'
    dropdownShadow: 'medium', // 'none', 'small', 'medium', 'large'

    // 모바일 메뉴
    mobileMenuBgColor: '#FFFFFF',
    mobileMenuTextColor: '#1F2937',
    mobileMenuIconColor: '#1F2937',

    // 로그인/마이페이지 버튼
    authButtonStyle: 'outline', // 'solid', 'outline', 'text'
    authButtonColor: '#3B82F6',
    authButtonTextColor: '#FFFFFF',
    authButtonBorderRadius: '8',

    // 검색
    showSearch: false,
  });

  // 푸터 설정
  const [footerSettings, setFooterSettings] = useState({
    showFooter: true,
    height: 200,
    position: 'scroll', // 'fixed' or 'scroll'
    backgroundColor: '#1F2937',
    textColor: '#FFFFFF',
    companyName: '우리 회사',
    address: '서울시 강남구',
    email: 'contact@example.com',
    phone: '02-1234-5678',
    copyright: '© 2024 우리 회사. All rights reserved.',
    showSocialMedia: true,
    layout: 'columns', // 'columns', 'centered', 'minimal'

    // 이용약관 / 개인정보처리방침
    showTerms: true,
    termsText: '이용약관',
    termsUrl: '/terms',
    showPrivacy: true,
    privacyText: '개인정보처리방침',
    privacyUrl: '/privacy',
    policyTextColor: '#9CA3AF',
    policyHoverColor: '#FFFFFF',
  });

  // 소셜 미디어 채널
  const [socialChannels, setSocialChannels] = useState([
    { id: 1, platform: 'instagram', icon: 'instagram', url: 'https://instagram.com/ourcompany' },
    { id: 2, platform: 'facebook', icon: 'facebook', url: 'https://facebook.com/ourcompany' },
  ]);

  // 사용 가능한 소셜 미디어 플랫폼
  const availablePlatforms = [
    { value: 'instagram', label: '인스타그램', icon: 'instagram' },
    { value: 'facebook', label: '페이스북', icon: 'facebook' },
    { value: 'youtube', label: '유튜브', icon: 'youtube' },
    { value: 'twitter', label: '트위터(X)', icon: 'twitter' },
    { value: 'linkedin', label: '링크드인', icon: 'linkedin' },
    { value: 'tiktok', label: '틱톡', icon: 'tiktok' },
    { value: 'naver-blog', label: '네이버 블로그', icon: 'naver' },
    { value: 'kakao', label: '카카오톡 채널', icon: 'kakao' },
  ];

  const addSocialChannel = () => {
    const newId = Math.max(0, ...socialChannels.map(c => c.id)) + 1;
    setSocialChannels([
      ...socialChannels,
      { id: newId, platform: 'instagram', icon: 'instagram', url: '' }
    ]);
  };

  const removeSocialChannel = (id) => {
    setSocialChannels(socialChannels.filter(c => c.id !== id));
  };

  const updateSocialChannel = (id, field, value) => {
    setSocialChannels(socialChannels.map(channel => {
      if (channel.id === id) {
        if (field === 'platform') {
          const platform = availablePlatforms.find(p => p.value === value);
          return { ...channel, platform: value, icon: platform?.icon || value };
        }
        return { ...channel, [field]: value };
      }
      return channel;
    }));
  };

  const handleSave = () => {
    console.log('Saving layout settings:', { headerSettings, footerSettings, socialChannels });
    alert('레이아웃 설정이 저장되었습니다!');
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">레이아웃 설정</h1>
        <p className="text-gray-600 mt-1">사이트의 헤더와 푸터를 설정합니다</p>
      </div>

      <div className="space-y-6">
        {/* 헤더 설정 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">헤더 설정</h2>

          <div className="space-y-4">
            {/* 헤더 높이 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                헤더 높이 (px)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="60"
                  max="120"
                  value={headerSettings.height}
                  onChange={(e) => setHeaderSettings({ ...headerSettings, height: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="60"
                  max="120"
                  value={headerSettings.height}
                  onChange={(e) => setHeaderSettings({ ...headerSettings, height: parseInt(e.target.value) })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">권장 범위: 60-120px</p>
            </div>

            {/* 헤더 고정 옵션 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                헤더 위치
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="headerPosition"
                    value="fixed"
                    checked={headerSettings.position === 'fixed'}
                    onChange={(e) => setHeaderSettings({ ...headerSettings, position: e.target.value })}
                  />
                  <div>
                    <div className="font-medium text-gray-900">상단 고정</div>
                    <div className="text-sm text-gray-500">스크롤 시 헤더가 화면 상단에 고정됩니다</div>
                  </div>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="headerPosition"
                    value="scroll"
                    checked={headerSettings.position === 'scroll'}
                    onChange={(e) => setHeaderSettings({ ...headerSettings, position: e.target.value })}
                  />
                  <div>
                    <div className="font-medium text-gray-900">스크롤 따라 이동</div>
                    <div className="text-sm text-gray-500">스크롤 시 헤더가 화면 밖으로 이동합니다</div>
                  </div>
                </label>
              </div>
            </div>

            {/* 헤더 색상 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                배경 색상
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={headerSettings.backgroundColor}
                  onChange={(e) => setHeaderSettings({ ...headerSettings, backgroundColor: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={headerSettings.backgroundColor}
                  onChange={(e) => setHeaderSettings({ ...headerSettings, backgroundColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 로고 설정 */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-3">로고 설정</h3>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={headerSettings.showLogo}
                    onChange={(e) => setHeaderSettings({ ...headerSettings, showLogo: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">로고 표시</span>
                </label>

                {headerSettings.showLogo && (
                  <>
                    {/* 로고 타입 선택 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        로고 타입
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="logoType"
                            value="image"
                            checked={headerSettings.logoType === 'image'}
                            onChange={(e) => setHeaderSettings({ ...headerSettings, logoType: e.target.value })}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700">이미지</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="logoType"
                            value="text"
                            checked={headerSettings.logoType === 'text'}
                            onChange={(e) => setHeaderSettings({ ...headerSettings, logoType: e.target.value })}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700">텍스트</span>
                        </label>
                      </div>
                    </div>

                    {/* 이미지 로고 설정 */}
                    {headerSettings.logoType === 'image' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            로고 이미지
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-1">로고 업로드</p>
                            <input type="file" accept="image/*" className="text-sm" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            로고 크기
                          </label>
                          <select
                            value={headerSettings.logoSize}
                            onChange={(e) => setHeaderSettings({ ...headerSettings, logoSize: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="small">작게</option>
                            <option value="medium">보통</option>
                            <option value="large">크게</option>
                          </select>
                        </div>
                      </>
                    )}

                    {/* 텍스트 로고 설정 */}
                    {headerSettings.logoType === 'text' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            로고 텍스트
                          </label>
                          <input
                            type="text"
                            value={headerSettings.logoText}
                            onChange={(e) => setHeaderSettings({ ...headerSettings, logoText: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              폰트 크기 (px)
                            </label>
                            <input
                              type="number"
                              min="12"
                              max="48"
                              value={headerSettings.logoTextSize}
                              onChange={(e) => setHeaderSettings({ ...headerSettings, logoTextSize: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              폰트 굵기
                            </label>
                            <select
                              value={headerSettings.logoTextWeight}
                              onChange={(e) => setHeaderSettings({ ...headerSettings, logoTextWeight: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="normal">보통</option>
                              <option value="bold">굵게</option>
                              <option value="bolder">더 굵게</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            텍스트 색상
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={headerSettings.logoTextColor}
                              onChange={(e) => setHeaderSettings({ ...headerSettings, logoTextColor: e.target.value })}
                              className="h-10 w-20 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={headerSettings.logoTextColor}
                              onChange={(e) => setHeaderSettings({ ...headerSettings, logoTextColor: e.target.value })}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* 로고 위치 (공통) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        로고 위치
                      </label>
                      <select
                        value={headerSettings.logoPosition}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, logoPosition: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="left">왼쪽</option>
                        <option value="center">가운데</option>
                        <option value="right">오른쪽</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 메뉴 스타일 */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-3">메뉴 스타일</h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      메뉴 텍스트 색상
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={headerSettings.menuTextColor}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, menuTextColor: e.target.value })}
                        className="h-10 w-20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={headerSettings.menuTextColor}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, menuTextColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      호버 색상
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={headerSettings.menuHoverColor}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, menuHoverColor: e.target.value })}
                        className="h-10 w-20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={headerSettings.menuHoverColor}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, menuHoverColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      폰트 크기 (px)
                    </label>
                    <input
                      type="number"
                      min="12"
                      max="24"
                      value={headerSettings.menuFontSize}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, menuFontSize: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      폰트 굵기
                    </label>
                    <select
                      value={headerSettings.menuFontWeight}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, menuFontWeight: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="normal">보통</option>
                      <option value="bold">굵게</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      메뉴 간격
                    </label>
                    <select
                      value={headerSettings.menuSpacing}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, menuSpacing: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="tight">좁게</option>
                      <option value="normal">보통</option>
                      <option value="loose">넓게</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    호버 효과
                  </label>
                  <select
                    value={headerSettings.menuStyle}
                    onChange={(e) => setHeaderSettings({ ...headerSettings, menuStyle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">없음</option>
                    <option value="underline">밑줄</option>
                    <option value="background">배경색</option>
                    <option value="border">테두리</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 드롭다운 메뉴 */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-3">드롭다운 메뉴</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    배경 색상
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={headerSettings.dropdownBgColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownBgColor: e.target.value })}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={headerSettings.dropdownBgColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownBgColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    텍스트 색상
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={headerSettings.dropdownTextColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownTextColor: e.target.value })}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={headerSettings.dropdownTextColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownTextColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    호버 배경 색상
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={headerSettings.dropdownHoverBgColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownHoverBgColor: e.target.value })}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={headerSettings.dropdownHoverBgColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownHoverBgColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    호버 텍스트 색상
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={headerSettings.dropdownHoverTextColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownHoverTextColor: e.target.value })}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={headerSettings.dropdownHoverTextColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownHoverTextColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* 드롭다운 메뉴 스타일 */}
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      모서리 둥글기 (px)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={headerSettings.dropdownBorderRadius}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownBorderRadius: e.target.value })}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={headerSettings.dropdownBorderRadius}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownBorderRadius: e.target.value })}
                        className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      그림자
                    </label>
                    <select
                      value={headerSettings.dropdownShadow}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownShadow: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="none">없음</option>
                      <option value="small">작게</option>
                      <option value="medium">보통</option>
                      <option value="large">크게</option>
                    </select>
                  </div>
                </div>

                {/* 메뉴 구분선 */}
                <div>
                  <label className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={headerSettings.dropdownShowDivider}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownShowDivider: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">메뉴 사이 구분선 표시</span>
                  </label>

                  {headerSettings.dropdownShowDivider && (
                    <div className="grid grid-cols-2 gap-4 ml-6">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          구분선 스타일
                        </label>
                        <select
                          value={headerSettings.dropdownDividerStyle}
                          onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownDividerStyle: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="solid">실선 (━━━)</option>
                          <option value="dashed">긴 점선 (─ ─ ─)</option>
                          <option value="dotted">짧은 점선 (· · ·)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          구분선 색상
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={headerSettings.dropdownDividerColor}
                            onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownDividerColor: e.target.value })}
                            className="h-10 w-16 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={headerSettings.dropdownDividerColor}
                            onChange={(e) => setHeaderSettings({ ...headerSettings, dropdownDividerColor: e.target.value })}
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 모바일 메뉴 */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-3">모바일 메뉴</h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    배경 색상
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={headerSettings.mobileMenuBgColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, mobileMenuBgColor: e.target.value })}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={headerSettings.mobileMenuBgColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, mobileMenuBgColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    텍스트 색상
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={headerSettings.mobileMenuTextColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, mobileMenuTextColor: e.target.value })}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={headerSettings.mobileMenuTextColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, mobileMenuTextColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    아이콘 색상
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={headerSettings.mobileMenuIconColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, mobileMenuIconColor: e.target.value })}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={headerSettings.mobileMenuIconColor}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, mobileMenuIconColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 로그인/마이페이지 버튼 */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-3">로그인 / 마이페이지 버튼</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    버튼 스타일
                  </label>
                  <select
                    value={headerSettings.authButtonStyle}
                    onChange={(e) => setHeaderSettings({ ...headerSettings, authButtonStyle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="solid">채우기 (Solid)</option>
                    <option value="outline">외곽선 (Outline)</option>
                    <option value="text">텍스트만</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      버튼 색상
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={headerSettings.authButtonColor}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, authButtonColor: e.target.value })}
                        className="h-10 w-20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={headerSettings.authButtonColor}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, authButtonColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      텍스트 색상
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={headerSettings.authButtonTextColor}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, authButtonTextColor: e.target.value })}
                        className="h-10 w-20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={headerSettings.authButtonTextColor}
                        onChange={(e) => setHeaderSettings({ ...headerSettings, authButtonTextColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    둥글기 (px)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="24"
                      value={headerSettings.authButtonBorderRadius}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, authButtonBorderRadius: e.target.value })}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={headerSettings.authButtonBorderRadius}
                      onChange={(e) => setHeaderSettings({ ...headerSettings, authButtonBorderRadius: e.target.value })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 옵션 */}
            <div className="border-t pt-4 space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={headerSettings.transparent}
                  onChange={(e) => setHeaderSettings({ ...headerSettings, transparent: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">투명 배경 (홈 페이지 상단)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={headerSettings.shadow}
                  onChange={(e) => setHeaderSettings({ ...headerSettings, shadow: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">그림자 효과</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={headerSettings.showSearch}
                  onChange={(e) => setHeaderSettings({ ...headerSettings, showSearch: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">검색 바 표시</span>
              </label>
            </div>
          </div>
        </div>

        {/* 푸터 설정 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">푸터 설정</h2>

          <div className="space-y-4">
            {/* 푸터 표시 여부 */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={footerSettings.showFooter}
                  onChange={(e) => setFooterSettings({ ...footerSettings, showFooter: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">푸터 표시</span>
              </label>
            </div>

            {footerSettings.showFooter && (
              <>
                {/* 푸터 높이 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    푸터 높이 (px)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="100"
                      max="400"
                      value={footerSettings.height}
                      onChange={(e) => setFooterSettings({ ...footerSettings, height: parseInt(e.target.value) })}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="100"
                      max="400"
                      value={footerSettings.height}
                      onChange={(e) => setFooterSettings({ ...footerSettings, height: parseInt(e.target.value) })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">권장 범위: 100-400px</p>
                </div>

                {/* 푸터 고정 옵션 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    푸터 위치
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="footerPosition"
                        value="scroll"
                        checked={footerSettings.position === 'scroll'}
                        onChange={(e) => setFooterSettings({ ...footerSettings, position: e.target.value })}
                      />
                      <div>
                        <div className="font-medium text-gray-900">일반 (하단)</div>
                        <div className="text-sm text-gray-500">콘텐츠 아래에 위치합니다</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="footerPosition"
                        value="fixed"
                        checked={footerSettings.position === 'fixed'}
                        onChange={(e) => setFooterSettings({ ...footerSettings, position: e.target.value })}
                      />
                      <div>
                        <div className="font-medium text-gray-900">하단 고정</div>
                        <div className="text-sm text-gray-500">화면 하단에 항상 고정됩니다</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 푸터 색상 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      배경 색상
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={footerSettings.backgroundColor}
                        onChange={(e) => setFooterSettings({ ...footerSettings, backgroundColor: e.target.value })}
                        className="h-10 w-20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={footerSettings.backgroundColor}
                        onChange={(e) => setFooterSettings({ ...footerSettings, backgroundColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      텍스트 색상
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={footerSettings.textColor}
                        onChange={(e) => setFooterSettings({ ...footerSettings, textColor: e.target.value })}
                        className="h-10 w-20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={footerSettings.textColor}
                        onChange={(e) => setFooterSettings({ ...footerSettings, textColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 레이아웃 선택 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    푸터 레이아웃
                  </label>
                  <select
                    value={footerSettings.layout}
                    onChange={(e) => setFooterSettings({ ...footerSettings, layout: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="columns">다단 (회사정보 | 링크 | SNS)</option>
                    <option value="centered">중앙 정렬</option>
                    <option value="minimal">미니멀 (한 줄)</option>
                  </select>
                </div>

                {/* 회사 정보 */}
                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-3">회사 정보</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        회사명
                      </label>
                      <input
                        type="text"
                        value={footerSettings.companyName}
                        onChange={(e) => setFooterSettings({ ...footerSettings, companyName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        주소
                      </label>
                      <input
                        type="text"
                        value={footerSettings.address}
                        onChange={(e) => setFooterSettings({ ...footerSettings, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이메일
                      </label>
                      <input
                        type="email"
                        value={footerSettings.email}
                        onChange={(e) => setFooterSettings({ ...footerSettings, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        전화번호
                      </label>
                      <input
                        type="tel"
                        value={footerSettings.phone}
                        onChange={(e) => setFooterSettings({ ...footerSettings, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        저작권 표시
                      </label>
                      <input
                        type="text"
                        value={footerSettings.copyright}
                        onChange={(e) => setFooterSettings({ ...footerSettings, copyright: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 소셜 미디어 채널 */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">소셜 미디어 채널</h3>
                      <label className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          checked={footerSettings.showSocialMedia}
                          onChange={(e) => setFooterSettings({ ...footerSettings, showSocialMedia: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">SNS 링크 표시</span>
                      </label>
                    </div>
                    {footerSettings.showSocialMedia && (
                      <button
                        onClick={addSocialChannel}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                      >
                        <Plus size={16} />
                        추가
                      </button>
                    )}
                  </div>

                  {footerSettings.showSocialMedia && (
                    <div className="space-y-3">
                      {socialChannels.length === 0 ? (
                        <p className="text-sm text-gray-500 py-4 text-center">
                          추가된 소셜 미디어 채널이 없습니다
                        </p>
                      ) : (
                        socialChannels.map((channel, index) => (
                          <div key={channel.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                            <GripVertical size={20} className="text-gray-400 cursor-move" />

                            <div className="flex-1 grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  플랫폼
                                </label>
                                <select
                                  value={channel.platform}
                                  onChange={(e) => updateSocialChannel(channel.id, 'platform', e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  {availablePlatforms.map(platform => (
                                    <option key={platform.value} value={platform.value}>
                                      {platform.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  URL
                                </label>
                                <input
                                  type="url"
                                  value={channel.url}
                                  onChange={(e) => updateSocialChannel(channel.id, 'url', e.target.value)}
                                  placeholder="https://..."
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            <button
                              onClick={() => removeSocialChannel(channel.id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {footerSettings.showSocialMedia && socialChannels.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      💡 드래그하여 순서를 변경할 수 있습니다
                    </p>
                  )}
                </div>

                {/* 이용약관 / 개인정보처리방침 */}
                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-3">이용약관 / 개인정보처리방침</h3>

                  <div className="space-y-4">
                    {/* 이용약관 */}
                    <div>
                      <label className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          checked={footerSettings.showTerms}
                          onChange={(e) => setFooterSettings({ ...footerSettings, showTerms: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">이용약관 링크 표시</span>
                      </label>

                      {footerSettings.showTerms && (
                        <div className="grid grid-cols-2 gap-4 ml-6">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              표시 텍스트
                            </label>
                            <input
                              type="text"
                              value={footerSettings.termsText}
                              onChange={(e) => setFooterSettings({ ...footerSettings, termsText: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              URL
                            </label>
                            <input
                              type="text"
                              value={footerSettings.termsUrl}
                              onChange={(e) => setFooterSettings({ ...footerSettings, termsUrl: e.target.value })}
                              placeholder="/terms"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 개인정보처리방침 */}
                    <div>
                      <label className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          checked={footerSettings.showPrivacy}
                          onChange={(e) => setFooterSettings({ ...footerSettings, showPrivacy: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">개인정보처리방침 링크 표시</span>
                      </label>

                      {footerSettings.showPrivacy && (
                        <div className="grid grid-cols-2 gap-4 ml-6">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              표시 텍스트
                            </label>
                            <input
                              type="text"
                              value={footerSettings.privacyText}
                              onChange={(e) => setFooterSettings({ ...footerSettings, privacyText: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              URL
                            </label>
                            <input
                              type="text"
                              value={footerSettings.privacyUrl}
                              onChange={(e) => setFooterSettings({ ...footerSettings, privacyUrl: e.target.value })}
                              placeholder="/privacy"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 링크 색상 */}
                    {(footerSettings.showTerms || footerSettings.showPrivacy) && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            링크 색상
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={footerSettings.policyTextColor}
                              onChange={(e) => setFooterSettings({ ...footerSettings, policyTextColor: e.target.value })}
                              className="h-10 w-16 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={footerSettings.policyTextColor}
                              onChange={(e) => setFooterSettings({ ...footerSettings, policyTextColor: e.target.value })}
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            호버 색상
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={footerSettings.policyHoverColor}
                              onChange={(e) => setFooterSettings({ ...footerSettings, policyHoverColor: e.target.value })}
                              className="h-10 w-16 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={footerSettings.policyHoverColor}
                              onChange={(e) => setFooterSettings({ ...footerSettings, policyHoverColor: e.target.value })}
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

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

export default LayoutSettings;
