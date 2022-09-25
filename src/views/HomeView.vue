<script setup>
import { storeToRefs } from "pinia";
import { useCompetitionStore } from "@/stores/competition.js";
import CompetitionItem from "@/components/CompetitionItem.vue";
import TheLoader from "../components/TheLoader.vue";

const { competitions } = storeToRefs(useCompetitionStore());
const { fetchCompetitions } = useCompetitionStore();

fetchCompetitions();
</script>

<template>
  <main class="mb-8 mt-[5rem] text-center">
    <h3 class="heading--primary">Competitions Fields</h3>
    <section
      class="mt-14 grid grid-cols-1 items-center justify-center gap-4 px-4 md:grid-cols-2"
      v-if="competitions.length"
    >
      <CompetitionItem
        v-for="competition in competitions"
        :key="competition.id"
        :competition="competition"
      />
    </section>
    <TheLoader v-else />
  </main>
</template>
