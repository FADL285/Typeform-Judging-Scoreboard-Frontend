import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rankTeams, teamAverage, questionTotal } from '../src/scoring.mjs';
const response = rating => ({ answers: [{ id: 'q', rating }] });
test('ranking matches displayed average with unequal judge counts', () => {
  const teams = [{ id: 'many', responses: [response(5), response(5)] }, { id: 'best', responses: [response(9)] }];
  assert.equal(rankTeams(teams, ['q'])[0].id, 'best');
  assert.equal(teams[0].id, 'many');
  assert.equal(teamAverage(teams[1], ['q']), 9);
});
test('missing/non-numeric criterion values and empty teams are safe', () => {
  const team = { responses: [response(8), { answers: [] }, response(NaN)] };
  assert.equal(questionTotal(team, 'q'), 8);
  assert.equal(teamAverage(team, ['q']), 8 / 3);
  assert.equal(teamAverage({}, ['q']), 0);
});
