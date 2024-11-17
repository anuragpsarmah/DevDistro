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

export interface UserType {
  _id: string;
  username: string;
  name: string;
  profileImageUrl: string;
}

export interface MonthlySales {
  month: Number;
  sales: Number;
}

export interface CityInfo {
  city: string;
  iso2: string;
}
