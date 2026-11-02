export function isValidSession(session, now = Date.now()) {
  return typeof session?.token === 'string' && session.token.length > 0 && Number.isFinite(session.expires) && session.expires > now;
}
export function createSessionManager({ read, write, remove, publish, fetchLogin, now = Date.now }) {
  let attempt = 0;
  const cleanStorage = () => { try { remove(); } catch { /* Storage can be denied. */ } };
  function logout() { attempt++; publish({ token: '', expires: 0 }); cleanStorage(); }
  function restore() {
    try {
      const saved = JSON.parse(read() || 'null');
      if (isValidSession(saved, now())) { publish(saved); return; }
    } catch { /* Continue signed out if storage or JSON is unavailable. */ }
    logout();
  }
  async function login(username, password) {
    const id = ++attempt;
    let result;
    try { result = await fetchLogin(username, password); }
    catch (error) { if (id !== attempt) return false; throw error; }
    if (id !== attempt) return false;
    if (!isValidSession(result, now())) throw new Error('Invalid sign-in response');
    try { write(JSON.stringify(result)); }
    catch { throw new Error('Session storage is unavailable. Enable it and try again.'); }
    publish(result);
    return true;
  }
  return { restore, login, logout };
}
