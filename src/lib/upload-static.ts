export interface UploadResponse {
    success: boolean;
    message: string;
    url?: string;
  }
  
  export const uploadFile = async (file: File): Promise<UploadResponse> => {
    if (process.env.GITHUB_PAGES === 'true') {
      console.warn('File upload not available in static build');
      return {
        success: false,
        message: 'File upload is not available in the static version. Please use the full version for this feature.'
      };
    }
  
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const data = await response.json();
      return {
        success: true,
        message: 'File uploaded successfully',
        url: data.url
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  };