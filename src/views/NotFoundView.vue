<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="text-center">
    <h1 class="text-4xl">404 Not Found</h1>
    <p class="my-4 text-2xl">The page you are looking for does not exist.</p>
    <RouterLink to="/" class="text-2xl underline">Go to Home</RouterLink>
  </main>
</template>
