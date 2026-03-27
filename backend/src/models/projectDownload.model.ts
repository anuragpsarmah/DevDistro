import { model, Schema } from "mongoose";

const projectDownloadSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project ID is required"],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller ID is required"],
      index: true,
    },
  },
  { timestamps: true }
);

projectDownloadSchema.index({ projectId: 1, userId: 1 }, { unique: true });
projectDownloadSchema.index({ projectId: 1, createdAt: -1 });

export const ProjectDownload = model("ProjectDownload", projectDownloadSchema);
