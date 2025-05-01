// src/api/dashboard/dashboard.query.ts
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "./dashboard.fetch";
import { DashboardResponse } from "@/types/dashboard.types";

export function useDashboardQuery() {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });
}
