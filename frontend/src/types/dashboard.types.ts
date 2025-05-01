// src/api/dashboard/dashboard.types.ts
export type DashboardResponse = {
  role: "admin" | "user";
  username?: string;

  // Admin stats
  totalUsers: number;
  totalMovies: number;
  totalReviews: number;

  // User stats
  moviesWatched?: number;
  watchlistCount?: number;
  hoursWatched?: number;

  recentActivity: {
    id: string;
    user?: string;
    action: string;
    movieTitle: string;
  }[];
};
