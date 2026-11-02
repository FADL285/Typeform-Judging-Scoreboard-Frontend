import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createLoadGuard } from '../src/load-state.mjs';
test('replaced and unmounted loads cannot publish success, errors, or cleanup', async () => {
  const guard = createLoadGuard(); const published = [];
  let finish;
  const old = guard.begin();
  const pending = new Promise(resolve => { finish = resolve; }).then(() => {
    if (old()) published.push('old success');
    throw new Error('old failure');
  }).catch(() => { if (old()) published.push('old error'); })
    .finally(() => { if (old()) published.push('old cleanup'); });
  const current = guard.begin(); finish(); await pending;
  assert.deepEqual(published, []); assert.equal(current(), true);
  guard.stop(); assert.equal(current(), false); assert.equal(guard.begin()(), false);
});
