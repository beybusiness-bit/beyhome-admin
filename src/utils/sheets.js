// Google Sheets API 유틸리티
// Phase 5: 데이터 연동

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file'
];

// Google API 클라이언트 초기화 상태
let gapiInitialized = false;
let tokenClient = null;

/**
 * Google API 클라이언트 초기화
 */
export const initGoogleAPI = () => {
  return new Promise((resolve, reject) => {
    if (gapiInitialized) {
      resolve();
      return;
    }

    // gapi 로드 확인
    if (!window.gapi) {
      reject(new Error('Google API 클라이언트가 로드되지 않았습니다.'));
      return;
    }

    window.gapi.load('client', async () => {
      try {
        await window.gapi.client.init({
          apiKey: '', // API Key는 불필요 (OAuth만 사용)
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        });
        gapiInitialized = true;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
};

/**
 * Google Identity Services (GIS) 토큰 클라이언트 초기화
 */
export const initTokenClient = (clientId) => {
  if (!window.google || !window.google.accounts) {
    throw new Error('Google Identity Services가 로드되지 않았습니다.');
  }

  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: SCOPES.join(' '),
    callback: '', // 나중에 설정
  });

  return tokenClient;
};

/**
 * OAuth 토큰 요청
 */
export const requestAccessToken = () => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error('토큰 클라이언트가 초기화되지 않았습니다.'));
      return;
    }

    tokenClient.callback = (response) => {
      if (response.error) {
        reject(response);
      } else {
        resolve(response);
      }
    };

    // 토큰 요청
    tokenClient.requestAccessToken({ prompt: 'consent' });
  });
};

/**
 * 현재 액세스 토큰 확인
 */
export const hasValidToken = () => {
  return window.gapi?.client?.getToken() != null;
};

/**
 * 스프레드시트 생성
 * @param {string} title - 스프레드시트 제목
 * @returns {Promise<string>} 스프레드시트 ID
 */
export const createSpreadsheet = async (title) => {
  try {
    const response = await window.gapi.client.sheets.spreadsheets.create({
      properties: {
        title: title
      },
      sheets: [
        { properties: { title: 'Pages', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'Menu', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'LayoutSettings', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'DesignSettings', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'SiteSettings', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'Images', gridProperties: { frozenRowCount: 1 } } },
      ]
    });

    const spreadsheetId = response.result.spreadsheetId;
    console.log('스프레드시트 생성 완료:', spreadsheetId);

    // 헤더 행 추가
    await initializeSheetHeaders(spreadsheetId);

    return spreadsheetId;
  } catch (error) {
    console.error('스프레드시트 생성 실패:', error);
    throw error;
  }
};

/**
 * 각 시트에 헤더 행 초기화
 */
const initializeSheetHeaders = async (spreadsheetId) => {
  const headers = [
    {
      range: 'Pages!A1:F1',
      values: [['ID', 'Title', 'Slug', 'Category', 'Blocks', 'Settings']]
    },
    {
      range: 'Menu!A1:D1',
      values: [['ID', 'Label', 'URL', 'Children']]
    },
    {
      range: 'LayoutSettings!A1:B1',
      values: [['Key', 'Value']]
    },
    {
      range: 'DesignSettings!A1:B1',
      values: [['Key', 'Value']]
    },
    {
      range: 'SiteSettings!A1:B1',
      values: [['Key', 'Value']]
    },
    {
      range: 'Images!A1:E1',
      values: [['ID', 'Filename', 'Folder', 'URL', 'Size']]
    }
  ];

  await window.gapi.client.sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: spreadsheetId,
    resource: {
      data: headers,
      valueInputOption: 'RAW'
    }
  });
};

/**
 * 데이터 읽기
 * @param {string} spreadsheetId - 스프레드시트 ID
 * @param {string} range - 범위 (예: 'Pages!A2:F')
 * @returns {Promise<Array>} 데이터 배열
 */
export const readData = async (spreadsheetId, range) => {
  try {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range
    });

    return response.result.values || [];
  } catch (error) {
    console.error('데이터 읽기 실패:', error);
    throw error;
  }
};

/**
 * 데이터 쓰기
 * @param {string} spreadsheetId - 스프레드시트 ID
 * @param {string} range - 범위 (예: 'Pages!A2:F')
 * @param {Array} values - 데이터 배열
 */
export const writeData = async (spreadsheetId, range, values) => {
  try {
    await window.gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'RAW',
      resource: {
        values: values
      }
    });

    console.log('데이터 저장 완료:', range);
  } catch (error) {
    console.error('데이터 쓰기 실패:', error);
    throw error;
  }
};

/**
 * 시트 전체 데이터 지우기 (헤더 제외)
 * @param {string} spreadsheetId - 스프레드시트 ID
 * @param {string} sheetName - 시트 이름
 */
export const clearSheet = async (spreadsheetId, sheetName) => {
  try {
    await window.gapi.client.sheets.spreadsheets.values.clear({
      spreadsheetId: spreadsheetId,
      range: `${sheetName}!A2:Z`
    });

    console.log('시트 클리어 완료:', sheetName);
  } catch (error) {
    console.error('시트 클리어 실패:', error);
    throw error;
  }
};

/**
 * 페이지 데이터 저장
 */
export const savePages = async (spreadsheetId, pages) => {
  await clearSheet(spreadsheetId, 'Pages');

  const rows = pages.map(page => [
    page.id,
    page.title,
    page.slug,
    page.category,
    JSON.stringify(page.blocks || []),
    JSON.stringify(page.settings || {})
  ]);

  if (rows.length > 0) {
    await writeData(spreadsheetId, 'Pages!A2:F', rows);
  }
};

