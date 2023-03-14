import express from "express";
import * as FacebookDataController from "../controllers/facebookData/facebookData";

const router = express.Router();

router.post("/", FacebookDataController.createFacebookData);

export default router;
