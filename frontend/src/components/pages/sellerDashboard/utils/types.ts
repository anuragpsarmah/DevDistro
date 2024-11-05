import { PROJECT_TYPES } from "./constants";

export interface ChartDataObject {
  month: string;
  sales: number;
}

export interface CommonSalesInformation {
  active_projects: number;
  best_seller: string;
  customer_rating: number;
  total_sales: number;
}

export interface ProfileInformation {
  username: string;
  name: string;
  profileImageUrl: string;
  jobRole: string;
  location: string;
  reviewDescription: string;
  reviewStar: number;
  profileVisibility: boolean;
}

export interface ProfileUpdatePayload {
  job_role: string;
  location: string;
  review_description: string;
  review_stars: number;
  profile_visibility: boolean;
}

export interface PrivateRepoData {
  name: string;
  description: string;
  language: string;
  updated_at: string;
}

export type ProjectType = (typeof PROJECT_TYPES)[number];
