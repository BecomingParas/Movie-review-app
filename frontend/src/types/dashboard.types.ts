// src/api/dashboard/dashboard.types.ts
interface Profile {
  username: string;
  email: string;
}
interface ActivityItemBase {
  id: string;
  title: string;
  duration: string;
}
interface UserActivityItem extends ActivityItemBase {
  action: string;
}

interface AdminActivityItem extends ActivityItemBase {
  action: string;
}

export interface UserDashboardData {
  role: "user";
  profile: Profile;
  stats: {
    memberSince: string;
    favoriteGenre: string | null;
    avgRating: number;
    totalReviews: number;
    moviesWatched: number;
    watchlistCount: number;
    hoursWatched: number;
  };
  recentActivity: UserActivityItem[];
}

export interface AdminDashboardData {
  role: "admin";
  profile: Profile;
  stats: {
    totalUsers: number;
    totalMovies: number;
    totalReviews: number;
    avgRating: number;
  };
  recentActivity: AdminActivityItem[];
}

export type DashboardResponse = UserDashboardData | AdminDashboardData;
