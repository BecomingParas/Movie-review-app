// dashboard.query.ts
import { useQuery } from "@tanstack/react-query";
import { fetchDashboard, TDashboard } from "./dashboard.fetch";

export function useDashboardQuery() {
  return useQuery<TDashboard, Error>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });
}
