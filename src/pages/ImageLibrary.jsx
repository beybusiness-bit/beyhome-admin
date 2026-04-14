import { useState } from 'react';
import { Upload, Trash2, FolderPlus, Folder, Image as ImageIcon, Search, X, Check, Grid, List, LayoutGrid, Square } from 'lucide-react';
import { useData } from '../contexts/DataContext';

function ImageLibrary({ isModal = false, onSelect = null }) {
  const { images, setImages, addImage, deleteImage } = useData();

  const storageUsed = Math.round(images.reduce((sum, img) => sum + (img.size || 0), 0) / 1024 / 1024); // MB
  const [storageLimit] = useState(1000); // MB

  const [folders, setFolders] = useState(['banners', 'products', 'logos']);
  const [currentFolder, setCurrentFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // 새로운 설정
  const [viewMode, setViewMode] = useState('medium'); // 'small', 'medium', 'large', 'list'
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const storagePercent = (storageUsed / storageLimit) * 100;
  const isWarning = storageUsed >= 800;
  const isDanger = storageUsed >= 950;

  // 이미지 업로드
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (isDanger) {
      alert('저장 용량이 초과되어 업로드할 수 없습니다.');
      return;
    }

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
        return;
      }

      const sizeMB = file.size / (1024 * 1024);

      if (storageUsed + sizeMB >= 950) {
        alert('저장 용량을 초과하여 업로드할 수 없습니다.');
        return;
      }

      // 실제로는 GitHub API로 업로드하지만, 여기서는 시뮬레이션
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          name: file.name,
          size: file.size, // bytes
          folder: currentFolder === 'all' ? 'uncategorized' : currentFolder,
          url: event.target.result,
          uploadDate: new Date().toISOString().split('T')[0]
        };

        addImage(newImage); // DataContext 사용

        alert(`${file.name}이(가) 업로드되었습니다!`);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // 이미지 삭제
  const handleDeleteImage = (imageId) => {
    if (!window.confirm('이 이미지를 삭제하시겠습니까?')) return;

    deleteImage(imageId); // DataContext 사용
    alert('이미지가 삭제되었습니다.');
  };

  // 폴더 생성
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      alert('폴더 이름을 입력하세요.');
      return;
    }

    if (folders.includes(newFolderName.trim())) {
      alert('이미 존재하는 폴더 이름입니다.');
      return;
    }

    setFolders([...folders, newFolderName.trim()]);
    setNewFolderName('');
    setShowFolderModal(false);
    alert('폴더가 생성되었습니다!');
  };

  // 이미지 선택 (체크박스)
  const handleSelectImage = (image) => {
    if (selectedImages.find(img => img.id === image.id)) {
      // 이미 선택됨 → 선택 해제
      setSelectedImages(selectedImages.filter(img => img.id !== image.id));
    } else {
      // 선택 추가
      setSelectedImages([...selectedImages, image]);
    }
  };

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages([...filteredImages]);
    }
  };

  // 선택된 이미지 일괄 삭제
  const handleDeleteSelected = () => {
    if (selectedImages.length === 0) return;

    if (!window.confirm(`선택한 ${selectedImages.length}개의 이미지를 삭제하시겠습니까?`)) return;

    const deletedSize = selectedImages.reduce((sum, img) => sum + img.size, 0);
    const deletedIds = selectedImages.map(img => img.id);

    setImages(images.filter(img => !deletedIds.includes(img.id)));
    setStorageUsed(storageUsed - deletedSize);
    setSelectedImages([]);
    alert(`${selectedImages.length}개의 이미지가 삭제되었습니다.`);
  };

  // 필터링된 이미지 목록
  const filteredImages = images.filter(img => {
    const matchFolder = currentFolder === 'all' || img.folder === currentFolder;
    const matchSearch = img.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFolder && matchSearch;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, endIndex);

  // 페이지 변경 시 첫 페이지로
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // 뷰 모드별 그리드 클래스
  const getGridClass = () => {
    switch(viewMode) {
      case 'small': return 'grid-cols-4 md:grid-cols-5 lg:grid-cols-6';
      case 'medium': return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 'large': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 'list': return 'grid-cols-1';
      default: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <div className={isModal ? '' : 'p-8'}>
      {!isModal && (
        <>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">이미지 라이브러리</h1>
            <p className="text-gray-600 mt-1">사이트에서 사용하는 이미지를 관리합니다</p>
          </div>

          {/* 저장 용량 표시 */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-900">저장 용량</h2>
              <span className={`text-sm font-medium ${
                isDanger ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-gray-600'
              }`}>
                {storageUsed.toFixed(1)} MB / {storageLimit} MB
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  isDanger ? 'bg-red-600' : isWarning ? 'bg-yellow-500' : 'bg-blue-600'
                }`}
                style={{ width: `${storagePercent}%` }}
              />
            </div>
            {isWarning && (
              <p className={`text-sm mt-2 ${isDanger ? 'text-red-600' : 'text-yellow-600'}`}>
                {isDanger
                  ? '⚠️ 저장 용량이 거의 다 찼습니다. 업로드가 차단됩니다.'
                  : '⚠️ 저장 용량이 80%를 초과했습니다.'
                }
              </p>
            )}
          </div>
        </>
      )}

      {/* 업로드 및 폴더 관리 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex gap-2 mb-4">
          <label
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              isDanger
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Upload size={20} />
            이미지 업로드
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isDanger}
              className="hidden"
            />
          </label>
          <button
            onClick={() => setShowFolderModal(true)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <FolderPlus size={20} />
            폴더 생성
          </button>
        </div>

        {/* 폴더 필터 */}
        <div className="flex gap-2 flex-wrap mb-4">
          <button
            onClick={() => setCurrentFolder('all')}
            className={`px-3 py-1 rounded text-sm ${
              currentFolder === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {folders.map(folder => (
            <button
              key={folder}
              onClick={() => setCurrentFolder(folder)}
              className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${
                currentFolder === folder
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Folder size={14} />
              {folder}
            </button>
          ))}
        </div>

        {/* 검색 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="이미지 검색..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleFilterChange();
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 뷰 옵션 */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">보기:</span>
            <div className="flex gap-1 bg-gray-100 p-1 rounded">
              <button
                onClick={() => setViewMode('small')}
                className={`p-2 rounded ${viewMode === 'small' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                title="작게"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('medium')}
                className={`p-2 rounded ${viewMode === 'medium' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                title="보통"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('large')}
                className={`p-2 rounded ${viewMode === 'large' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                title="크게"
              >
                <Square size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                title="목록"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">표시:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={20}>20개</option>
                <option value={50}>50개</option>
                <option value={100}>100개</option>
                <option value={200}>200개</option>
              </select>
            </div>
          </div>
        </div>

        {!isModal && (
          <p className="text-sm text-gray-500 mt-4">
            💡 이미지는 GitHub 저장소의 assets/images/ 폴더에 저장됩니다
          </p>
        )}
      </div>

      {/* 선택된 이미지 작업 바 */}
      {selectedImages.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-blue-900">
              {selectedImages.length}개 선택됨
            </span>
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-700 underline"
            >
              {selectedImages.length === filteredImages.length ? '전체 해제' : `전체 선택 (${filteredImages.length}개)`}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 size={16} />
              선택 삭제
            </button>
            <button
              onClick={() => setSelectedImages([])}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              선택 해제
            </button>
          </div>
        </div>
      )}

      {/* 이미지 그리드 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            이미지 목록 ({filteredImages.length})
          </h2>
          {totalPages > 1 && (
            <span className="text-sm text-gray-600">
              {startIndex + 1}-{Math.min(endIndex, filteredImages.length)} / {filteredImages.length}
            </span>
          )}
        </div>
        <div className="p-6">
          {viewMode === 'list' ? (
            /* 목록 뷰 */
            <div className="space-y-2">
              {paginatedImages.map(image => (
                <div
                  key={image.id}
                  className={`flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 ${
                    selectedImages.find(img => img.id === image.id) ? 'bg-blue-50 border-blue-500' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!selectedImages.find(img => img.id === image.id)}
                    onChange={() => handleSelectImage(image)}
                    className="rounded w-5 h-5 cursor-pointer"
                  />
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-16 h-16 object-cover rounded cursor-pointer"
                    onClick={() => handleSelectImage(image)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{image.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span>{image.size.toFixed(2)} MB</span>
                      <span className="flex items-center gap-1">
                        <Folder size={12} />
                        {image.folder}
                      </span>
                      <span>{image.uploadDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(image.id);
                      }}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* 그리드 뷰 */
            <div className={`grid ${getGridClass()} gap-4`}>
              {paginatedImages.map(image => (
                <div
                  key={image.id}
                  className={`border rounded-lg overflow-hidden hover:shadow-lg transition-all ${
                    selectedImages.find(img => img.id === image.id) ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className={`bg-gray-100 flex items-center justify-center overflow-hidden relative ${
                    viewMode === 'small' ? 'aspect-square' :
                    viewMode === 'medium' ? 'aspect-square' :
                    'aspect-video'
                  }`}>
                    {/* 체크박스 */}
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={!!selectedImages.find(img => img.id === image.id)}
                        onChange={() => handleSelectImage(image)}
                        className="rounded w-5 h-5 cursor-pointer shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => handleSelectImage(image)}
                    />
                  </div>
                  <div className={`p-3 ${viewMode === 'small' ? 'text-xs' : ''}`}>
                    <p className={`font-medium text-gray-900 truncate ${viewMode === 'small' ? 'text-xs' : 'text-sm'}`} title={image.name}>
                      {image.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{image.size.toFixed(2)} MB</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image.id);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {viewMode !== 'small' && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <Folder size={12} />
                        <span>{image.folder}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredImages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
              <p>
                {searchQuery
                  ? '검색 결과가 없습니다'
                  : currentFolder === 'all'
                    ? '업로드된 이미지가 없습니다'
                    : '이 폴더에 이미지가 없습니다'
                }
              </p>
              {!searchQuery && currentFolder === 'all' && (
                <p className="text-sm mt-1">첫 이미지를 업로드해보세요</p>
              )}
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="p-6 border-t flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>

            <div className="flex items-center gap-2">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        )}
      </div>

      {/* 폴더 생성 모달 */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">새 폴더 만들기</h3>
              <button onClick={() => {
                setShowFolderModal(false);
                setNewFolderName('');
              }}>
                <X size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <input
              type="text"
              placeholder="폴더 이름 입력"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowFolderModal(false);
                  setNewFolderName('');
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={handleCreateFolder}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                생성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageLibrary;
