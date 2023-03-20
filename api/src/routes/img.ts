import express from "express";
import * as ImgController from "../controllers/img/img";
import filleMiddleware from "../middlewares/file";

const router = express.Router();

router.post("/", filleMiddleware.single('photo'), ImgController.uploadImage);

export default router;
