<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import TeamItem from "@/components/TeamItem.vue";
import { useCompetitionStore } from "@/stores/competition.js";
import TheLoader from "../components/TheLoader.vue";

const router = useRouter();
const route = useRoute();
const props = defineProps(["id"]);

const { competition } = storeToRefs(useCompetitionStore());
const { fetchCompetition, orderedTeams } = useCompetitionStore();

const teams = ref([]);

(async () => {
  try {
    await fetchCompetition(props.id);
    teams.value = orderedTeams(competition.value.teams);
  } catch (error) {
    console.error(error);
    router.push({
      name: "NotFound",
      // preserve current path and remove the first char to avoid the target URL starting with `//`
      params: { pathMatch: route.path.substring(1).split("/") },
      // preserve existing query and hash if any
      query: route.query,
      hash: route.hash,
    });
  }
})();
</script>

<template>
  <main class="mb-8 mt-[5rem] text-center">
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
    <TheLoader v-else />
  </main>
</template>
