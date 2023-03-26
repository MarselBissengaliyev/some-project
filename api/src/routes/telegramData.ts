import express from "express";
import * as TelegramDataController from "../controllers/telegramData/telegramData";

const router = express.Router();

router.get("/", TelegramDataController.getTelegramData);
router.get('/depositors/:telegram_bot_login', TelegramDataController.getDepositedUsers);

export default router;
