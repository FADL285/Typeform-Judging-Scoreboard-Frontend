import { ref } from "vue";
import { defineStore } from "pinia";
import { isValidSession, createSessionManager } from "../session.mjs";
import { backendUrl, requestJson } from "../request.mjs";
const STORAGE_KEY = "scoreboard-session";
export const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const expires = ref(0);
  const manager = createSessionManager({
    read: () => sessionStorage.getItem(STORAGE_KEY),
    write: value => sessionStorage.setItem(STORAGE_KEY, value),
    remove: () => sessionStorage.removeItem(STORAGE_KEY),
    publish: session => { token.value = session.token; expires.value = session.expires; },
    fetchLogin: (username, password) => requestJson(`${backendUrl(import.meta.env.VITE_BASE_URL, import.meta.env.DEV)}/api/auth`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }),
  });
  manager.restore();
  function isSessionValid() {
    const valid = isValidSession({ token: token.value, expires: expires.value });
    if (!valid) manager.logout();
    return valid;
  }
  return { isSessionValid, token, expires, login: manager.login, logout: manager.logout };
});
