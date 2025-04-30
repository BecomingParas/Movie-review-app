// dashboard.types.ts
export type TDashboardAdmin = {
  role: "admin";
  totalUsers: number;
  totalMovies: number;
  totalReviews: number;
  averageRating: number;
  recentActivity: {
    id: string;
    user: string;
    action: string;
    movieTitle?: string;
    time: string;
  }[];
};

export type TDashboardUser = {
  role: "user";
  username: string;
  memberSince: string;
  favoriteGenre?: string;
  moviesWatched: number;
  watchlistCount: number;
  totalReviews: number;
  hoursWatched: number;
  recentActivity: {
    id: string;
    action: string;
    movieTitle?: string;
    time: string;
  }[];
};

export type TDashboard = TDashboardAdmin | TDashboardUser;
