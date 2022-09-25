import { defineStore } from "pinia";
import { useFetch } from "@vueuse/core";

const BASE_API_URL = "https://ieee-victoris.herokuapp.com/api/";

export const useCompetitionStore = defineStore("competition", {
  state: () => ({
    competitions: [],
    competition: {},
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
  },
  actions: {
    async fetchCompetitions() {
      const { error, data } = await useFetch(BASE_API_URL);
      if (error.value) {
        throw new Error(error.value);
      }

      this.competitions = JSON.parse(data.value).data.sort((c1, c2) =>
        c1.title.localeCompare(c2.title)
      );
    },
    async fetchCompetition(id) {
      const { statusCode, data } = await useFetch(`${BASE_API_URL}/${id}`);
      if (statusCode.value === 404) {
        throw new Error("Competition not found");
      }

      this.competition = JSON.parse(data.value)?.data || {};
    },
    getOverallQuestionRating(teamId, questionId) {
      const team = this.teamById(teamId);
      if (!(team && team.responses)) {
        return 0;
      }
      const questionResponses = team.responses.map((response) =>
        response.answers.find((answer) => answer.id === questionId)
      );
      return questionResponses.reduce(
        (sum, response) => sum + response.rating,
        0
      );
    },
    getTeamOverallRating(teamId) {
      return this.ratingQuestionsIds.reduce((sum, questionId) => {
        return sum + this.getOverallQuestionRating(teamId, questionId);
      }, 0);
    },
    orderedTeams(teams) {
      return teams.sort(
        (t1, t2) =>
          this.getTeamOverallRating(t2.id) - this.getTeamOverallRating(t1.id)
      );
    },
  },
});
