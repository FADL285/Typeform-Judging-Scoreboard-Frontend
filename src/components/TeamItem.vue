<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useCompetitionStore } from "@/stores/competition.js";

const { ratingQuestionsIds, ratingQuestions } = storeToRefs(
  useCompetitionStore()
);
const { getOverallQuestionRating, getTeamOverallRating } =
  useCompetitionStore();

const props = defineProps(["team", "order"]);

const responsesLength = computed(() => props.team?.responses?.length || 0);
const overallRating = computed(() => getTeamOverallRating(props.team.id));
</script>

<template>
  <article
    class="group relative flex flex-col justify-between rounded-sm bg-white py-8 px-6 shadow-xl transition-shadow hover:shadow-lg"
  >
    <header>
      <h5 class="text-5xl font-bold text-gray-800">{{ team.title }}</h5>
      <div class="mt-4 border-t-2 border-indigo-100 pt-2">
        <span class="team-place"> {{ order }} </span>
      </div>
    </header>

    <ul class="mt-6 space-y-3 px-6 text-xl text-gray-600">
      <li
        v-for="question in ratingQuestionsIds"
        :key="question"
        class="flex items-center justify-between"
      >
        <span>{{ ratingQuestions[question].title }}:</span>
        <span class="rate">
          {{ getOverallQuestionRating(team.id, question) }}
        </span>
      </li>
    </ul>

    <hr class="mx-auto my-8 w-1/2" />

    <footer>
      <p class="flex items-center justify-center text-2xl">
        Average Rate:
        <span class="mx-4 text-4xl text-blue-700">{{
          overallRating / Math.max(responsesLength, 1) > 0
            ? (overallRating / Math.max(responsesLength, 1)).toFixed(2)
            : 0
        }}</span>
      </p>

      <p class="mt-4 flex items-center justify-center text-xl">
        Total Rate:
        <span class="mx-4 text-3xl text-blue-700">
          {{ overallRating }}
        </span>
      </p>

      <p class="mt-4 text-center text-gray-500">
        💡 <span class="text-lg">{{ responsesLength }}</span>
        {{ responsesLength > 1 ? "responses" : "response" }}
      </p>
    </footer>
  </article>
</template>
