import express from "express";
import * as PixelController from "../controllers/pixel/pixel";

const router = express.Router();

router.post("/", PixelController.createPixel);
router.delete("/:pixelId", PixelController.deletePixel);

export default router;
