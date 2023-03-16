import express from "express";
import * as TelegramDataController from "../controllers/telegramData/telegramData";

const router = express.Router();

router.get("/:telegram_bot_login", TelegramDataController.getTelegramData);

export default router;
