import { useState } from 'react';

function DesignSettings() {
  const [design, setDesign] = useState({
    // 색상
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    linkColor: '#3B82F6',
    successColor: '#10B981',
    warningColor: '#F59E0B',
    errorColor: '#EF4444',

    // 폰트
    fontFamily: 'system-ui',
    fontSize: '16',
    headingFont: 'system-ui',
    lineHeight: '1.6',
    letterSpacing: 'normal',

    // 간격
    borderRadius: '8',
    spacing: 'medium', // 'tight', 'medium', 'loose'
    containerWidth: '1200',

    // 버튼 스타일
    buttonStyle: 'rounded', // 'square', 'rounded', 'pill'
    buttonSize: 'medium', // 'small', 'medium', 'large'

    // 그림자
    cardShadow: 'medium', // 'none', 'small', 'medium', 'large'

    // 애니메이션
    enableAnimations: true,
    animationSpeed: 'normal', // 'slow', 'normal', 'fast'
  });

  const fontOptions = [
    { value: 'system-ui', label: '시스템 기본' },
    { value: 'Georgia, serif', label: 'Georgia (세리프)' },
    { value: '"Times New Roman", serif', label: 'Times New Roman' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: '"Helvetica Neue", sans-serif', label: 'Helvetica' },
    { value: '"Noto Sans KR", sans-serif', label: 'Noto Sans Korean' },
    { value: '"Spoqa Han Sans Neo", sans-serif', label: 'Spoqa 한 산스' },
    { value: 'monospace', label: 'Monospace (코드용)' },
  ];

  const handleSave = () => {
    console.log('Saving design settings:', design);
    alert('디자인 설정이 저장되었습니다!');
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">기본 디자인 설정</h1>
        <p className="text-gray-600 mt-1">사이트 전체에 적용되는 글로벌 디자인을 설정합니다</p>
      </div>

      <div className="space-y-6">
        {/* 색상 설정 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">색상</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* 주 색상 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                주 색상 (Primary) - 버튼, 링크 등
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={design.primaryColor}
                  onChange={(e) => setDesign({ ...design, primaryColor: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={design.primaryColor}
                  onChange={(e) => setDesign({ ...design, primaryColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 보조 색상 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                보조 색상 (Secondary)
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={design.secondaryColor}
                  onChange={(e) => setDesign({ ...design, secondaryColor: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={design.secondaryColor}
                  onChange={(e) => setDesign({ ...design, secondaryColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 강조 색상 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                강조 색상 (Accent)
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={design.accentColor}
                  onChange={(e) => setDesign({ ...design, accentColor: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={design.accentColor}
                  onChange={(e) => setDesign({ ...design, accentColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 배경 색상 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                배경 색상
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={design.backgroundColor}
                  onChange={(e) => setDesign({ ...design, backgroundColor: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={design.backgroundColor}
                  onChange={(e) => setDesign({ ...design, backgroundColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 텍스트 색상 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                텍스트 색상
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={design.textColor}
                  onChange={(e) => setDesign({ ...design, textColor: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={design.textColor}
                  onChange={(e) => setDesign({ ...design, textColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 링크 색상 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                링크 색상
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={design.linkColor}
                  onChange={(e) => setDesign({ ...design, linkColor: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={design.linkColor}
                  onChange={(e) => setDesign({ ...design, linkColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 상태 색상 */}
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-900 mb-3">상태 색상</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  성공 (Success)
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={design.successColor}
                    onChange={(e) => setDesign({ ...design, successColor: e.target.value })}
                    className="h-10 w-16 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={design.successColor}
                    onChange={(e) => setDesign({ ...design, successColor: e.target.value })}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  경고 (Warning)
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={design.warningColor}
                    onChange={(e) => setDesign({ ...design, warningColor: e.target.value })}
                    className="h-10 w-16 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={design.warningColor}
                    onChange={(e) => setDesign({ ...design, warningColor: e.target.value })}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  오류 (Error)
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={design.errorColor}
                    onChange={(e) => setDesign({ ...design, errorColor: e.target.value })}
                    className="h-10 w-16 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={design.errorColor}
                    onChange={(e) => setDesign({ ...design, errorColor: e.target.value })}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 폰트 설정 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">타이포그래피</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                본문 폰트
              </label>
              <select
                value={design.fontFamily}
                onChange={(e) => setDesign({ ...design, fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 폰트
              </label>
              <select
                value={design.headingFont}
                onChange={(e) => setDesign({ ...design, headingFont: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기본 폰트 크기 (px)
              </label>
              <input
                type="number"
                min="12"
                max="24"
                value={design.fontSize}
                onChange={(e) => setDesign({ ...design, fontSize: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                줄 간격
              </label>
              <select
                value={design.lineHeight}
                onChange={(e) => setDesign({ ...design, lineHeight: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1.4">좁게 (1.4)</option>
                <option value="1.6">보통 (1.6)</option>
                <option value="1.8">넓게 (1.8)</option>
                <option value="2.0">매우 넓게 (2.0)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                자간
              </label>
              <select
                value={design.letterSpacing}
                onChange={(e) => setDesign({ ...design, letterSpacing: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="tight">좁게 (-0.05em)</option>
                <option value="normal">보통 (0)</option>
                <option value="wide">넓게 (0.05em)</option>
                <option value="wider">매우 넓게 (0.1em)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 레이아웃 & 간격 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">레이아웃 & 간격</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                컨테이너 최대 너비 (px)
              </label>
              <input
                type="number"
                min="960"
                max="1920"
                step="40"
                value={design.containerWidth}
                onChange={(e) => setDesign({ ...design, containerWidth: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">권장: 1200px</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                요소 간격
              </label>
              <select
                value={design.spacing}
                onChange={(e) => setDesign({ ...design, spacing: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="tight">좁게</option>
                <option value="medium">보통</option>
                <option value="loose">넓게</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                테두리 둥글기 (px)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={design.borderRadius}
                  onChange={(e) => setDesign({ ...design, borderRadius: e.target.value })}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={design.borderRadius}
                  onChange={(e) => setDesign({ ...design, borderRadius: e.target.value })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카드 그림자
              </label>
              <select
                value={design.cardShadow}
                onChange={(e) => setDesign({ ...design, cardShadow: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">없음</option>
                <option value="small">작게</option>
                <option value="medium">보통</option>
                <option value="large">크게</option>
              </select>
            </div>
          </div>
        </div>

        {/* 버튼 스타일 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">버튼 스타일</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                버튼 모양
              </label>
              <select
                value={design.buttonStyle}
                onChange={(e) => setDesign({ ...design, buttonStyle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="square">사각형 (둥글기 없음)</option>
                <option value="rounded">둥근 사각형</option>
                <option value="pill">알약형 (완전 둥글게)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기본 버튼 크기
              </label>
              <select
                value={design.buttonSize}
                onChange={(e) => setDesign({ ...design, buttonSize: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">작게</option>
                <option value="medium">보통</option>
                <option value="large">크게</option>
              </select>
            </div>
          </div>
        </div>

        {/* 애니메이션 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">애니메이션</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={design.enableAnimations}
                onChange={(e) => setDesign({ ...design, enableAnimations: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700">애니메이션 효과 사용</span>
            </label>

            {design.enableAnimations && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  애니메이션 속도
                </label>
                <select
                  value={design.animationSpeed}
                  onChange={(e) => setDesign({ ...design, animationSpeed: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="slow">느리게 (0.4s)</option>
                  <option value="normal">보통 (0.2s)</option>
                  <option value="fast">빠르게 (0.1s)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* 미리보기 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">미리보기</h2>
          <div
            className="p-8 rounded-lg"
            style={{
              backgroundColor: design.backgroundColor,
              color: design.textColor,
              fontFamily: design.fontFamily,
              fontSize: `${design.fontSize}px`,
              lineHeight: design.lineHeight,
              borderRadius: `${design.borderRadius}px`,
              border: '1px solid #e5e7eb'
            }}
          >
            <h1
              style={{
                fontFamily: design.headingFont,
                fontSize: `${parseInt(design.fontSize) * 2}px`,
                marginBottom: '1rem',
                color: design.textColor
              }}
            >
              제목 스타일 미리보기
            </h1>
            <p style={{ marginBottom: '1rem' }}>
              본문 텍스트 스타일입니다. 이것은 일반적인 문단의 모습입니다. <a href="#" style={{ color: design.linkColor, textDecoration: 'underline' }}>링크 색상</a>도 미리보기 가능합니다.
            </p>
            <div className="flex gap-2 mb-4">
              <button
                style={{
                  backgroundColor: design.primaryColor,
                  color: 'white',
                  padding: design.buttonSize === 'small' ? '0.375rem 0.75rem' : design.buttonSize === 'large' ? '0.75rem 1.5rem' : '0.5rem 1rem',
                  borderRadius: design.buttonStyle === 'square' ? '0' : design.buttonStyle === 'pill' ? '9999px' : `${design.borderRadius}px`,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                주 버튼
              </button>
              <button
                style={{
                  backgroundColor: design.secondaryColor,
                  color: 'white',
                  padding: design.buttonSize === 'small' ? '0.375rem 0.75rem' : design.buttonSize === 'large' ? '0.75rem 1.5rem' : '0.5rem 1rem',
                  borderRadius: design.buttonStyle === 'square' ? '0' : design.buttonStyle === 'pill' ? '9999px' : `${design.borderRadius}px`,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                보조 버튼
              </button>
              <button
                style={{
                  backgroundColor: design.accentColor,
                  color: 'white',
                  padding: design.buttonSize === 'small' ? '0.375rem 0.75rem' : design.buttonSize === 'large' ? '0.75rem 1.5rem' : '0.5rem 1rem',
                  borderRadius: design.buttonStyle === 'square' ? '0' : design.buttonStyle === 'pill' ? '9999px' : `${design.borderRadius}px`,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                강조 버튼
              </button>
            </div>
            <div className="flex gap-2">
              <div style={{ padding: '0.5rem 1rem', backgroundColor: design.successColor, color: 'white', borderRadius: `${design.borderRadius}px`, fontSize: '0.875rem' }}>
                성공 메시지
              </div>
              <div style={{ padding: '0.5rem 1rem', backgroundColor: design.warningColor, color: 'white', borderRadius: `${design.borderRadius}px`, fontSize: '0.875rem' }}>
                경고 메시지
              </div>
              <div style={{ padding: '0.5rem 1rem', backgroundColor: design.errorColor, color: 'white', borderRadius: `${design.borderRadius}px`, fontSize: '0.875rem' }}>
                오류 메시지
              </div>
            </div>
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

export default DesignSettings;
