import { isValidSession } from './session.mjs';
export function createApiClient({ baseUrl, getSession, clearSession, fetchImpl = fetch, now = Date.now }) {
  return async function apiGet(path) {
    const session = getSession();
    if (!isValidSession(session, now())) {
      clearSession();
      throw Object.assign(new Error('Your session expired. Please sign in again.'), { status: 401 });
    }
    const response = await fetchImpl(`${baseUrl.replace(/\/$/, '')}/api/${path}`, {
      headers: { Authorization: `Bearer ${session.token}` },
    });
    if (response.status === 401) {
      if (getSession()?.token === session.token) {
        clearSession();
        throw Object.assign(new Error('Your session expired. Please sign in again.'), { status: 401 });
      }
      throw new Error('This request used an older session. Please try again.');
    }
    const data = await response.json();
    if (!response.ok) throw Object.assign(new Error(data.message || 'Unable to load scoreboard'), { status: response.status });
    return data.data;
  };
}
export function destinationForError(error) {
  if (error.status === 401) return 'authentication';
  if (error.status === 404) return 'NotFound';
  return null;
}
