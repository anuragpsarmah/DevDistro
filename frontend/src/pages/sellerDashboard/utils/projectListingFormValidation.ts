import z from "zod";
import { PROJECT_TYPES } from "./constants";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_FILE_SIZE,
  MAX_VIDEO_FILE_SIZE,
  projectListingFormData,
} from "./types";

export const projectListingDataValidation = (
  data: projectListingFormData
): string => {
  const schema = z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .max(50, "Title must not exceed 50 characters"),
    description: z
      .string({
        required_error: "Description is required",
      })
      .max(1000, "Review description must be 1000 characters or less"),
    projectType: z.enum(PROJECT_TYPES, {
      errorMap: () => ({
        message: `Invalid project type was provided.`,
      }),
    }),
    techStack: z
      .array(z.string())
      .min(1, "At least one tech stack value required"),
    liveLink: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .pipe(z.string().url("Invalid live link URL format").optional()),
    price: z
      .number({
        required_error: "Price is required",
      })
      .min(0, "Price should be greater than or equal to 0."),
  });

  const result = schema.safeParse(data);

  if (!result.success) {
    return result.error.errors[0].message;
  }

  if (data.images.length < 1) return "At least one image is required";
  if (data.images.length > 5) return "At most five images are allowed";
  for (const file of data.images) {
    const nameArray = file.name.split(".");
    if (!ALLOWED_IMAGE_TYPES[file.type])
      return "Image file type is not supported";
    if (file.size > MAX_IMAGE_FILE_SIZE)
      return "Image file size should not exceed 2MB";
    if (
      !ALLOWED_IMAGE_TYPES[file.type].includes(
        nameArray[nameArray.length - 1].toLowerCase()
      )
    )
      return "Invalid file extension";
  }

  if (data.video) {
    const nameArray = data.video.name.split(".");
    if (!ALLOWED_VIDEO_TYPES[data.video.type])
      return "Video file type is not supported";
    if (data.video.size > MAX_VIDEO_FILE_SIZE)
      return "Video file size should not exceed 2MB";
    if (
      !ALLOWED_VIDEO_TYPES[data.video.type].includes(
        nameArray[nameArray.length - 1].toLowerCase()
      )
    )
      return "Invalid file extension";
  }

  return "";
};

export const projectListingPutSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(5, "Title is too short")
    .max(50, "Title must not exceed 50 characters"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(30, "Description is too short")
    .max(1000, "Description must not exceed 1000 characters"),
  project_type: z.enum(PROJECT_TYPES, {
    errorMap: () => ({
      message: `Invalid project type was provided.`,
    }),
  }),
  tech_stack: z
    .array(z.string())
    .min(1, "Your tech stack should have at least one value"),
  live_link: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .pipe(z.string().url("Invalid live link URL format").optional()),
  project_images: z
    .array(z.string().url("Invalid URL format"))
    .min(1, "At least one image URL required"),
  project_video: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .pipe(z.string().url("Invalid video URL format").optional()),
  price: z
    .number({
      required_error: "Price is required",
    })
    .min(0, "Price should be greater than or equal to 0."),
});
