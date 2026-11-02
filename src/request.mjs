export function backendUrl(baseUrl, development = false) {
  const url = new URL(baseUrl);
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (url.username || url.password || url.search || url.hash || (url.protocol !== 'https:' && !(development && local && url.protocol === 'http:'))) {
    throw new Error('Configure an HTTPS backend URL. HTTP is allowed only for local development.');
  }
  return url.toString().replace(/\/$/, '');
}
export async function requestJson(url, options, { fetchImpl = fetch, timeoutMs = 15000 } = {}) {
  const controller = new AbortController();
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => { controller.abort(); reject(new Error('Request timed out. Please try again.')); }, timeoutMs);
  });
  const operation = (async () => {
    const response = await fetchImpl(url, { ...options, signal: controller.signal });
    let body;
    try { body = await response.json(); }
    catch {
      throw Object.assign(new Error(response.ok ? 'Invalid server response' : `Request failed (${response.status})`), { status: response.status });
    }
    if (!response.ok) throw Object.assign(new Error(body?.message || `Request failed (${response.status})`), { status: response.status });
    return body;
  })();
  try { return await Promise.race([operation, timeout]); }
  finally { clearTimeout(timer); }
}
