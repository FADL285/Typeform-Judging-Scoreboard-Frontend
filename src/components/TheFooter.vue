<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="mt-auto py-4 text-center text-gray-700">
    <p class="copyright">
      Copyrights &copy; {{ currentYear }} All Rights Reserved.
    </p>
    <p>
      Created by
      <a
        class="font-semibold text-black underline hover:text-gray-600"
        href="https://www.linkedin.com/in/fadl285"
        target="_blank"
      >
        Mohamed Fadl
      </a>
    </p>
  </footer>
</template>
