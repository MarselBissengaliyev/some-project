import { RequestHandler } from "express";
import FacebookDataModel from "../../models/facebookData";
import TelegramDataModel from "../../models/telegramData";
import UserModel from "../../models/user";
import { GetTelegramDataParams, GetTelegramDataQuery } from "./telegramData.interface";

export const getTelegramData: RequestHandler<
  GetTelegramDataParams,
  unknown,
  unknown,
  GetTelegramDataQuery
> = async (req, res, next) => {
  const page = req.query.page || 1;

  try {
    const ITEMS_PER_PAGE = 10;

    const telegram_bot_login = req.params.telegram_bot_login;

    const allUsersCount = await TelegramDataModel.countDocuments({}).exec();

    const activeUsersCount = await TelegramDataModel.countDocuments({
      is_activ: true,
    }).exec();

    const depositedUsersCount = await TelegramDataModel.countDocuments({
      is_deposit: true,
    }).exec();

    // console.log(page);
    const desositedUsers = await TelegramDataModel.find({
      is_deposit: true,
      telegram_bot_login,
    })
      .limit(ITEMS_PER_PAGE)
      .skip((+page-1) * ITEMS_PER_PAGE)
      .exec();

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
        click_id: facebookData?.click_id || activeUser.click_id,
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
        time_click: facebookData?.time_click,
      });
    }

    res.status(200).json({
      allUsersCount,
      activeUsersCount,
      desositedUsers,
      activeUsersWithClickId,
      pagination: {
        count: depositedUsersCount,
        pageCount: depositedUsersCount / ITEMS_PER_PAGE
      }
    });
  } catch (error) {
    next(error);
  }
};
