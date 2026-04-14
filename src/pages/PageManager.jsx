import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FolderPlus, Edit2, Trash2, Eye, EyeOff, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';

function PageManager() {
  const { pages, updatePage } = useData();

  // 카테고리별 UI 상태 (expanded)
  const [categories, setCategories] = useState([
    {
      id: 'cat-1',
      name: '메인 페이지',
      expanded: true,
      pages: []
    },
    {
      id: 'cat-2',
      name: '제품',
      expanded: true,
      pages: []
    },
    {
      id: 'cat-system',
      name: '시스템 페이지',
      expanded: false,
      system: true,
      pages: []
    }
  ]);

  // pages 데이터를 카테고리별로 분류
  useEffect(() => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === 'cat-1') {
        return { ...cat, pages: pages.filter(p => p.category === '메인') };
      } else if (cat.id === 'cat-2') {
        return { ...cat, pages: pages.filter(p => p.category === '제품') };
      } else if (cat.id === 'cat-system') {
        return { ...cat, pages: pages.filter(p => p.system === true) };
      }
      return cat;
    }));
  }, [pages]);

  const toggleCategory = (categoryId) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
    ));
  };

  const togglePageVisibility = (categoryId, pageId) => {
    // DataContext의 updatePage 사용
    const page = pages.find(p => p.id === pageId);
    if (page) {
      updatePage(pageId, { visible: !page.visible });
    }
  };

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">페이지 관리</h1>
          <p className="text-gray-600 mt-1">사이트의 페이지와 카테고리를 관리합니다</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <FolderPlus size={20} />
            카테고리 추가
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus size={20} />
            페이지 추가
          </button>
        </div>
      </div>

      {/* 카테고리 및 페이지 목록 */}
      <div className="bg-white rounded-lg shadow">
        {categories.map((category, catIndex) => (
          <div key={category.id} className="border-b last:border-b-0">
            {/* 카테고리 헤더 */}
            <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {category.expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {!category.system && (
                  <GripVertical size={20} className="text-gray-400 cursor-move" />
                )}
                <span className="font-semibold text-gray-900">
                  {category.name}
                  {category.system && <span className="ml-2 text-xs text-gray-500">(시스템)</span>}
                </span>
                <span className="text-sm text-gray-500">
                  ({category.pages.length}개)
                </span>
              </div>
              {!category.system && (
                <div className="flex gap-1">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-200 rounded transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-200 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* 페이지 목록 */}
            {category.expanded && (
              <div>
                {category.pages.map((page, pageIndex) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {!page.system && (
                        <GripVertical size={20} className="text-gray-400 cursor-move ml-8" />
                      )}
                      <div className={page.system ? 'ml-11' : ''}>
                        <h3 className="font-medium text-gray-900">{page.title}</h3>
                        <p className="text-sm text-gray-500">{page.path}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* 노출 여부 토글 */}
                      <button
                        onClick={() => togglePageVisibility(category.id, page.id)}
                        className={`
                          p-2 rounded transition-colors
                          ${page.visible
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-gray-400 hover:bg-gray-100'
                          }
                        `}
                        title={page.visible ? '노출 중' : '숨김'}
                      >
                        {page.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>

                      {/* 편집 버튼 */}
                      <Link
                        to={`/pages/${page.id}/edit`}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Edit2 size={16} />
                        편집
                      </Link>

                      {/* 삭제 버튼 (시스템 페이지는 숨김) */}
                      {!page.system && (
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 안내 메시지 */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>팁:</strong> 카테고리와 페이지를 드래그하여 순서를 변경할 수 있습니다.
          시스템 페이지는 이동하거나 삭제할 수 없지만 내용은 편집 가능합니다.
        </p>
      </div>
    </div>
  );
}

export default PageManager;
