import { ChartDataObject, CommonSalesInformation } from "./types";

export const INITIAL_CHART_DATA: ChartDataObject[] = [
  { month: "January", sales: 0 },
  { month: "February", sales: 0 },
  { month: "March", sales: 0 },
  { month: "April", sales: 0 },
  { month: "May", sales: 0 },
  { month: "June", sales: 0 },
  { month: "July", sales: 0 },
  { month: "August", sales: 0 },
  { month: "September", sales: 0 },
  { month: "October", sales: 0 },
  { month: "November", sales: 0 },
  { month: "December", sales: 0 },
];

export const INITIAL_SALES_INFO: CommonSalesInformation = {
  active_projects: 0,
  best_seller: "",
  customer_rating: 0,
  total_sales: 0,
};

export const JOB_ROLES = [
  "Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Mobile Developer",
  "DevOps Engineer",
  "Data Scientist",
  "UI/UX Designer",
  "Product Manager",
  "QA Engineer",
  "Full Stack Developer",
  "Student",
  "Other",
] as const;

export const MAX_REVIEW_LENGTH = 200;
export const CITY_SEARCH_DELAY = 500;
