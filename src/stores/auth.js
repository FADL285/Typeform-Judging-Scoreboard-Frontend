import { ref } from "vue";
import { defineStore } from "pinia";

import { isValidSession } from "../session.mjs";

const STORAGE_KEY = "scoreboard-session";
export const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const expires = ref(0);
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
    if (isValidSession(saved)) { token.value = saved.token; expires.value = saved.expires; }
  } catch { sessionStorage.removeItem(STORAGE_KEY); }
  function isSessionValid() {
    const valid = isValidSession({ token: token.value, expires: expires.value });
    if (!valid) logout();
    return valid;
  }
  function logout() {
    token.value = ""; expires.value = 0; sessionStorage.removeItem(STORAGE_KEY);
  }
  async function login(username, password) {
    const base = import.meta.env.VITE_BASE_URL.replace(/\/$/, "");
    const response = await fetch(`${base}/api/auth`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Unable to sign in");
    token.value = result.token; expires.value = result.expires;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  }
  return { isSessionValid, token, expires, login, logout };
});
