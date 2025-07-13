import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadOptions {
  folder?: string;
  resource_type?: 'image' | 'video' | 'raw';
  format?: string;
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number;
  height?: number;
  url: string;
  etag: string;
  version: number;
  signature: string;
  created_at: string;
  tags: string[];
  pages?: number;
  [key: string]: any;
}

export const uploadToCloudinary = async (buffer: Buffer, options: UploadOptions | string = {}): Promise<CloudinaryUploadResult> => {
  const config = typeof options === 'string' ? { folder: options } : options;
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: config.folder || 'portfolio',
        resource_type: config.resource_type || 'image',
        format: config.format,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload failed: No result returned'));
        resolve(result as CloudinaryUploadResult);
      }
    ).end(buffer);
  });
}; 