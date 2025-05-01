import { Request, Response } from "express";
import { UserModel } from "../model/user.model";
import { ReviewModel } from "../model/review.model";
import { MovieModel } from "../model/movie.model";
import { AuditModel } from "../model/userActivity.model";

export async function getDashboard(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (role === "admin") {
      // Admin stats
      const totalUsers = await UserModel.countDocuments();
      const totalMovies = await MovieModel.countDocuments();
      const totalReviews = await ReviewModel.countDocuments();
      const avgRatingResult = await ReviewModel.aggregate([
        { $group: { _id: null, avg: { $avg: "$rating" } } },
      ]);
      const averageRating = avgRatingResult[0]?.avg || 0;
      const recentActivity = await AuditModel.find()
        .sort({ _id: -1 })
        .limit(5)
        .populate("movieId", "title")
        .populate("userId", "username");

      res.json({
        role: "admin",
        totalUsers,
        totalMovies,
        totalReviews,
        averageRating: +averageRating.toFixed(2),
        recentActivity: recentActivity.map((a) => ({
          id: a._id,
          user: (a.userId as any).username,
          action: a.action,
          movieTitle: (a.movieId as any)?.title,
          time: a.createdAt,
        })),
      });
      return;
    }

    // Regular user
    const user = await UserModel.findById(userId);
    const stats = user?.stats || {
      moviesWatched: 0,
      watchList: 0,
      reviews: 0,
      hoursWatched: 0,
    };
    const recentActivity = await AuditModel.find({ userId })
      .sort({ _id: -1 })
      .limit(5)
      .populate("movieId", "title");

    res.json({
      role: "user",
      username: user?.username,
      memberSince: user?.memberSince,
      favoriteGenre: user?.favoriteGenre,
      moviesWatched: stats.moviesWatched,
      watchlistCount: stats.watchList,
      totalReviews: stats.reviews,
      hoursWatched: stats.hoursWatched,
      recentActivity: recentActivity.map((a) => ({
        id: a._id,
        action: a.action,
        movieTitle: (a.movieId as any)?.title,
        time: a.createdAt,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
