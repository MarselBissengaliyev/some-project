import axios from "axios";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import GeneralDataModel from "../../models/generalData";
import TelegramDataModel, { TelegramData } from "../../models/telegramData";
import env from "../../utils/validateEnv";
import { SendMassMessageBody } from "./telegramApi.interface";

/**
 * Here we send message to a user
 */
export const sendMessage = async (
  chatId: number,
  text: string,
  disableWebPagePreview: boolean
) => {
  const generalData = await GeneralDataModel.findOne({}).exec();

  if (!generalData) {
    return "General data has not been found";
  }

  const { data, status } = await axios.post(
    `${env.API_TELEGRAM}${generalData.bot_token}/sendMessage`,
    {
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
      disable_web_page_preview: disableWebPagePreview,
      disable_notification: true,
      reply_to_message_id: null,
    }
  );

  return data;
};

/**
 * Here we send photo message to a user
 */
export const sendPhoto = async (
  chatId: number,
  photo: string,
  caption: string
) => {
  if (!caption) {
    caption = "";
  }

  const generalData = await GeneralDataModel.findOne({}).exec();

  if (!generalData) {
    return "General data has not been found";
  }

  const { data, status } = await axios.post(
    `${env.API_TELEGRAM}${generalData.bot_token}/sendPhoto`,
    {
      chat_id: chatId,
      photo,
      caption,
      disable_notification: false,
      reply_to_message_id: null,
    }
  );

  console.log("send photo status=", status);

  return data;
};

/**
 * Here we send mass message to active users
 */
export const sendMassMessage: RequestHandler<
  unknown,
  unknown,
  SendMassMessageBody,
  unknown
> = async (req, res, next) => {
  const telegramBotLogin = req.body.telegramBotLogin;
  const photo = req.body.photo;
  const value = req.body.value;
  const disableWebPagePreview = req.body.disableWebPagePreview ?? true;

  const activeUsersId = await TelegramDataModel.find(
    {
      is_active: true,
      telegram_bot_login: telegramBotLogin,
    },
    {
      telegram_id: 1,
    }
  ).exec();

  try {
    if (!activeUsersId) {
      throw createHttpError(400, "The activeUsersId is important");
    }

    if (!photo && !value) {
      throw createHttpError(400, "Photo or value is required");
    }

    for (let i = 0, sec = 0; i < activeUsersId.length; i += 20, sec++) {
      const group = activeUsersId.slice(i, i + 20); // get the next 20 users from the array
      // send a message to each user in the group with a 1-second interval between each message
      setTimeout(() => {
        group.forEach(async (user: TelegramData) => {
          const chatId = user.telegram_id;
          console.log(chatId);

          if (!photo && value) {
            await sendMessage(chatId, value, disableWebPagePreview);
          }

          if (photo) {
            await sendPhoto(chatId, photo, value);
          }

          console.log(`Sending message to ${user.telegram_id}`);
        });
      }, 1000 * sec);
    }

    res.status(200).json({
      message: `The message will be sent to ${activeUsersId.length} users...`,
    });
  } catch (error) {
    next(error);
  }
};
