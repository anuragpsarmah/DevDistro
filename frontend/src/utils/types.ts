export interface User {
  _id: string;
  username: string;
  name: string;
  profileImageUrl: string;
}

export interface ProfileUpdateData {
  job_role: string;
  location: string;
  review_description: string;
  review_stars: number;
  profile_visibility: boolean;
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
  project_images: string[];
  project_video: string;
}

export interface UseProjectSubmissionProps {
  handleGetPreSignedUrls: (
    metadata: Array<ProjectMediaMetadata>,
    existingImageCount: number,
    existingVideoCount: number,
    modificationType: string
  ) => Promise<unknown>;
  handleValidateUploadAndStoreProject: (
    data: projectListingValidatedFormData,
    modificationType: string
  ) => unknown;
  modificationType: string;
  setActiveTab?: (curr: string) => void;
  handleReturnToAllListings?: () => void;
}
