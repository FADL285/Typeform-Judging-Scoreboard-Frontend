<script setup>
import { ref, onBeforeUnmount, watch } from "vue";
import { createLoadGuard } from "../load-state.mjs";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import TeamItem from "@/components/TeamItem.vue";
import { useCompetitionStore } from "@/stores/competition.js";
import TheLoader from "../components/TheLoader.vue";

import { destinationForError } from "../api-client.mjs";

const router = useRouter();
const route = useRoute();
const props = defineProps(["id"]);

const { competition } = storeToRefs(useCompetitionStore());
const { fetchCompetition, orderedTeams } = useCompetitionStore();

const teams = ref([]);

const loadError = ref("");
const loading = ref(false);
const guard = createLoadGuard();
onBeforeUnmount(() => guard.stop());
async function load() {
  const isCurrent = guard.begin();
  loadError.value = ""; loading.value = true;
  try {
    await fetchCompetition(props.id, isCurrent);
    if (!isCurrent()) return;
    teams.value = orderedTeams(competition.value.teams);
  } catch (error) {
    if (!isCurrent()) return;
    competition.value = null;
    teams.value = [];
    const destination = destinationForError(error);
    if (destination === "authentication") router.replace({ name: "authentication" });
    else if (destination === "NotFound") router.replace({
      name: "NotFound", params: { pathMatch: route.path.substring(1).split("/") },
      query: route.query, hash: route.hash,
    });
    else loadError.value = error.message || "Unable to load scores. Please try again.";
  } finally { if (isCurrent()) loading.value = false; }
}
watch(() => props.id, load, { immediate: true });
</script>

<template>
  <main v-if="competition" class="mb-8 mt-[5rem] text-center">
    <h5
      class="mb-4 flex items-baseline justify-center gap-4 text-center text-4xl"
      v-if="competition?.variables?.color"
    >
      <span
        class="inline-block h-7 w-7 rounded-full border"
        :style="{ backgroundColor: competition.variables.color }"
      ></span>
      <span>{{ competition.variables.panel }}</span>
    </h5>
    <h3 class="heading--primary">{{ competition.title }}</h3>
    <section
      v-if="teams.length"
      class="mt-[5rem] grid grid-cols-1 items-center gap-x-16 gap-y-[4rem] px-5 sm:px-12 md:grid-cols-2 xl:grid-cols-3"
    >
      <TeamItem
        v-for="(team, idx) in teams"
        :key="team.id"
        :team="team"
        :order="idx + 1"
      />
    </section>
  </main>
  <div v-else-if="loadError" role="alert" class="mt-8 text-center">
    <p>{{ loadError }}</p><button @click="load" class="mt-4 underline">Try again</button>
  </div>
  <TheLoader v-else-if="loading" />
</template>
