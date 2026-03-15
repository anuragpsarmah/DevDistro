import { model, Schema } from "mongoose";

const COOLDOWN_DAYS = 15;

const deletedUserSchema = new Schema({
  github_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  deleted_at: {
    type: Date,
    required: true,
    default: Date.now,
    index: { expireAfterSeconds: COOLDOWN_DAYS * 24 * 60 * 60 },
  },
});

export const DeletedUser = model("DeletedUser", deletedUserSchema);
