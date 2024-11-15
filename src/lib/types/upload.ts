export interface UploadResponse {
  success: boolean;
  message: string;
  url?: string;
}

export interface UploadError {
  error: string;
  details?: string;
}
