export function questionTotal(team, questionId) {
  return (team?.responses || []).reduce((sum, response) => {
    const value = response.answers?.find(answer => answer.id === questionId)?.rating;
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);
}
export function teamTotal(team, questionIds) {
  return questionIds.reduce((sum, id) => sum + questionTotal(team, id), 0);
}
export function teamAverage(team, questionIds) {
  return teamTotal(team, questionIds) / Math.max(team?.responses?.length || 0, 1);
}
export function rankTeams(teams, questionIds) {
  return [...teams].sort((a, b) => teamAverage(b, questionIds) - teamAverage(a, questionIds));
}
