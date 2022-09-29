<script setup></script>

<template>
  <!-- Login Form With Tailwind CSS -->
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md">
      <form class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
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
          />
          <!-- <p class="text-xs italic text-red-500">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-between">
          <button
            class="focus:shadow-outline w-full rounded bg-rose-500 py-2 px-4 font-bold text-white hover:bg-rose-700 focus:outline-none"
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
