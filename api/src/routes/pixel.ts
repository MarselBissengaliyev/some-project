import express from "express";
import * as PixelController from "../controllers/pixel/pixel";

const router = express.Router();

router.get("/:pixelId", PixelController.getPixel);

router.get('/', PixelController.getPixels);

router.post("/", PixelController.createPixel);

router.patch('/:pixelId', PixelController.updatePixel);

router.delete("/:pixelId", PixelController.deletePixel);

export default router;
