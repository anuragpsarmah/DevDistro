import { z } from "zod";

export const githubCodeSchema = z.object({
  code: z
    .string()
    .min(1, "Authorization code is required")
    .max(100, "Invalid authorization code length"),
  state: z
    .string()
    .length(48, "Invalid OAuth state")
    .regex(/^[a-f0-9]+$/, "Invalid OAuth state"),
});
