import { model, Schema } from "mongoose";
import { PROJECT_TYPE_ENUM } from "../types/constants";
import { User } from "./user.model";

const projectSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: [true, "UserId is required"],
    },
    price: {
      type: Number,
      required: [true, "Project price is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    project_type: {
      type: String,
      enum: PROJECT_TYPE_ENUM,
      required: [true, "Project type is required"],
    },
    tech_stack: {
      type: [String],
      required: [true, "An array with atleast one string is required"],
    },
    live_link: {
      type: String,
    },
    project_images: {
      type: [String],
      required: [true, "An array of atleast one url is required"],
    },
    project_video: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Project = model("Project", projectSchema);
