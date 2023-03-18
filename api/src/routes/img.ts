import express from "express";
import * as ImgController from "../controllers/img/img";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  limits: {
    fileSize: 512000,
  },
  storage: storage,
});

const router = express.Router();

router.post("/", upload.single('avatar'), ImgController.uploadImage);
router.delete('/', ImgController.deleteImage);

export default router;
