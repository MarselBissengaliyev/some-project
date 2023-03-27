import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatar");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const types = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

/**
 * Here we validate our avatar
 */
const avatarMiddleware = multer({
  limits: {
    fileSize: 512000,
  },
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (types.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export default avatarMiddleware;
