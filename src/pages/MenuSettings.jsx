import { useState } from 'react';
import { Plus, GripVertical, Edit2, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';

function MenuSettings() {
  const { menu, setMenu } = useData();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">메뉴 설정</h1>
        <p className="text-gray-600 mt-1">사이트 네비게이션 메뉴를 설정합니다</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">메인 메뉴</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus size={20} />
            메뉴 항목 추가
          </button>
        </div>

        <div className="space-y-2">
          {menu.map(item => (
            <div key={item.id} className="border rounded-lg">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3 flex-1">
                  <GripVertical size={20} className="text-gray-400 cursor-move" />
                  <div>
                    <div className="font-medium text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.url}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {item.children.length > 0 && (
                <div className="border-t bg-gray-50 p-2 pl-12">
                  {item.children.map(child => (
                    <div key={child.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-gray-400 cursor-move" />
                        <span className="text-sm text-gray-700">{child.label}</span>
                        <span className="text-xs text-gray-500">{child.url}</span>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1 text-gray-600 hover:text-blue-600">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuSettings;
