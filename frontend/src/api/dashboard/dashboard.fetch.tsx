// src/api/dashboard/dashboard.fetch.ts
import { DashboardResponse } from "@/types/dashboard.types";
import { env } from "@/utils/config";

export async function fetchDashboardData(): Promise<DashboardResponse> {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${env.BACKEND_URL}/api/dashboard`, {
    headers: {
      Authorization: token ?? "",
    },
  });

  const data = await res.json();
  console.log("dashboard", data);
  if (!res.ok) throw new Error(data.message);
  return data;
}
