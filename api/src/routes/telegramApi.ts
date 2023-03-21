import express from "express";
import * as TelegramApiController from "../controllers/telegramApi/telegramApi";

const router = express.Router();

router.post("/send-mass", TelegramApiController.sendMassMessage);

export default router;
