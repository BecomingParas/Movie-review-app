import { Request, Response } from "express";
import { UserModel } from "../model/user.model";
import { ReviewModel } from "../model/review.model";
import { MovieModel } from "../model/movie.model";
import { UserActivityModel } from "../model/userActivity.model";
import mongoose from "mongoose";

// Type Definitions
interface PopulatedUser {
  _id: mongoose.Types.ObjectId;
  username: string;
}

interface PopulatedMovie {
  _id: mongoose.Types.ObjectId;
  title: string;
}

type LeanAuditDocument = {
  _id: mongoose.Types.ObjectId;
  userId?: PopulatedUser;
  movieId?: PopulatedMovie;
  action: string;
  createdAt: Date;
  updatedAt: Date;
};

// Type Guards
function isPopulatedUser(user: any): user is PopulatedUser {
  return user && user.username && user._id instanceof mongoose.Types.ObjectId;
}

function isPopulatedMovie(movie: any): movie is PopulatedMovie {
  return movie && movie.title && movie._id instanceof mongoose.Types.ObjectId;
}

export async function getDashboard(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (role === "admin") {
      const [totalUsers, totalMovies, totalReviews, avgRatingResult] =
        await Promise.all([
          UserModel.countDocuments(),
          MovieModel.countDocuments(),
          ReviewModel.countDocuments(),
          ReviewModel.aggregate([
            { $group: { _id: null, avg: { $avg: "$rating" } } },
          ]),
        ]);

      const averageRating = avgRatingResult[0]?.avg || 0;

      const recentActivity = await UserActivityModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate<{ userId: PopulatedUser }>("userId", "username")
        .populate<{ movieId: PopulatedMovie }>("movieId", "title")
        .lean<LeanAuditDocument[]>()
        .exec();

      res.json({
        role: "admin",
        name: "Admin",
        avgRating: +averageRating.toFixed(2),
        totalReviews,
        moviesWatched: totalMovies,
        watchlistCount: 0,
        hoursWatched: 0,
        favoriteGenre: "All",
        memberSince: "N/A",
        recentActivity: recentActivity.map((a) => ({
          id: a._id,
          action: `${
            isPopulatedUser(a.userId) ? a.userId.username : "Unknown"
          } ${a.action}`,
          movieTitle: isPopulatedMovie(a.movieId) ? a.movieId.title : "Unknown",
          time: a.createdAt,
        })),
      });
      return;
    }

    // User-specific dashboard
    const [user, userReviews] = await Promise.all([
      UserModel.findById(userId),
      ReviewModel.find({ userId }),
    ]);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const stats = user.stats || {
      moviesWatched: 0,
      watchList: 0,
      reviews: 0,
      hoursWatched: 0,
    };

    const userAvgRating =
      userReviews.length > 0
        ? userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length
        : 0;

    const recentActivity = await UserActivityModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate<{ movieId: PopulatedMovie }>("movieId", "title")
      .lean<LeanAuditDocument[]>()
      .exec();

    res.json({
      role: "user",
      name: user.username,
      memberSince: user.memberSince,
      favoriteGenre: user.favoriteGenre || "Not specified",
      avgRating: +userAvgRating.toFixed(2),
      totalReviews: stats.reviews,
      moviesWatched: stats.moviesWatched,
      watchlistCount: stats.watchList,
      hoursWatched: stats.hoursWatched,
      recentActivity: recentActivity.map((a) => ({
        id: a._id,
        action: a.action,
        movieTitle: isPopulatedMovie(a.movieId) ? a.movieId.title : "Unknown",
        time: a.createdAt,
      })),
    });
    return;
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Server error" });
    return;
  }
}
