import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValidSession } from '../src/session.mjs';
import { createApiClient, destinationForError } from '../src/api-client.mjs';

test('session expiry is reevaluated against the current clock', () => {
  const session = { token: 'test', expires: 2000 };
  assert.equal(isValidSession(session, 1000), true);
  assert.equal(isValidSession(session, 3000), false);
  assert.equal(isValidSession({ expires: 9999 }, 1000), false);
});
test('expired local session does not make a request and routes to sign-in', async () => {
  let cleared = false; let called = false;
  const get = createApiClient({ baseUrl: 'https://backend.example', getSession: () => ({ token: 'old', expires: 1000 }), clearSession: () => { cleared = true; }, now: () => 2000, fetchImpl: () => { called = true; } });
  await assert.rejects(get(''), error => destinationForError(error) === 'authentication');
  assert.equal(cleared, true); assert.equal(called, false);
});
test('API rejection clears a session; upstream/network failures are retryable, not NotFound', async () => {
  let cleared = false;
  const args = { baseUrl: 'https://backend.example', getSession: () => ({ token: 'signed', expires: 9000 }), clearSession: () => { cleared = true; }, now: () => 1000 };
  const unauthorized = createApiClient({ ...args, fetchImpl: async (_url, options) => {
    assert.equal(options.headers.Authorization, 'Bearer signed'); return { status: 401 };
  } });
  await assert.rejects(unauthorized('panel'), error => destinationForError(error) === 'authentication');
  assert.equal(cleared, true);
  const upstream = createApiClient({ ...args, fetchImpl: async () => ({ status: 500, ok: false, json: async () => ({ message: 'Try later' }) }) });
  await assert.rejects(upstream('panel'), error => destinationForError(error) === null);
  assert.equal(destinationForError({ status: 404 }), 'NotFound');
});

test('a delayed old-token 401 cannot erase a newer login or route it to sign-in', async () => {
  let session = { token: 'old', expires: 9000 };
  let resolveRequest; let cleared = false;
  const get = createApiClient({ baseUrl: 'https://backend.example', getSession: () => session, clearSession: () => { cleared = true; }, now: () => 1000,
    fetchImpl: () => new Promise(resolve => { resolveRequest = resolve; }),
  });
  const pending = get('panel');
  session = { token: 'new', expires: 9999 };
  resolveRequest({ status: 401 });
  await assert.rejects(pending, error => destinationForError(error) === null);
  assert.equal(cleared, false); assert.equal(session.token, 'new');
});

 test('late successful responses from an old session cannot publish panel data', async () => {
  let session = { token: 'old', expires: 9000 }; let complete;
  const get = createApiClient({ baseUrl: 'https://backend.example', getSession: () => session,
    clearSession() {}, now: () => 1000, fetchImpl: () => new Promise(resolve => { complete = resolve; }) });
  const pending = get('panel');
  session = { token: 'new', expires: 9000 };
  complete({ ok: true, status: 200, json: async () => ({ data: { title: 'old panel' } }) });
  await assert.rejects(pending, error => error.stale === true && destinationForError(error) === null);
 });

test('a current pending load routes to sign-in after another request clears the session', async () => {
  for (const status of [200, 401]) {
    let session = { token: 'old', expires: 9000 }; let complete;
    const get = createApiClient({ baseUrl: 'https://backend.example', getSession: () => session,
      clearSession: () => { session = null; }, now: () => 1000,
      fetchImpl: () => new Promise(resolve => { complete = resolve; }) });
    const pending = get('panel');
    session = null;
    complete({ ok: status === 200, status, json: async () => ({ data: { title: 'old panel' } }) });
    await assert.rejects(pending, error => destinationForError(error) === 'authentication');
  }
});
