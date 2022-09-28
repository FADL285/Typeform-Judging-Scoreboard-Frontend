<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps(["competition"]);

const lightColorsList = ["white", "yellow"];

const ribbonBorderStyle = computed(() => ({
  borderColor: props.competition.variables.color,
}));
const ribbonStyle = computed(() => ({
  backgroundColor: props.competition.variables.color,
  color: lightColorsList.includes(props.competition.variables.color)
    ? "black"
    : "white",
}));
</script>

<template>
  <RouterLink
    :to="{ name: 'competition', params: { id: competition.id } }"
    class="card group relative flex flex-col justify-between rounded-sm bg-white py-8 px-6 shadow-xl transition-shadow hover:shadow-lg"
  >
    <article>
      <div>
        <div class="ribbon text-base" :style="ribbonBorderStyle">
          <span :style="ribbonStyle">
            {{ competition.variables.panel }}
          </span>
        </div>
        <h4 class="text-dynamic px-10 font-bold text-gray-800">
          {{ competition.title }}
        </h4>
        <div class="mt-4 border-t-2 border-indigo-100 pt-2">
          <p
            class="text-md font-medium uppercase tracking-widest text-gray-500"
          >
            {{ competition.teams.length }} Teams
          </p>
        </div>
      </div>

      <div class="mt-8 inline-flex items-center justify-center text-rose-600">
        <p class="text-lg font-medium">More Details</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ml-3 h-6 w-6 transform transition-transform group-hover:translate-x-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </article>
  </RouterLink>
</template>
