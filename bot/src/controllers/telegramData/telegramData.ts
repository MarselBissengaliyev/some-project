import FacebookDataModel from "../../models/facebookData";
import TelegramDataModel, { TelegramData } from "../../models/telegramData";
import UserModel from "../../models/user";

/**
 * The Logic, which will be executed when user clicks on the button "Start" in telegram bot
 */
export const createTelegramData = async (
  click_id: string,
  telegramData: TelegramData
) => {
  const facebookData = await FacebookDataModel.findOne({
    click_id: click_id,
  }).exec();

  const existingTelegramData = await TelegramDataModel.findOne({
    telegram_id: telegramData.telegram_id,
  }).exec();

  if (existingTelegramData) {
    return;
  }

  const newTelegramData = await TelegramDataModel.create({ ...telegramData });

  if (facebookData) {
    const userWithFacebookId = await UserModel.findOne({
      facebook_data_id: facebookData._id,
    }).exec();

    if (!userWithFacebookId) {
      return;
    }

    userWithFacebookId.telegram_data_id = newTelegramData._id;
    await userWithFacebookId.save();

    return {
      facebookData,
    };
  }

  return;
};
