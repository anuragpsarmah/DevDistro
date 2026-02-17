import { model, Schema } from "mongoose";

const githubAppInstallationSchema = new Schema(
  {
    installation_id: {
      type: Number,
      required: [true, "Installation ID is required"],
      unique: true,
      index: true,
    },
    account_type: {
      type: String,
      enum: ["User"],
      default: "User",
    },
    account_login: {
      type: String,
      required: [true, "Account login is required"],
    },
    account_id: {
      type: Number,
      required: [true, "Account ID is required"],
    },
    repository_selection: {
      type: String,
      enum: ["all", "selected"],
      required: [true, "Repository selection is required"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    github_id: {
      type: String,
      required: [true, "GitHub ID is required"],
    },
    suspended_at: {
      type: Date,
      default: null,
    },
    cached_installation_token: {
      type: String,
    },
    token_expires_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

githubAppInstallationSchema.index({ user_id: 1 });
githubAppInstallationSchema.index({ github_id: 1 });

export const GitHubAppInstallation = model(
  "GitHubAppInstallation",
  githubAppInstallationSchema
);
