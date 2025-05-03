// src/api/dashboard/dashboard.types.ts

export type DashboardResponse = {
  role: "admin" | "user";
  username?: string;

  // Admin stats
  totalUsers: number;
  totalMovies: number;
  totalReviews: number;
  avgRating?: number; // ✅ Added

  // User stats
  moviesWatched?: number;
  watchlistCount?: number;
  hoursWatched?: number;
  memberSince?: string; // ✅ Added
  favoriteGenre?: string; // ✅ Added

  recentActivity: {
    id: string;
    user?: string;
    action: string;
    movieTitle?: string;
    time: string; // ✅ Added
  }[];
};
