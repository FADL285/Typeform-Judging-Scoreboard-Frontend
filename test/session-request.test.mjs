import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSessionManager } from '../src/session.mjs';
import { backendUrl, requestJson } from '../src/request.mjs';
import { createApiClient, destinationForError } from '../src/api-client.mjs';
const session = token => ({ token, expires: 9000 });

test('backend transport rejects HTTP except explicit local development', () => {
  assert.throws(() => backendUrl('http://backend.example'));
  assert.throws(() => backendUrl('http://localhost'));
  assert.equal(backendUrl('http://localhost:3000', true), 'http://localhost:3000');
  assert.throws(() => backendUrl('http://backend.example', true));
  assert.throws(() => backendUrl('https://user:password@backend.example'));
});
test('denied storage cannot prevent safe signed-out initialization', () => {
  let state;
  const denied = () => { throw new Error('Denied'); };
  const manager = createSessionManager({ read: denied, write: denied, remove: denied, publish: value => { state = value; }, fetchLogin: async () => session('new'), now: () => 1000 });
  assert.doesNotThrow(() => manager.restore());
  assert.equal(state.token, '');
  assert.doesNotThrow(() => manager.logout());
});
test('failed persistence never publishes a partial new login', async () => {
  let state = { token: '', expires: 0 };
  const manager = createSessionManager({ read: () => null, write: () => { throw new Error('Denied'); }, remove() {}, publish: value => { state = value; }, fetchLogin: async () => session('new'), now: () => 1000 });
  await assert.rejects(manager.login('user', 'password'), /storage is unavailable/);
  assert.equal(state.token, '');
});
test('newer overlapping login wins even if the older response arrives last', async () => {
  let state; const requests = []; const writes = [];
  const manager = createSessionManager({ read: () => null, write: value => writes.push(value), remove() {}, publish: value => { state = value; }, fetchLogin: () => new Promise(resolve => requests.push(resolve)), now: () => 1000 });
  const old = manager.login('user', 'old'); const current = manager.login('user', 'new');
  requests[1](session('new')); assert.equal(await current, true);
  requests[0](session('old')); assert.equal(await old, false);
  assert.equal(state.token, 'new'); assert.equal(writes.length, 1);
});
test('non-JSON errors preserve 404 routing and stalled requests have deadlines', async () => {
  const get = createApiClient({ baseUrl: 'https://backend.example', getSession: () => session('signed'), clearSession() {}, now: () => 1000,
    fetchImpl: async () => ({ ok: false, status: 404, json: async () => { throw new Error('Not JSON'); } }),
  });
  await assert.rejects(get('missing'), error => destinationForError(error) === 'NotFound');
  let signal;
  await assert.rejects(requestJson('https://backend.example', {}, { timeoutMs: 10, fetchImpl: (_url, options) => { signal = options.signal; return new Promise(() => {}); } }), /timed out/);
  assert.equal(signal.aborted, true);
});
