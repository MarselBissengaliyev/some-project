import { RequestHandler } from "express";
import TelegramDataModel from "../../models/telegramData";
import { GetTelegramDataParams } from "./telegramData.interface";

export const getTelegramData: RequestHandler<
  GetTelegramDataParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const telegram_bot_login = req.params.telegram_bot_login;

    const allUsersCount = await TelegramDataModel.find({
      telegram_bot_login: telegram_bot_login,
    }).countDocuments().exec();

    const activeUsersCount = await TelegramDataModel.find({
      telegram_bot_login: telegram_bot_login,
      is_activ: true
    }).countDocuments().exec();

    res.status(200).json({
      allUsersCount,
      activeUsersCount,  
    });
  } catch (error) {
    next(error);
  }
};
