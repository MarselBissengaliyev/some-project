import express from "express";
import * as StartMessageController from "../controllers/startMessage/startMessage";

const router = express.Router();

router.get("/", StartMessageController.getStartMessage);

router.post("/", StartMessageController.createStartMessage);

router.patch("/", StartMessageController.updateStartMessage);

export default router;
