import FacebookDataModel from "../models/facebookData";
import TelegramDataModel, { TelegramData } from "../models/telegramData";
import UserModel from "../models/user";

export const addUser = async (click_id: string, telegramData: TelegramData) => {
 const facebookData = await FacebookDataModel.findOne({
    click_id: click_id,
  }).exec(); 

  if (!facebookData) {
    const message = "Has not been found click_id in the database";
    console.log(message);
    return {
      message: message,
      status: "click_id_error",
    };
  }

  const existingTelegramData = await TelegramDataModel.findOne({
    telegram_id: telegramData.telegram_id,
  }).exec();

  if (existingTelegramData) {
    const message = "This user has already been added";
    console.log(message);
    return {
      message: message,
      status: "telegram_id_error",
    };
  }

  const newTelegramData = await TelegramDataModel.create({ ...telegramData });

  const userWithFacebookId = await UserModel.findOne({
    facebook_data_id: facebookData._id,
  });
  if (!userWithFacebookId) {
    const message = "User with this facebook_data_id has not been found";
    console.log(message);
    return {
      message: message,
      status: "facebook_data_id_error",
    };
  }
  userWithFacebookId.telegram_data_id = newTelegramData._id;
  userWithFacebookId.save();


  return userWithFacebookId;
};
