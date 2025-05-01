import React from "react";
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
  Loader,
  AlertCircle,
  Users,
  Database,
  Gauge,
} from "lucide-react";
import { useDashboardQuery } from "@/api/dashboard/dashboard.query";

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
          <p>Something went wrong loading your dashboard.</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Welcome back, {data.username ?? "Admin"}!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.role === "user" ? (
          <>
            <StatCard
              title="Movies Watched"
              value={data.moviesWatched!}
              icon={Film}
            />
            <StatCard
              title="Watchlist"
              value={data.watchlistCount!}
              icon={BookMarked}
            />
            <StatCard title="Reviews" value={data.totalReviews} icon={Star} />
            <StatCard
              title="Hours Watched"
              value={data.hoursWatched!}
              icon={Clock}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Total Users"
              value={data.totalUsers!}
              icon={Users}
            />
            <StatCard
              title="Total Movies"
              value={data.totalMovies!}
              icon={Database}
            />
            <StatCard title="Reviews" value={data.totalReviews} icon={Star} />
            <StatCard
              title="Avg Rating"
              value={data.avgRating?.toFixed(2) ?? "0.0"}
              icon={Gauge}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest interactions</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentActivity.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No recent activity.
              </p>
            ) : (
              <div className="space-y-4">
                {data.recentActivity.map((activity) => (
                  <div key={activity.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.movieTitle && (
                            <span>{activity.movieTitle} • </span>
                          )}
                          {new Date(activity.time).toLocaleString()}
                        </p>
                        {activity.user && (
                          <p className="text-xs text-muted-foreground">
                            By: {activity.user}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Separator className="mt-2" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {data.role === "user" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Summary
              </CardTitle>
              <CardDescription>Your reviewer profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                <strong>Username:</strong> {data.username}
              </p>
              <p className="text-sm">
                <strong>Member Since:</strong>{" "}
                {new Date(data.memberSince!).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <strong>Favorite Genre:</strong> {data.favoriteGenre}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default Dashboard;
