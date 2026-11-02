export function questionTotal(team, questionId) {
  return (team?.responses || []).reduce((sum, response) => {
    const value = response.answers?.find(answer => answer.id === questionId)?.rating;
    if (!Number.isFinite(value)) throw new Error('Incomplete scoring data. A criterion rating is missing or invalid; rankings cannot be calculated.');
    return sum + value;
  }, 0);
}
function requireCriteria(questionIds) {
  if (!Array.isArray(questionIds) || !questionIds.length) {
    throw new Error('Incomplete scoring data. No rating criteria are configured; rankings cannot be calculated.');
  }
}
export function teamTotal(team, questionIds) {
  requireCriteria(questionIds);
  return questionIds.reduce((sum, id) => sum + questionTotal(team, id), 0);
}
export function teamAverage(team, questionIds) {
  return teamTotal(team, questionIds) / Math.max(team?.responses?.length || 0, 1);
}
export function rankTeams(teams, questionIds) {
  requireCriteria(questionIds);
  // Preserve the original event implementation: descending SUM, never average.
  const totals = new Map(teams.map(team => [team, teamTotal(team, questionIds)]));
  return [...teams].sort((a, b) => totals.get(b) - totals.get(a));
}
