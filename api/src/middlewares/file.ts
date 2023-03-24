import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

/**
 * Here we validate our image
 */
const filleMiddleware = multer({
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

export default filleMiddleware;
