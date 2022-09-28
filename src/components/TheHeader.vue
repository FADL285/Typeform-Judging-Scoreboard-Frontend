<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/">
        <img
          src="@/assets/logo.webp"
          alt="IEEE ManSB"
          class="mx-auto my-0 w-72 max-w-sm px-4 py-4"
        />
      </RouterLink>

      <div class="text-center" id="navbar">
        <h1 class="mb-8 mt-4 text-4xl font-semibold lg:text-5xl xl:text-6xl">
          <RouterLink to="/">
            NASA Space Apps Cairo
            <br />
            👨‍🚀 Hackathon 👩‍🚀
          </RouterLink>
        </h1>
      </div>
    </div>
  </header>
</template>
