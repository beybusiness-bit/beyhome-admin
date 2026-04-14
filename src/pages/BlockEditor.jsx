import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Monitor, Smartphone, Settings, Save,
  ChevronDown, ChevronRight, FileText, AlertTriangle,
  Plus, Trash2, ChevronUp, Edit2, GripVertical, X
} from 'lucide-react';

function BlockEditor() {
  const { pageId } = useParams();
  const navigate = useNavigate();

  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [showPageTree, setShowPageTree] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // 페이지 트리 데이터 (실제로는 API에서 가져옴)
  const [pageTree] = useState([
    {
      id: 'cat-1',
      name: '메인 페이지',
      expanded: true,
      pages: [
        { id: 'page-1', title: '홈', path: '/' },
        { id: 'page-2', title: '소개', path: '/about' },
      ]
    },
    {
      id: 'cat-2',
      name: '제품',
      expanded: true,
      pages: [
        { id: 'page-3', title: '제품 목록', path: '/products' },
        { id: 'page-4', title: '제품 상세', path: '/products/:id' },
      ]
    },
  ]);

  // 현재 페이지 데이터
  const [pageData, setPageData] = useState({
    title: '홈',
    slug: 'home',
    metaTitle: '우리 회사 홈페이지',
    metaDescription: '최고의 제품과 서비스를 제공합니다',
    visible: true,
    blocks: [],
    blockSpacing: {
      vertical: 16, // 블록 세로 간격 (px)
      horizontal: 16, // 컬럼 가로 간격 (px)
    }
  });

  // 블록 타입 정의
  const blockTypes = [
    { id: 'text', name: '텍스트', icon: '📝' },
    { id: 'image', name: '이미지', icon: '🖼️' },
    { id: 'divider', name: '구분선', icon: '➖' },
    { id: 'spacer', name: '스페이서', icon: '⬜' },
    { id: 'button', name: '버튼/링크', icon: '🔘' },
    { id: 'embed', name: '임베드', icon: '📺' },
    { id: 'columns', name: '컬럼', icon: '📊' },
  ];

  // 블록 추가 모달
  const [showBlockPicker, setShowBlockPicker] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);

  // 블록 추가
  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: getDefaultContent(type)
    };

    setPageData({
      ...pageData,
      blocks: [...pageData.blocks, newBlock]
    });
    setHasUnsavedChanges(true);
    setShowBlockPicker(false);
  };

  // 블록 기본 콘텐츠
  const getDefaultContent = (type) => {
    switch(type) {
      case 'text':
        return { level: 'p', text: '텍스트를 입력하세요', bold: false, italic: false };
      case 'image':
        return { url: '', alt: '', caption: '', width: '100%' };
      case 'divider':
        return { style: 'solid', color: '#E5E7EB', thickness: 1 };
      case 'spacer':
        return { height: 40 };
      case 'button':
        return { text: '버튼', url: '#', style: 'primary', newTab: false };
      case 'embed':
        return { code: '' };
      case 'columns':
        return {
          count: 2,
          columns: [
            { id: 1, width: '50%', blocks: [] },
            { id: 2, width: '50%', blocks: [] }
          ]
        };
      default:
        return {};
    }
  };

  // 블록 수정
  const updateBlock = (blockId, newContent) => {
    setPageData({
      ...pageData,
      blocks: pageData.blocks.map(block =>
        block.id === blockId ? { ...block, content: newContent } : block
      )
    });
    setHasUnsavedChanges(true);
  };

  // 블록 삭제
  const deleteBlock = (blockId) => {
    if (window.confirm('이 블록을 삭제하시겠습니까?')) {
      setPageData({
        ...pageData,
        blocks: pageData.blocks.filter(block => block.id !== blockId)
      });
      setHasUnsavedChanges(true);
    }
  };

  // 블록 순서 변경
  const moveBlock = (blockId, direction) => {
    const index = pageData.blocks.findIndex(b => b.id === blockId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === pageData.blocks.length - 1)
    ) return;

    const newBlocks = [...pageData.blocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];

    setPageData({ ...pageData, blocks: newBlocks });
    setHasUnsavedChanges(true);
  };

  // 페이지 이동 시 미저장 확인
  const handlePageChange = (newPageId) => {
    if (hasUnsavedChanges) {
      setPendingNavigation(newPageId);
      setShowUnsavedWarning(true);
    } else {
      navigate(`/pages/${newPageId}/edit`);
    }
  };

  // 미저장 경고 확인
  const confirmNavigation = () => {
    if (pendingNavigation) {
      navigate(`/pages/${pendingNavigation}/edit`);
      setHasUnsavedChanges(false);
      setShowUnsavedWarning(false);
      setPendingNavigation(null);
    }
  };

  // 저장
  const handleSave = () => {
    // TODO: API 호출
    console.log('Saving page:', pageData);
    setHasUnsavedChanges(false);
    alert('페이지가 저장되었습니다!');
  };

  // 페이지 설정 변경 시 미저장 상태로 표시
  const updatePageData = (field, value) => {
    setPageData({ ...pageData, [field]: value });
    setHasUnsavedChanges(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 왼쪽 사이드바 - 페이지 트리 */}
      <div className={`
        bg-white border-r border-gray-200 transition-all duration-300
        ${showPageTree ? 'w-64' : 'w-0'}
      `}>
        {showPageTree && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">페이지 목록</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {pageTree.map(category => (
                <div key={category.id} className="mb-2">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-600 px-2 py-1">
                    {category.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span>{category.name}</span>
                  </div>
                  {category.expanded && (
                    <div className="ml-4">
                      {category.pages.map(page => (
                        <button
                          key={page.id}
                          onClick={() => handlePageChange(page.id)}
                          className={`
                            w-full text-left px-3 py-2 rounded text-sm transition-colors
                            flex items-center gap-2
                            ${page.id === pageId
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                            }
                          `}
                        >
                          <FileText size={14} />
                          {page.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 툴바 */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/pages"
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              <span>페이지 관리</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h2 className="font-semibold text-gray-900">{pageData.title}</h2>
            {hasUnsavedChanges && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                저장되지 않음
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* 페이지 트리 토글 */}
            <button
              onClick={() => setShowPageTree(!showPageTree)}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="페이지 목록"
            >
              <FileText size={20} />
            </button>

            {/* 미리보기 전환 */}
            <div className="flex bg-gray-100 rounded">
              <button
                onClick={() => setIsMobilePreview(false)}
                className={`px-3 py-2 rounded transition-colors ${
                  !isMobilePreview ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <Monitor size={20} />
              </button>
              <button
                onClick={() => setIsMobilePreview(true)}
                className={`px-3 py-2 rounded transition-colors ${
                  isMobilePreview ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <Smartphone size={20} />
              </button>
            </div>

            {/* 설정 토글 */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <Settings size={20} />
            </button>

            {/* 저장 버튼 */}
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save size={20} />
              저장
            </button>
          </div>
        </div>

        {/* 에디터 영역 */}
        <div className="flex-1 overflow-hidden flex">
          {/* 블록 에디터 메인 */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
            <div className={`
              mx-auto bg-white shadow-lg rounded-lg p-8 transition-all
              ${isMobilePreview ? 'max-w-md' : 'max-w-4xl'}
            `}>
              {/* 블록 목록 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${pageData.blockSpacing.vertical}px` }}>
                {pageData.blocks.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="mb-4">아직 블록이 없습니다</p>
                    <button
                      onClick={() => setShowBlockPicker(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      첫 블록 추가하기
                    </button>
                  </div>
                ) : (
                  pageData.blocks.map((block, index) => (
                    <BlockRenderer
                      key={block.id}
                      block={block}
                      index={index}
                      total={pageData.blocks.length}
                      spacing={pageData.blockSpacing}
                      onUpdate={(newContent) => updateBlock(block.id, newContent)}
                      onDelete={() => deleteBlock(block.id)}
                      onMove={(direction) => moveBlock(block.id, direction)}
                      onSelect={() => setSelectedBlock(block.id)}
                      isSelected={selectedBlock === block.id}
                    />
                  ))
                )}
              </div>

              {/* 블록 추가 버튼 */}
              {pageData.blocks.length > 0 && (
                <div className="mt-8">
                  <button
                    onClick={() => setShowBlockPicker(true)}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    블록 추가
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽 사이드바 - 페이지 설정 */}
          <div className={`
            bg-white border-l border-gray-200 transition-all duration-300
            ${showSettings ? 'w-80' : 'w-0'}
          `}>
            {showSettings && (
              <div className="h-full overflow-y-auto p-4">
                <h3 className="font-semibold text-gray-900 mb-4">페이지 설정</h3>

                <div className="space-y-4">
                  {/* 페이지 제목 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      페이지 제목
                    </label>
                    <input
                      type="text"
                      value={pageData.title}
                      onChange={(e) => updatePageData('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* URL 슬러그 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL 슬러그
                    </label>
                    <input
                      type="text"
                      value={pageData.slug}
                      onChange={(e) => updatePageData('slug', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL: /pages/{pageData.slug}
                    </p>
                  </div>

                  {/* 노출 여부 */}
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={pageData.visible}
                        onChange={(e) => updatePageData('visible', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        페이지 노출
                      </span>
                    </label>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">SEO 설정</h4>

                    {/* 메타 타이틀 */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        메타 타이틀
                      </label>
                      <input
                        type="text"
                        value={pageData.metaTitle}
                        onChange={(e) => updatePageData('metaTitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={60}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {pageData.metaTitle.length}/60자
                      </p>
                    </div>

                    {/* 메타 설명 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        메타 설명
                      </label>
                      <textarea
                        value={pageData.metaDescription}
                        onChange={(e) => updatePageData('metaDescription', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {pageData.metaDescription.length}/160자
                      </p>
                    </div>

                    {/* 블록 여백 설정 */}
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">블록 여백</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            세로 간격 (블록 사이)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="0"
                              max="64"
                              step="4"
                              value={pageData.blockSpacing.vertical}
                              onChange={(e) => updatePageData('blockSpacing', {
                                ...pageData.blockSpacing,
                                vertical: parseInt(e.target.value)
                              })}
                              className="flex-1"
                            />
                            <input
                              type="number"
                              min="0"
                              max="64"
                              value={pageData.blockSpacing.vertical}
                              onChange={(e) => updatePageData('blockSpacing', {
                                ...pageData.blockSpacing,
                                vertical: parseInt(e.target.value)
                              })}
                              className="w-16 px-2 py-1 border rounded text-sm"
                            />
                            <span className="text-xs text-gray-500">px</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            가로 간격 (컬럼 사이)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="0"
                              max="64"
                              step="4"
                              value={pageData.blockSpacing.horizontal}
                              onChange={(e) => updatePageData('blockSpacing', {
                                ...pageData.blockSpacing,
                                horizontal: parseInt(e.target.value)
                              })}
                              className="flex-1"
                            />
                            <input
                              type="number"
                              min="0"
                              max="64"
                              value={pageData.blockSpacing.horizontal}
                              onChange={(e) => updatePageData('blockSpacing', {
                                ...pageData.blockSpacing,
                                horizontal: parseInt(e.target.value)
                              })}
                              className="w-16 px-2 py-1 border rounded text-sm"
                            />
                            <span className="text-xs text-gray-500">px</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 미저장 경고 모달 */}
      {showUnsavedWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="text-yellow-500 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  저장되지 않은 변경사항
                </h3>
                <p className="text-gray-600 text-sm">
                  현재 페이지에 저장되지 않은 변경사항이 있습니다.
                  계속하시겠습니까?
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowUnsavedWarning(false);
                  setPendingNavigation(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  handleSave();
                  setTimeout(confirmNavigation, 100);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                저장 후 이동
              </button>
              <button
                onClick={confirmNavigation}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                무시하고 이동
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 블록 선택 모달 */}
      {showBlockPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">블록 추가</h3>
              <button onClick={() => setShowBlockPicker(false)}>
                <X size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {blockTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => addBlock(type.id)}
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-3xl">{type.icon}</span>
                  <span className="font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 블록 렌더러 컴포넌트
function BlockRenderer({ block, index, total, spacing, onUpdate, onDelete, onMove, onSelect, isSelected }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={`
        group relative border-2 rounded-lg p-4 transition-all
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
      `}
      onClick={() => onSelect()}
    >
      {/* 블록 툴바 */}
      <div className="absolute -top-3 right-2 flex gap-1 bg-white border border-gray-200 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onMove('up'); }}
          disabled={index === 0}
          className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronUp size={16} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onMove('down'); }}
          disabled={index === total - 1}
          className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronDown size={16} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing); }}
          className="p-1 text-gray-600 hover:text-blue-600"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1 text-gray-600 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* 블록 콘텐츠 */}
      {isEditing ? (
        <BlockEditForm block={block} onUpdate={onUpdate} onClose={() => setIsEditing(false)} />
      ) : (
        <BlockPreview block={block} spacing={spacing} />
      )}
    </div>
  );
}

// 블록 미리보기
function BlockPreview({ block, spacing = { horizontal: 16, vertical: 16 } }) {
  switch(block.type) {
    case 'text':
      const Tag = block.content.level || 'p';
      return (
        <Tag className={`
          ${Tag === 'h2' ? 'text-2xl font-bold' : ''}
          ${Tag === 'h3' ? 'text-xl font-semibold' : ''}
          ${block.content.bold ? 'font-bold' : ''}
          ${block.content.italic ? 'italic' : ''}
        `}>
          {block.content.text || '텍스트를 입력하세요'}
        </Tag>
      );

    case 'image':
      return block.content.url ? (
        <div>
          <img src={block.content.url} alt={block.content.alt} className="max-w-full" />
          {block.content.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center">{block.content.caption}</p>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded p-8 text-center text-gray-500">
          이미지를 선택하세요
        </div>
      );

    case 'divider':
      return (
        <hr style={{
          borderStyle: block.content.style,
          borderColor: block.content.color,
          borderWidth: `${block.content.thickness}px 0 0 0`
        }} />
      );

    case 'spacer':
      return <div style={{ height: `${block.content.height}px` }} />;

    case 'button':
      return (
        <div className="text-center">
          <a
            href={block.content.url}
            target={block.content.newTab ? '_blank' : '_self'}
            rel={block.content.newTab ? 'noopener noreferrer' : ''}
            className={`
              inline-block px-6 py-3 rounded transition-colors
              ${block.content.style === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
              ${block.content.style === 'secondary' ? 'bg-gray-600 text-white hover:bg-gray-700' : ''}
              ${block.content.style === 'outline' ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50' : ''}
            `}
          >
            {block.content.text || '버튼'}
          </a>
        </div>
      );

    case 'embed':
      return block.content.code ? (
        <div dangerouslySetInnerHTML={{ __html: block.content.code }} />
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded p-8 text-center text-gray-500">
          HTML 코드를 입력하세요
        </div>
      );

    case 'columns':
      return (
        <div className="flex" style={{ gap: `${spacing.horizontal}px` }}>
          {block.content.columns.map((col, i) => (
            <div
              key={col.id}
              style={{ width: col.width }}
              className="border-2 border-dashed border-gray-300 rounded p-4 min-h-[100px]"
            >
              <div className="text-xs text-gray-500 mb-2">컬럼 {i + 1} ({col.width})</div>
              {col.blocks.length === 0 ? (
                <div className="text-sm text-gray-400 text-center py-8">
                  블록 없음<br/>
                  <span className="text-xs">(편집 모드에서 추가)</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.vertical}px` }}>
                  {col.blocks.map(innerBlock => (
                    <div key={innerBlock.id} className="text-sm bg-blue-50 p-2 rounded">
                      {innerBlock.type} 블록
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );

    default:
      return <div>알 수 없는 블록 타입</div>;
  }
}

// 블록 에디터 (간단 버전)
function BlockEditForm({ block, onUpdate, onClose }) {
  const [content, setContent] = useState(block.content);

  const handleSave = () => {
    onUpdate(content);
    onClose();
  };

  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded">
      {block.type === 'text' && (
        <>
          <select
            value={content.level}
            onChange={(e) => setContent({ ...content, level: e.target.value })}
            className="px-3 py-2 border rounded"
          >
            <option value="h2">제목 (H2)</option>
            <option value="h3">소제목 (H3)</option>
            <option value="p">본문</option>
          </select>
          <textarea
            value={content.text}
            onChange={(e) => setContent({ ...content, text: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            rows={3}
          />
          <div className="flex gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={content.bold}
                onChange={(e) => setContent({ ...content, bold: e.target.checked })}
              />
              <span className="text-sm">굵게</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={content.italic}
                onChange={(e) => setContent({ ...content, italic: e.target.checked })}
              />
              <span className="text-sm">기울임</span>
            </label>
          </div>
        </>
      )}

      {block.type === 'image' && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">이미지 선택</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="이미지 URL 입력 또는 아래 버튼으로 선택"
                value={content.url}
                onChange={(e) => setContent({ ...content, url: e.target.value })}
                className="flex-1 px-3 py-2 border rounded"
              />
              <button
                onClick={() => {
                  const newWindow = window.open('/image-library', 'ImageLibrary', 'width=1200,height=800');
                  alert('이미지 라이브러리 창이 열렸습니다!\n\n이미지를 선택한 후 URL을 복사하여 붙여넣으세요.');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
              >
                라이브러리
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="대체 텍스트 (alt) - 이미지 설명"
            value={content.alt}
            onChange={(e) => setContent({ ...content, alt: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="캡션 (선택사항)"
            value={content.caption}
            onChange={(e) => setContent({ ...content, caption: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </>
      )}

      {block.type === 'divider' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">구분선 스타일</label>
            <select
              value={content.style}
              onChange={(e) => setContent({ ...content, style: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="solid">실선 (━━━)</option>
              <option value="dashed">긴 점선 (─ ─ ─)</option>
              <option value="dotted">짧은 점선 (· · ·)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">색상</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={content.color}
                onChange={(e) => setContent({ ...content, color: e.target.value })}
                className="h-10 w-20 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.color}
                onChange={(e) => setContent({ ...content, color: e.target.value })}
                className="flex-1 px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">두께 (px)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={content.thickness}
              onChange={(e) => setContent({ ...content, thickness: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
      )}

      {block.type === 'spacer' && (
        <div>
          <label className="block text-sm mb-1">높이 (px)</label>
          <input
            type="number"
            value={content.height}
            onChange={(e) => setContent({ ...content, height: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      )}

      {block.type === 'button' && (
        <>
          <input
            type="text"
            placeholder="버튼 텍스트 (예: 더 알아보기)"
            value={content.text}
            onChange={(e) => setContent({ ...content, text: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <div>
            <input
              type="text"
              placeholder="링크 URL (예: https://example.com 또는 /about)"
              value={content.url}
              onChange={(e) => setContent({ ...content, url: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 같은 사이트 내 페이지로 이동: /페이지슬러그 (예: /about, /products)<br/>
              외부 사이트로 이동: 전체 URL (예: https://example.com)
            </p>
          </div>
          <select
            value={content.style}
            onChange={(e) => setContent({ ...content, style: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="primary">주 버튼 (파란색 배경)</option>
            <option value="secondary">보조 버튼 (회색 배경)</option>
            <option value="outline">외곽선 버튼 (테두리만)</option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={content.newTab}
              onChange={(e) => setContent({ ...content, newTab: e.target.checked })}
            />
            <span className="text-sm">새 탭에서 열기</span>
          </label>
        </>
      )}

      {block.type === 'embed' && (
        <textarea
          placeholder="HTML 코드를 입력하세요 (예: 유튜브, 지도 임베드 코드)"
          value={content.code}
          onChange={(e) => setContent({ ...content, code: e.target.value })}
          className="w-full px-3 py-2 border rounded font-mono text-sm"
          rows={5}
        />
      )}

      {block.type === 'columns' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">컬럼 수</label>
            <select
              value={content.count}
              onChange={(e) => {
                const newCount = parseInt(e.target.value);
                const currentCount = content.columns.length;

                let newColumns = [...content.columns];

                if (newCount > currentCount) {
                  // 컬럼 추가
                  const widthPerColumn = `${100 / newCount}%`;
                  for (let i = currentCount; i < newCount; i++) {
                    newColumns.push({ id: i + 1, width: widthPerColumn, blocks: [] });
                  }
                  // 기존 컬럼 너비도 조정
                  newColumns = newColumns.map(col => ({ ...col, width: widthPerColumn }));
                } else {
                  // 컬럼 제거
                  newColumns = newColumns.slice(0, newCount);
                  const widthPerColumn = `${100 / newCount}%`;
                  newColumns = newColumns.map(col => ({ ...col, width: widthPerColumn }));
                }

                setContent({ ...content, count: newCount, columns: newColumns });
              }}
              className="w-full px-3 py-2 border rounded"
            >
              <option value={2}>2컬럼</option>
              <option value={3}>3컬럼</option>
              <option value={4}>4컬럼</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">각 컬럼 너비 설정</label>
            <div className="space-y-2">
              {content.columns.map((col, index) => (
                <div key={col.id} className="flex items-center gap-2">
                  <span className="text-sm w-16">컬럼 {index + 1}</span>
                  <input
                    type="text"
                    value={col.width}
                    onChange={(e) => {
                      let value = e.target.value.trim();
                      // 숫자만 입력한 경우 자동으로 % 추가
                      if (value && !isNaN(value) && !value.includes('%') && !value.includes('px') && !value.toLowerCase().includes('auto')) {
                        value = value + '%';
                      }
                      const newColumns = [...content.columns];
                      newColumns[index] = { ...newColumns[index], width: value };
                      setContent({ ...content, columns: newColumns });
                    }}
                    placeholder="예: 30, 30%, 200px, auto"
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                  {content.columns.length > 1 && (
                    <>
                      <button
                        onClick={() => {
                          if (index === 0) return;
                          const newColumns = [...content.columns];
                          [newColumns[index - 1], newColumns[index]] = [newColumns[index], newColumns[index - 1]];
                          setContent({ ...content, columns: newColumns });
                        }}
                        disabled={index === 0}
                        className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-30"
                        title="왼쪽으로"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => {
                          if (index === content.columns.length - 1) return;
                          const newColumns = [...content.columns];
                          [newColumns[index], newColumns[index + 1]] = [newColumns[index + 1], newColumns[index]];
                          setContent({ ...content, columns: newColumns });
                        }}
                        disabled={index === content.columns.length - 1}
                        className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-30"
                        title="오른쪽으로"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 팁: 숫자만 입력하면 자동으로 %로 처리됩니다 (예: 30 입력 → 30%)
            </p>
          </div>

          <div className="border-t pt-3">
            <p className="text-sm text-gray-600 mb-2">
              ℹ️ 각 컬럼 안에 블록을 추가하려면 "적용" 버튼을 누른 후 컬럼 내부를 클릭하세요.
            </p>
            <p className="text-xs text-gray-500">
              (컬럼 내부 블록 추가 기능은 다음 업데이트에서 구현 예정)
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          적용
        </button>
      </div>
    </div>
  );
}

export default BlockEditor;
