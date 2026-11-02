import { useAuthStore } from "@/stores/auth.js";
import { createApiClient } from './api-client.mjs';
export async function apiGet(path) {
  const auth = useAuthStore();
  return createApiClient({
    baseUrl: import.meta.env.VITE_BASE_URL,
    development: import.meta.env.DEV,
    getSession: () => ({ token: auth.token, expires: auth.expires }),
    clearSession: auth.logout,
  })(path);
}
