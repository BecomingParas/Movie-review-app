import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Film,
  Clock,
  Star,
  BookMarked,
  User,
  ChevronRight,
  BarChart,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { featuredMovies } from "@/data/mockData";
import { useAuthStore } from "@/store/auth.store";

// Mock data for user and stats
const userActivity = [
  { id: 1, action: "Added a review for Interstellar", time: "2 hours ago" },
  { id: 2, action: "Added The Matrix to watchlist", time: "1 day ago" },
  { id: 3, action: "Rated Inception 4.5 stars", time: "3 days ago" },
];

// Simulate authentication check
const checkAuth = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate API call to check authentication
    setTimeout(() => {
      // For demo purposes, we'll use localStorage to check if user is logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      resolve(isLoggedIn);
    }, 1500); // Simulate network delay
  });
};

// Simulate fetching user data
const fetchUserData = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate API call to fetch user data
    setTimeout(() => {
      // For demo purposes, randomly decide if data is available
      // In a real app, this would be an actual API call that might fail
      const dataAvailable = Math.random() > 0.3; // 70% chance of success
      resolve(dataAvailable);
    }, 2000); // Simulate network delay
  });
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [dataAvailable, setDataAvailable] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authStatus = await checkAuth();
        if (!authStatus) {
          toast({
            title: "Authentication required",
            description: "Please sign in to access your dashboard",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        // Only fetch data if user is authenticated
        const hasData = await fetchUserData();
        setDataAvailable(hasData);
        setIsLoading(false);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsLoading(false);
        setDataAvailable(false);
        navigate("/sign-in");
      }
    };

    verifyAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <main className="flex-grow pt-16 flex flex-col items-center justify-center">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-semibold">
              Loading your dashboard...
            </h2>
            <p className="text-muted-foreground mt-2">
              Please wait while we fetch your data
            </p>
          </div>
          <div className="container mx-auto px-4 sm:px-6 py-12 mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <Skeleton className="h-6 w-[180px]" />
                  <Skeleton className="h-4 w-[250px]" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i}>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-3 w-[120px]" />
                          </div>
                        </div>
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-[150px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="text-center space-y-2">
                      <Skeleton className="h-5 w-[120px] mx-auto" />
                      <Skeleton className="h-4 w-[150px] mx-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!dataAvailable) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <main className="flex-grow pt-16 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-3 w-fit mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-amber-600 dark:text-amber-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Unable to load dashboard data
            </h2>
            <p className="text-muted-foreground mb-6">
              We're having trouble loading your dashboard data. This could be
              due to a temporary service issue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
              <Button onClick={() => navigate("/movies")}>Browse Movies</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Welcome back! Here's an overview of your movie activities.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Movies Watched"
              value="27"
              icon={Film}
              description="All time"
            />
            <StatCard
              title="Watchlist"
              value="12"
              icon={BookMarked}
              description="Movies to watch"
            />
            <StatCard
              title="Reviews"
              value="18"
              icon={Star}
              description="Written reviews"
            />
            <StatCard
              title="Hours Watched"
              value="43"
              icon={Clock}
              description="This month"
            />
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
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
                          <p className="text-sm font-medium">
                            {activity.action}
                          </p>
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
            <Card>
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
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Movie Enthusiast</h3>
                    <p className="text-sm text-muted-foreground">
                      Member since October 2023
                    </p>
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
                      <span className="text-sm font-medium">18</span>
                    </div>
                  </div>
                  <Button className="w-full">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Movies */}
          <h2 className="text-2xl font-bold mt-12 mb-6">Recommended For You</h2>
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
      </main>
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
    <Card>
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

// Loading skeleton component
const LoadingSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-[60px] mb-1" />
        <Skeleton className="h-3 w-[100px]" />
      </CardContent>
    </Card>
  );
};

export default Dashboard;
