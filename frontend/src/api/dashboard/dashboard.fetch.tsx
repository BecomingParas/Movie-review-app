// dashboard.fetch.ts
import { TDashboard } from "@/types/dashboard.types";
import { env } from "@/utils/config";

export async function fetchDashboard(): Promise<TDashboard> {
  // 1) grab the raw string, which may be null
  const rawToken = localStorage.getItem("accessToken");
  if (!rawToken) {
    throw new Error("Not authenticated");
  }

  // 2) normalize it
  const token = rawToken.startsWith("Bearer ")
    ? rawToken.substring(7)
    : rawToken;

  const res = await fetch(`${env.BACKEND_URL}/api/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch dashboard");
  return data as TDashboard;
}
export type { TDashboard };
