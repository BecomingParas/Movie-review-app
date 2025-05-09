import mongoose from "mongoose";

interface AuditDocument {
  userId: mongoose.Types.ObjectId;
  movieId?: mongoose.Types.ObjectId;
  action: string;
  details?: string;
}

interface AuditModelInterface extends mongoose.Model<AuditDocument> {
  findRecentActivity(): Promise<mongoose.HydratedDocument<AuditDocument>[]>;
}

const auditSchema = new mongoose.Schema<AuditDocument, AuditModelInterface>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    action: {
      type: String,
      required: true,
    },
    details: String,
  },
  { timestamps: true }
);

auditSchema.statics.findRecentActivity = function () {
  return this.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("userId", "username")
    .populate("movieId", "title");
};

export const UserActivityModel = mongoose.model<
  AuditDocument,
  AuditModelInterface
>("Audit", auditSchema);
