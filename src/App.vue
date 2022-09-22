<script setup>
import { RouterView, RouterLink } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/">
        <img
          src="@/assets/logo.webp"
          alt="IEEE ManSB"
          class="mx-auto my-4 w-full max-w-lg px-4"
        />
      </RouterLink>
      <TheHeader />
    </div>
  </header>

  <RouterView />
</template>
