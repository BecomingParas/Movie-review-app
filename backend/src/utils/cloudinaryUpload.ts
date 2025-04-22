import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import fs from "fs";
export const uploadFile = async (
  filePath: string,
  options: UploadApiOptions
): Promise<UploadApiResponse> => {
  try {
    return await cloudinary.uploader.upload(filePath, options);
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  } finally {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};
