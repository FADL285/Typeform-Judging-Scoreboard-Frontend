<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps(["competition"]);

const lightColorsList = [
  "white",
  "floralwhite",
  "azure",
  "aliceblue",
  "darkgrey",
  "greenyellow",
  "yellow",
];

const ribbonBorderStyle = computed(() => ({
  borderColor: props.competition?.variables?.color,
}));
const ribbonStyle = computed(() => ({
  backgroundColor: props.competition?.variables?.color,
  color: lightColorsList.includes(props.competition?.variables?.color)
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
        <div
          class="ribbon text-base"
          :style="ribbonBorderStyle"
          v-if="props.competition?.variables?.color"
        >
          <span :style="ribbonStyle">
            {{ competition?.variables?.panel || "Panel" }}
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

      <div class="mt-8 inline-flex items-center justify-center text-zinc-700">
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

<style lang="pcss">
  a.card:nth-child(3n + 3) {
  @apply md:col-span-3;
}


/* common */
.ribbon {
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: absolute;
}
.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: -1;
  content: "";
  display: block;
  border: 5px solid;
  border-color: inherit;
}
.ribbon span {
  @apply bg-zinc-800 text-white;
  position: absolute;
  display: block;
  width: 185px;
  height: 38px;
  padding: 7px 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  font-weight: 500;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  text-align: center;
}

/* top left*/
.ribbon {
  top: -10px;
  left: -10px;
}
.ribbon::before,
.ribbon::after {
  border-top-color: transparent;
  border-left-color: transparent;
}
.ribbon::before {
  top: 0;
  right: 35px;
}
.ribbon::after {
  bottom: 35px;
  left: 0;
}
.ribbon span {
  right: 12px;
  top: 24px;
  transform: rotate(-45deg);
}
</style>
