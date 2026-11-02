import { defineStore } from "pinia";
import { apiGet } from "@/api.js";
import { questionTotal, teamTotal, rankTeams } from "../scoring.mjs";

export const useCompetitionStore = defineStore("competition", {
  state: () => ({
    competitions: [],
    competition: null,
  }),
  getters: {
    teams: (state) => state.competition.teams,
    teamById: (state) => (id) =>
      state.competition.teams.find((team) => team.id === id),
    ratingQuestionsIds: (state) =>
      state.competition.ratingQuestions.map((q) => q.id),
    ratingQuestionById: (state) => (id) =>
      state.competition.ratingQuestions.find((q) => q.id === id),
    overallQuestionsRating: (state) =>
      state.competition.ratingQuestions.reduce((acc, q) => acc + q.max, 0),
    competitionDetails: (state) => (id) =>
      state.competitions.find((c) => c.id === id),
  },
  actions: {
    async fetchCompetitions(isCurrent = () => true) {
      // Check if competitions exists
      if (this.competitions.length) return;

      const result = (await apiGet("")).sort((c1, c2) => {
        if (c1.variables?.panel)
          return c1.variables.panel.localeCompare(c2.variables.panel);
        else return c1.title.localeCompare(c2.title);
      });
      if (isCurrent()) this.competitions = result;
    },
    async fetchCompetition(id, isCurrent = () => true) {
      this.competition = null;

      const result = await apiGet(encodeURIComponent(id));
      if (isCurrent()) this.competition = result;
    },
    getOverallQuestionRating(teamId, questionId) {
      return questionTotal(this.teamById(teamId), questionId);
    },
    getTeamOverallRating(teamId) {
      return teamTotal(this.teamById(teamId), this.ratingQuestionsIds);
    },
    orderedTeams(teams) {
      return rankTeams(teams, this.ratingQuestionsIds);
    },
  },
});
