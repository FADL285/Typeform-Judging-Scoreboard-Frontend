import { useAuthStore } from "@/stores/auth.js";

export async function apiGet(path) {
  const auth = useAuthStore();
  const base = import.meta.env.VITE_BASE_URL.replace(/\/$/, "");
  const response = await fetch(`${base}/api/${path}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  });
  if (response.status === 401) {
    auth.logout();
    throw new Error("Your session expired. Please sign in again.");
  }
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Unable to load scoreboard");
  return data.data;
}
