<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

const { login } = useAuthStore();
const router = useRouter();

const form = ref(null);
const formError = ref("");
const username = ref("");
const password = ref("");

const authenticate = () => {
  try {
    login(username.value, password.value);
    formError.value = "";
    form.value.reset();
    router.push({ name: "home" });
  } catch (error) {
    formError.value = error.message;
  }
};
</script>

<template>
  <!-- Login Form With Tailwind CSS -->
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md">
      <form
        @submit.prevent="authenticate"
        class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
        ref="form"
      >
        <h3 class="mb-6 text-center text-xl">Login to access the board!</h3>
        <div class="mb-4">
          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="username"
          >
            Username
          </label>
          <input
            class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Username"
            required
            v-model="username"
          />
        </div>
        <div class="mb-6">
          <label
            class="mb-2 block text-sm font-bold text-gray-700"
            for="password"
          >
            Password
          </label>
          <input
            class="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="password"
            type="password"
            placeholder="******************"
            required
            minlength="6"
            v-model="password"
          />
          <p class="text-base italic text-red-500" v-if="formError">
            {{ formError }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="focus:shadow-outline w-full rounded bg-zinc-800 py-2 px-4 font-bold text-white hover:bg-zinc-700 focus:outline-none"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
