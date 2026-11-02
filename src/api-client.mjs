import { isValidSession } from './session.mjs';
import { backendUrl, requestJson } from './request.mjs';
export function createApiClient({ baseUrl, getSession, clearSession, fetchImpl = fetch, now = Date.now, timeoutMs = 15000, development = false }) {
  function staleSessionError() {
    if (!isValidSession(getSession(), now())) {
      return Object.assign(new Error('Your session expired. Please sign in again.'), { status: 401 });
    }
    return Object.assign(new Error('This request used an older session. Please try again.'), { stale: true });
  }
  return async function apiGet(path) {
    const base = backendUrl(baseUrl, development);
    const session = getSession();
    if (!isValidSession(session, now())) {
      clearSession();
      throw Object.assign(new Error('Your session expired. Please sign in again.'), { status: 401 });
    }
    try {
      const body = await requestJson(`${base}/api/${path}`, { headers: { Authorization: `Bearer ${session.token}` } }, { fetchImpl, timeoutMs });
      if (getSession()?.token !== session.token) {
        throw staleSessionError();
      }
      return body.data;
    } catch (error) {
      if (error.status !== 401) throw error;
      if (getSession()?.token === session.token) {
        clearSession();
        throw Object.assign(new Error('Your session expired. Please sign in again.'), { status: 401 });
      }
      throw staleSessionError();
    }
  };
}
export function destinationForError(error) {
  if (error.status === 401) return 'authentication';
  if (error.status === 404) return 'NotFound';
  return null;
}
