<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { destinationForError } from "../api-client.mjs";
import { storeToRefs } from "pinia";
import { useCompetitionStore } from "@/stores/competition.js";
import CompetitionItem from "@/components/CompetitionItem.vue";
import TheLoader from "../components/TheLoader.vue";

const { competitions } = storeToRefs(useCompetitionStore());
const { fetchCompetitions } = useCompetitionStore();

const router = useRouter();
const loadError = ref("");
const loading = ref(false);
async function load() {
  loadError.value = "";
  loading.value = true;
  try { await fetchCompetitions(); }
  catch (error) {
    if (destinationForError(error) === "authentication") router.replace({ name: "authentication" });
    else loadError.value = error.message || "Unable to load panels. Please try again.";
  } finally { loading.value = false; }
}
load();
</script>

<template>
  <main class="mb-8 mt-[5rem] text-center">
    <h3 class="heading--primary">Hackathon Panels</h3>
    <section
      class="mt-14 grid grid-cols-1 items-center justify-center gap-5 px-4 md:grid-cols-2"
      v-if="competitions.length"
    >
      <CompetitionItem
        v-for="competition in competitions"
        :key="competition.id"
        :competition="competition"
      />
    </section>
    <div v-else-if="loadError" role="alert" class="mt-8">
      <p>{{ loadError }}</p><button @click="load" class="mt-4 underline">Try again</button>
    </div>
    <TheLoader v-else-if="loading" />
    <p v-else class="mt-8">No panels available.</p>
  </main>
</template>
