export interface FileMetaData {
  originalName: string;
  fileType: string;
  fileSize: number;
}

export interface UploadMetadata {
  timestamp: number;
  expectedType: string;
  expectedSize: number;
}

export type UserType = {
  _id: string;
  username: string;
  name: string;
  profileImageUrl: string;
};
