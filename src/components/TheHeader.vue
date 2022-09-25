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
          class="mx-auto my-0 w-full max-w-lg px-4 py-4"
        />
      </RouterLink>

      <div class="text-center" id="navbar">
        <h1 class="mb-8 mt-4 text-4xl font-semibold lg:text-5xl xl:text-6xl">
          <RouterLink
            to="/"
            class="before:opacity-0 before:transition before:duration-500 after:opacity-0 after:transition after:duration-500 hover:before:opacity-40 hover:after:opacity-40 lg:before:content-['🏠'] lg:after:content-['🏠']"
          >
            IEEE Victoris Competitions Board
          </RouterLink>
        </h1>
      </div>
    </div>
  </header>
</template>
