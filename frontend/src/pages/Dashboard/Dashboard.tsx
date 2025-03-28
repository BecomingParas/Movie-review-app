import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Film,
  Clock,
  Star,
  BookMarked,
  User,
  ChevronRight,
  BarChart,
} from "lucide-react";
import { featuredMovies } from "@/data/mockData";
import { authService } from "@/services/authService";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for user stats (replace with API calls in the future)
const userStats = {
  moviesWatched: 27,
  watchlistCount: 12,
  reviewsCount: 18,
  hoursWatched: 43,
};

const userActivity = [
  { id: 1, action: "Added a review for Interstellar", time: "2 hours ago" },
  { id: 2, action: "Added The Matrix to watchlist", time: "1 day ago" },
  { id: 3, action: "Rated Inception 4.5 stars", time: "3 days ago" },
];

const DashboardPage = () => {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: authService.getCurrentUser,
  });

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 text-foreground">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-96 mb-8" />

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Welcome back, {user?.username}! Here's an overview of your movie
          activities.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Movies Watched"
            value={userStats.moviesWatched.toString()}
            icon={Film}
            description="All time"
          />
          <StatCard
            title="Watchlist"
            value={userStats.watchlistCount.toString()}
            icon={BookMarked}
            description="Movies to watch"
          />
          <StatCard
            title="Reviews"
            value={userStats.reviewsCount.toString()}
            icon={Star}
            description="Written reviews"
          />
          <StatCard
            title="Hours Watched"
            value={userStats.hoursWatched.toString()}
            icon={Clock}
            description="This month"
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest interactions with movies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivity.map((activity) => (
                  <div key={activity.id}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Profile Summary */}
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Summary
              </CardTitle>
              <CardDescription>Your reviewer profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-primary" />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium">{user?.username}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <Separator />
                <div className="w-full space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Favorite Genre:</span>
                    <span className="text-sm font-medium">Sci-Fi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average Rating:</span>
                    <span className="text-sm font-medium">4.2/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Reviews:</span>
                    <span className="text-sm font-medium">
                      {userStats.reviewsCount}
                    </span>
                  </div>
                </div>
                <Button className="w-full">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Movies */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredMovies.slice(0, 4).map((movie) => (
              <Card key={movie.id} className="overflow-hidden group">
                <div className="aspect-[2/3] relative">
                  <img
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white font-medium">{movie.title}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-3 w-3 fill-current mr-1" />
                      <span className="text-xs text-white">
                        {movie.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <a href="/movies">See All Recommendations</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for stat cards
const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
}) => {
  return (
    <Card className="bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;