/**
 * 페이지 데이터 불러오기
 */
export const loadPages = async (spreadsheetId) => {
  const rows = await readData(spreadsheetId, 'Pages!A2:F');

  return rows.map(row => ({
    id: row[0],
    title: row[1],
    slug: row[2],
    category: row[3],
    blocks: row[4] ? JSON.parse(row[4]) : [],
    settings: row[5] ? JSON.parse(row[5]) : {}
  }));
};

/**
 * 메뉴 데이터 저장
 */
export const saveMenu = async (spreadsheetId, menuItems) => {
  await clearSheet(spreadsheetId, 'Menu');

  const rows = menuItems.map(item => [
    item.id,
    item.label,
    item.url,
    JSON.stringify(item.children || [])
  ]);

  if (rows.length > 0) {
    await writeData(spreadsheetId, 'Menu!A2:D', rows);
  }
};

/**
 * 메뉴 데이터 불러오기
 */
export const loadMenu = async (spreadsheetId) => {
  const rows = await readData(spreadsheetId, 'Menu!A2:D');

  return rows.map(row => ({
    id: row[0],
    label: row[1],
    url: row[2],
    children: row[3] ? JSON.parse(row[3]) : []
  }));
};

/**
 * 설정 데이터 저장 (공통)
 */
const saveSettings = async (spreadsheetId, sheetName, settings) => {
  await clearSheet(spreadsheetId, sheetName);

  const rows = Object.entries(settings).map(([key, value]) => [
    key,
    typeof value === 'object' ? JSON.stringify(value) : value
  ]);

  if (rows.length > 0) {
    await writeData(spreadsheetId, `${sheetName}!A2:B`, rows);
  }
};

/**
 * 설정 데이터 불러오기 (공통)
 */
const loadSettings = async (spreadsheetId, sheetName) => {
  const rows = await readData(spreadsheetId, `${sheetName}!A2:B`);

  const settings = {};
  rows.forEach(row => {
    const key = row[0];
    let value = row[1];

    // JSON 파싱 시도
    try {
      value = JSON.parse(value);
    } catch {
      // 문자열 그대로 유지
    }

    settings[key] = value;
  });

  return settings;
};

/**
 * 레이아웃 설정 저장
 */
export const saveLayoutSettings = async (spreadsheetId, settings) => {
  await saveSettings(spreadsheetId, 'LayoutSettings', settings);
};

/**
 * 레이아웃 설정 불러오기
 */
export const loadLayoutSettings = async (spreadsheetId) => {
  return await loadSettings(spreadsheetId, 'LayoutSettings');
};

/**
 * 디자인 설정 저장
 */
export const saveDesignSettings = async (spreadsheetId, settings) => {
  await saveSettings(spreadsheetId, 'DesignSettings', settings);
};

/**
 * 디자인 설정 불러오기
 */
export const loadDesignSettings = async (spreadsheetId) => {
  return await loadSettings(spreadsheetId, 'DesignSettings');
};

/**
 * 사이트 설정 저장
 */
export const saveSiteSettings = async (spreadsheetId, settings) => {
  await saveSettings(spreadsheetId, 'SiteSettings', settings);
};

/**
 * 사이트 설정 불러오기
 */
export const loadSiteSettings = async (spreadsheetId) => {
  return await loadSettings(spreadsheetId, 'SiteSettings');
};

/**
 * 이미지 메타데이터 저장
 */
export const saveImages = async (spreadsheetId, images) => {
  await clearSheet(spreadsheetId, 'Images');

  const rows = images.map(img => [
    img.id,
    img.name,
    img.folder,
    img.url,
    img.size
  ]);

  if (rows.length > 0) {
    await writeData(spreadsheetId, 'Images!A2:E', rows);
  }
};

/**
 * 이미지 메타데이터 불러오기
 */
export const loadImages = async (spreadsheetId) => {
  const rows = await readData(spreadsheetId, 'Images!A2:E');

  return rows.map(row => ({
    id: row[0],
    name: row[1],
    folder: row[2],
    url: row[3],
    size: parseInt(row[4]) || 0
  }));
};

/**
 * 모든 데이터 저장
 */
export const saveAllData = async (spreadsheetId, data) => {
  try {
    await Promise.all([
      savePages(spreadsheetId, data.pages || []),
      saveMenu(spreadsheetId, data.menu || []),
      saveLayoutSettings(spreadsheetId, data.layoutSettings || {}),
      saveDesignSettings(spreadsheetId, data.designSettings || {}),
      saveSiteSettings(spreadsheetId, data.siteSettings || {}),
      saveImages(spreadsheetId, data.images || [])
    ]);

    console.log('모든 데이터 저장 완료');
  } catch (error) {
    console.error('데이터 저장 실패:', error);
    throw error;
  }
};

/**
 * 모든 데이터 불러오기
 */
export const loadAllData = async (spreadsheetId) => {
  try {
    const [pages, menu, layoutSettings, designSettings, siteSettings, images] = await Promise.all([
      loadPages(spreadsheetId),
      loadMenu(spreadsheetId),
      loadLayoutSettings(spreadsheetId),
      loadDesignSettings(spreadsheetId),
      loadSiteSettings(spreadsheetId),
      loadImages(spreadsheetId)
    ]);

    console.log('모든 데이터 불러오기 완료');

    return {
      pages,
      menu,
      layoutSettings,
      designSettings,
      siteSettings,
      images
    };
  } catch (error) {
    console.error('데이터 불러오기 실패:', error);
    throw error;
  }
};
