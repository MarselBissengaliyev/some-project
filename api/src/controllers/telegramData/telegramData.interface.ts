import { TelegramData } from "../../models/telegramData";

export interface GetTelegramDataParams {
  telegram_bot_login: string;
}

export interface ActiveUsersWithClickIdInterface {
  _doc: TelegramData,
  click_id: string
}