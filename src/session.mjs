export function isValidSession(session, now = Date.now()) {
  return typeof session?.token === 'string' && session.token.length > 0 && Number.isFinite(session.expires) && session.expires > now;
}
