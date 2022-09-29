import { computed } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

// GET AUTH INFO AND PASSWORD From .env
const authUser = import.meta.env.VITE_AUTH_USER;
const authPassword = import.meta.env.VITE_AUTH_PASS;
const authIdentifier = import.meta.env.VITE_AUTH_IDENTIFIER;

export const useAuthStore = defineStore("auth", () => {
  const identifier = useLocalStorage("identifier");
  const authenticated = computed(() => identifier.value === authIdentifier);
  function login(username, password) {
    if (username === authUser && password === authPassword) {
      identifier.value = authIdentifier;
    } else {
      throw new Error("Username or password incorrect");
    }
  }

  return {
    authenticated,
    login,
  };
});
