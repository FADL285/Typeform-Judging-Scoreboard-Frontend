import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rankTeams, teamAverage, questionTotal } from '../src/scoring.mjs';
const response = rating => ({ answers: [{ id: 'q', rating }] });
test('ranking preserves original SUM while cards can display a different average', () => {
  const teams = [{ id: 'many', responses: [response(5), response(5)] }, { id: 'high-average', responses: [response(9)] }];
  assert.equal(rankTeams(teams, ['q'])[0].id, 'many');
  assert.equal(teams[0].id, 'many');
  assert.equal(teamAverage(teams[0], ['q']), 5);
  assert.equal(teamAverage(teams[1], ['q']), 9);
});
test('missing/non-numeric criterion data is explicit, never silently scored zero', () => {
  for (const team of [{ responses: [response(8), { answers: [] }] }, { responses: [response(NaN)] }]) {
    assert.throws(() => questionTotal(team, 'q'), /Incomplete scoring data/);
    assert.throws(() => rankTeams([team], ['q']), /Incomplete scoring data/);
  }
  assert.equal(teamAverage({}, ['q']), 0);
});
