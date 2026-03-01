export interface User {
  _id: string;
  username: string;
  name: string;
  profile_image_url: string;
}
export interface ProfileUpdateData {
  website_url: string;
  x_username: string;
  short_bio: string;
  job_role: string;
  location: string;
  review_description: string;
  review_stars: number;
  profile_visibility: boolean;
  auto_repackage_on_push: boolean;
}

export interface walletAddressData {
  wallet_address: string;
}

export interface WalletUpdatePayload {
  address: string;
  signature?: string;
  message?: string;
}

export interface ProjectMediaMetadata {
  originalName: string;
  fileType: string;
  fileSize: number;
}

export interface projectListingValidatedFormData {
  title: string;
  description: string;
  project_type: string;
  tech_stack: string[];
  live_link: string;
  price: number;
  imageOrder: string[];
  imageOrder_detail: string[];
  project_video: string;
  existingVideo?: string;
}

export interface MarketplaceSearchParams {
  searchTerm?: string;
  projectTypes?: string[];
  techStack?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  limit?: number;
}

export interface MarketplaceProject {
  _id: string;
  title: string;
  description: string;
  project_type: string;
  tech_stack: string[];
  price: number;
  avgRating: number;
  totalReviews: number;
  live_link?: string;
  createdAt: string;
  project_images: string;
  userid: {
    username: string;
    name: string;
    profile_image_url: string;
  };
}

export interface TreeNode {
  name: string;
  type: "directory" | "file";
  children?: TreeNode[];
}

export interface ProjectDetail {
  _id: string;
  title: string;
  description: string;
  project_type: string;
  tech_stack: string[];
  price: number;
  avgRating: number;
  totalReviews: number;
  live_link?: string;
  createdAt: string;
  project_images: string[];
  project_images_detail?: string[];
  project_video?: string;
  repo_tree?: TreeNode;
  repo_tree_status?: string;
  userid: {
    username: string;
    name: string;
    profile_image_url: string;
    short_bio?: string;
    job_role?: string;
    location?: string;
    website_url?: string;
    x_username?: string;
  };
}

export interface MarketplaceSearchResponse {
  data: {
    projects: MarketplaceProject[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCount: number;
      limit: number;
      offset: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}
