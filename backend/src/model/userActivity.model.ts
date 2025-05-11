import mongoose, {
  Schema,
  Document,
  Model,
  HydratedDocument,
  QueryWithHelpers,
} from "mongoose";

interface AuditDocument {
  userId: mongoose.Types.ObjectId;
  movieId?: mongoose.Types.ObjectId;
  action: string;
  details?: string;
}

interface AuditModelInterface extends Model<AuditDocument> {
  findRecentActivity(): QueryWithHelpers<
    HydratedDocument<AuditDocument>[],
    HydratedDocument<AuditDocument>,
    {}
  >;
}

const auditSchema = new Schema<AuditDocument, AuditModelInterface>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: Schema.Types.ObjectId,
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

// Static method returning a Mongoose Query, not a Promise
auditSchema.statics.findRecentActivity = function () {
  return this.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("userId", "username email")
    .populate("movieId", "title");
};

export const UserActivityModel = mongoose.model<
  AuditDocument,
  AuditModelInterface
>("Audit", auditSchema);
