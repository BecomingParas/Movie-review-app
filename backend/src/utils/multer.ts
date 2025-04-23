import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/temp");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

export const movieUpload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
    files: 2,
  },
}).fields([
  { name: "poster_url", maxCount: 1 },
  { name: "video_url", maxCount: 1 },
]);
