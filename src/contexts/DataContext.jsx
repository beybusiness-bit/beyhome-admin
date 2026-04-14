import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const DataContext = createContext();

// 초기 데이터 구조
const initialData = {
  pages: [],
  menu: [],
  layoutSettings: {},
  designSettings: {},
  siteSettings: {},
  images: []
};

export const DataProvider = ({ children }) => {
  const { spreadsheetId, saveData, loadData, dataLoaded } = useAuth();
  
  const [pages, setPages] = useState([]);
  const [menu, setMenu] = useState([]);
  const [layoutSettings, setLayoutSettings] = useState({});
  const [designSettings, setDesignSettings] = useState({});
  const [siteSettings, setSiteSettings] = useState({});
  const [images, setImages] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // 앱 시작 시 데이터 불러오기
  useEffect(() => {
    const initializeData = async () => {
      try {
        // 먼저 localStorage에서 불러오기 (빠른 로딩)
        const cachedData = localStorage.getItem('app_data');
        if (cachedData) {
          const data = JSON.parse(cachedData);
          setPages(data.pages || []);
          setMenu(data.menu || []);
          setLayoutSettings(data.layoutSettings || {});
          setDesignSettings(data.designSettings || {});
          setSiteSettings(data.siteSettings || {});
          setImages(data.images || []);
        }

        // 스프레드시트가 있고 데이터가 로드되었으면 최신 데이터로 갱신
        if (spreadsheetId && dataLoaded) {
          const data = await loadData();
          setPages(data.pages || []);
          setMenu(data.menu || []);
          setLayoutSettings(data.layoutSettings || {});
          setDesignSettings(data.designSettings || {});
          setSiteSettings(data.siteSettings || {});
          setImages(data.images || []);
        }
      } catch (error) {
        console.error('데이터 초기화 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [spreadsheetId, dataLoaded]);

  // 자동 저장 (변경 감지 시)
  useEffect(() => {
    if (!autoSaveEnabled || !spreadsheetId || loading) return;

    const saveTimer = setTimeout(() => {
      saveAllDataToSheet();
    }, 2000); // 2초 디바운스

    return () => clearTimeout(saveTimer);
  }, [pages, menu, layoutSettings, designSettings, siteSettings, images, autoSaveEnabled, spreadsheetId, loading]);

  // 모든 데이터 저장
  const saveAllDataToSheet = async () => {
    if (!spreadsheetId) {
      console.log('스프레드시트 없음 - localStorage에만 저장');
      localStorage.setItem('app_data', JSON.stringify({
        pages,
        menu,
        layoutSettings,
        designSettings,
        siteSettings,
        images
      }));
      return;
    }

    try {
      await saveData({
        pages,
        menu,
        layoutSettings,
        designSettings,
        siteSettings,
        images
      });
      console.log('자동 저장 완료');
    } catch (error) {
      console.error('자동 저장 실패:', error);
    }
  };

  // 수동 저장
  const manualSave = async () => {
    await saveAllDataToSheet();
  };

  // 페이지 추가
  const addPage = (page) => {
    setPages(prev => [...prev, { ...page, id: Date.now().toString() }]);
  };

  // 페이지 수정
  const updatePage = (id, updates) => {
    setPages(prev => prev.map(page => 
      page.id === id ? { ...page, ...updates } : page
    ));
  };

  // 페이지 삭제
  const deletePage = (id) => {
    setPages(prev => prev.filter(page => page.id !== id));
  };

  // 메뉴 추가
  const addMenuItem = (item) => {
    setMenu(prev => [...prev, { ...item, id: Date.now().toString() }]);
  };

  // 메뉴 수정
  const updateMenuItem = (id, updates) => {
    setMenu(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  // 메뉴 삭제
  const deleteMenuItem = (id) => {
    setMenu(prev => prev.filter(item => item.id !== id));
  };

  // 이미지 추가
  const addImage = (image) => {
    setImages(prev => [...prev, { ...image, id: Date.now().toString() }]);
  };

  // 이미지 삭제
  const deleteImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const value = {
    // 데이터
    pages,
    menu,
    layoutSettings,
    designSettings,
    siteSettings,
    images,
    
    // 로딩
    loading,
    
    // Setters
    setPages,
    setMenu,
    setLayoutSettings,
    setDesignSettings,
    setSiteSettings,
    setImages,
    
    // 헬퍼 함수
    addPage,
    updatePage,
    deletePage,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addImage,
    deleteImage,
    
    // 저장
    saveAllDataToSheet,
    manualSave,
    autoSaveEnabled,
    setAutoSaveEnabled
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
