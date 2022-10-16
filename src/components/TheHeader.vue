<script setup>
import { RouterLink } from "vue-router";
const appName = import.meta.env.VITE_APP_NAME;
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/">
        <img
          src="@/assets/logo.svg"
          alt="Typeform Scoreboard Logo"
          class="mx-auto my-0 w-full max-w-sm px-4 py-4"
        />
      </RouterLink>

      <div class="text-center" id="navbar">
        <h1
          class="mb-8 mt-4 text-3xl font-semibold md:text-4xl lg:text-5xl xl:text-6xl"
        >
          <RouterLink to="/">{{
            appName || "Typeform Scoreboard ✨"
          }}</RouterLink>
        </h1>
      </div>
    </div>
  </header>
</template>
