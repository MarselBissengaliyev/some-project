import express from "express";
import * as PixelController from "../controllers/pixel/pixel";

const router = express.Router();

router.get("/", PixelController.getPixel);
router.post("/", PixelController.createPixel);
router.delete("/", PixelController.deletePixel);

export default router;
