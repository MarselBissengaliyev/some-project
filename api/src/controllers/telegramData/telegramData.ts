import { RequestHandler } from "express";
import TelegramDataModel from "../../models/telegramData";
import { GetTelegramDataParams } from "./telegramData.interface";
import FacebookDataModel from "../../models/facebookData";
import UserModel from "../../models/user";
import { ActiveUsersWithClickIdInterface } from "./telegramData.interface";

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
    })
      .countDocuments()
      .exec();

    const activeUsersCount = await TelegramDataModel.find({
      telegram_bot_login: telegram_bot_login,
      is_activ: true,
    })
      .countDocuments()
      .exec();

    const activeUsersId = await TelegramDataModel.find(
      {
        telegram_bot_login: telegram_bot_login,
        is_activ: true,
      },
      {
        telegram_id: 1,
      }
    ).exec();

    const desositedUsers = await TelegramDataModel.find({
      is_deposit: true,
    }).exec();

    const activeUsersWithClickId = [];

    for (const activeUser of desositedUsers) {
      const user = await UserModel.findOne({
        telegram_data_id: activeUser._id,
      }).exec();

      const facebookData = await FacebookDataModel.findById(
        user?.facebook_data_id,
        {
          click_id: 1,
        }
      ).exec();

      activeUsersWithClickId.push({
        click_id: facebookData ? facebookData.click_id : '',
        telegram_id: activeUser.telegram_id,
        first_name_telegram: activeUser.first_name_telegram,
        login_telegram: activeUser.login_telegram,
        is_activ: activeUser.is_activ,
        telegram_bot_login: activeUser.telegram_bot_login,
        is_deposit: activeUser.is_deposit,
        time_lead: activeUser.time_lead,
        umnico_lead_id: activeUser.umnico_lead_id,
        amount: activeUser.amount,
        time_sale: activeUser.time_sale,
      });
    }

    res.status(200).json({
      allUsersCount,
      activeUsersCount,
      activeUsersId,
      desositedUsers,
      activeUsersWithClickId,
    });
  } catch (error) {
    next(error);
  }
};
