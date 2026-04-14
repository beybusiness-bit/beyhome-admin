// GitHub API 헬퍼 함수들

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * GitHub Personal Access Token 가져오기
 * 실제로는 SiteSettings에서 저장된 값을 사용
 */
function getGitHubToken() {
  // TODO: SiteSettings에서 가져오기
  // 임시로 localStorage 사용
  return localStorage.getItem('github_token') || '';
}

/**
 * GitHub API 요청 헬퍼
 */
async function githubRequest(url, options = {}) {
  const token = getGitHubToken();

  if (!token) {
    throw new Error('GitHub Personal Access Token이 설정되지 않았습니다. 사이트 기본 설정에서 설정해주세요.');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `GitHub API Error: ${response.status}`);
  }

  return response.json();
}

/**
 * 파일의 SHA 가져오기 (업데이트 시 필요)
 */
async function getFileSHA(path, repo, branch = 'main') {
  try {
    const url = `${GITHUB_API_BASE}/repos/${repo}/contents/${path}?ref=${branch}`;
    const data = await githubRequest(url);
    return data.sha;
  } catch (error) {
    // 파일이 없으면 null 반환
    return null;
  }
}

/**
 * GitHub에 파일 업로드
 */
export async function uploadToGitHub(content, path, repo, branch = 'main', message = 'Update file') {
  try {
    // 기존 파일의 SHA 가져오기 (업데이트 시 필요)
    const sha = await getFileSHA(path, repo, branch);

    const url = `${GITHUB_API_BASE}/repos/${repo}/contents/${path}`;

    // content가 문자열이면 base64로 인코딩
    const base64Content = typeof content === 'string'
      ? btoa(unescape(encodeURIComponent(content)))
      : content;

    const body = {
      message,
      content: base64Content,
      branch,
    };

    // 기존 파일이 있으면 SHA 포함
    if (sha) {
      body.sha = sha;
    }

    const data = await githubRequest(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    return data;
  } catch (error) {
    console.error('GitHub upload error:', error);
    throw error;
  }
}

/**
 * GitHub에서 파일 가져오기
 */
export async function fetchFromGitHub(path, repo, branch = 'main') {
  try {
    const url = `${GITHUB_API_BASE}/repos/${repo}/contents/${path}?ref=${branch}`;
    const data = await githubRequest(url);

    // base64 디코딩
    const content = decodeURIComponent(escape(atob(data.content)));

    return {
      content,
      sha: data.sha,
    };
  } catch (error) {
    console.error('GitHub fetch error:', error);
    throw error;
  }
}

/**
 * GitHub에서 파일 삭제
 */
export async function deleteFromGitHub(path, repo, branch = 'main', message = 'Delete file') {
  try {
    const sha = await getFileSHA(path, repo, branch);

    if (!sha) {
      throw new Error('파일을 찾을 수 없습니다.');
    }

    const url = `${GITHUB_API_BASE}/repos/${repo}/contents/${path}`;

    const data = await githubRequest(url, {
      method: 'DELETE',
      body: JSON.stringify({
        message,
        sha,
        branch,
      }),
    });

    return data;
  } catch (error) {
    console.error('GitHub delete error:', error);
    throw error;
  }
}

/**
 * 사이트 데이터를 HTML로 변환
 */
function generateHTML(siteData) {
  // TODO: 실제로는 모든 페이지, 블록, 설정을 HTML로 변환
  // 지금은 간단한 예시만
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteData.title || '내 사이트'}</title>
  <meta name="description" content="${siteData.description || ''}">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${siteData.title || '내 사이트'}</h1>
    <p>사이트가 성공적으로 배포되었습니다!</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * GitHub Pages로 배포
 */
export async function deployToGitHub(siteData, repo, branch = 'gh-pages') {
  try {
    const deployLog = [];

    // 1. index.html 생성
    deployLog.push({ step: 'HTML 생성 중...', status: 'progress' });
    const html = generateHTML(siteData);

    // 2. index.html 업로드
    deployLog.push({ step: 'index.html 업로드 중...', status: 'progress' });
    await uploadToGitHub(html, 'index.html', repo, branch, 'Deploy site');

    // 3. 이미지 업로드 (있다면)
    if (siteData.images && siteData.images.length > 0) {
      deployLog.push({ step: `이미지 ${siteData.images.length}개 업로드 중...`, status: 'progress' });

      for (const image of siteData.images) {
        await uploadToGitHub(
          image.base64,
          `assets/images/${image.name}`,
          repo,
          branch,
          `Upload image: ${image.name}`
        );
      }
    }

    // 4. 완료
    deployLog.push({ step: '배포 완료!', status: 'success' });

    return {
      success: true,
      url: `https://${repo.split('/')[0]}.github.io/${repo.split('/')[1]}`,
      log: deployLog,
    };
  } catch (error) {
    console.error('Deploy error:', error);
    throw error;
  }
}

/**
 * 저장소 정보 가져오기
 */
export async function getRepoInfo(repo) {
  try {
    const url = `${GITHUB_API_BASE}/repos/${repo}`;
    return await githubRequest(url);
  } catch (error) {
    console.error('Get repo info error:', error);
    throw error;
  }
}
