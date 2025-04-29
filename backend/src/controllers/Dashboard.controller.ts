import { NextFunction, Request, Response } from "express";
import { UserModel } from "../model/user.model";
import { AuditModel } from "../model/userActivity.model";
import { ReviewModel } from "../model/review.model";

export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const recentActivities = await AuditModel.find({ userId })
      .sort({
        _id: -1,
      })
      .limit(5)
      .select("action details movieId")
      .populate("movieId", "title");
    const formattedActivities = recentActivities.map((activity) => ({
      id: activity._id,
      action: activity.action,
      details: activity.details,
      movieTitle: (activity.movieId as any)?.title || null,
    }));
    const totalReviews = await ReviewModel.countDocuments({ userId });
    const dashboardData = {
      username: user.username,
      email: user.email,
      memberSince: user.memberSince,
      favoriteGenre: user.favoriteGenre || "Not set",
      moviesWatched: user.stats?.moviesWatched,
      watchlistCount: user.stats?.watchList,
      reviewsWritten: totalReviews,
      hoursWatched: user.stats?.hoursWatched,
      recentActivity: formattedActivities,
    };
    res.status(200).json(dashboardData);
    return;
  } catch (error) {
    console.error("[Dashboard Error]", error);
    res.status(500).json({ message: "Server Error" });
    next(error);
    return;
  }
};
