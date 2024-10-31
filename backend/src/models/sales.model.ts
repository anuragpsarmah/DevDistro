import { model, Schema } from "mongoose";

interface monthlySalesArray {
  month: Number;
  sales: Number;
}

const monthlySalesSchema = new Schema(
  {
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const yearlySalesSchema = new Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    monthly_sales: {
      type: [monthlySalesSchema],
      validate: [
        (array: Array<monthlySalesArray>) => array.length === 12,
        "Must have 12 months of data",
      ],
    },
  },
  { _id: false }
);

const salesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    yearly_sales: [yearlySalesSchema],
    total_sales: {
      type: Number,
      default: 0,
    },
    active_projects: {
      type: Number,
      default: 0,
    },
    customer_rating: {
      type: Number,
      default: 0,
    },
    best_seller: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Sales = model("Sales", salesSchema);
