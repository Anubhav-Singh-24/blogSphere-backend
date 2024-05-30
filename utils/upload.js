import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from 'dotenv'
dotenv.config();

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpg", "image/webp", "image/jpeg"];

    if (match.indexOf(file.mimeType) === -1)
      return `${Date.now()}-blog-${file.originalname}`;

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
