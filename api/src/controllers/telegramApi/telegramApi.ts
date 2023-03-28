import axios from "axios";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { emitIo } from "../../io";
import GeneralDataModel from "../../models/generalData";
import TelegramDataModel, { TelegramData } from "../../models/telegramData";
import env from "../../utils/validateEnv";
import { SendMassMessageBody } from "./telegramApi.interface";

/**
 * Here we send message to a user
 */
export const sendMessage = async (
  chatId: string,
  text: string,
  disableWebPagePreview: boolean
) => {
  const generalData = await GeneralDataModel.findOne({}).exec();

  if (!generalData) {
    throw createHttpError(404, "General data has not been found");
  }

  const res = await axios.post(
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

  return res;
};

/**
 * Here we send photo message to a user
 */
export const sendPhoto = async (
  chatId: string,
  photo: string,
  caption: string
) => {
  if (!caption) {
    caption = "";
  }

  const generalData = await GeneralDataModel.findOne({}).exec();

  if (!generalData) {
    console.log("General data has not been found");
    throw createHttpError(404, "General data has not been found");
  }

  const { data, status } = await axios.post(
    `${env.API_TELEGRAM}${generalData.bot_token}/sendPhoto`,
    {
      chat_id: chatId,
      photo: `${env.API_URL}${photo}`,
      caption,
      disable_notification: false,
      reply_to_message_id: null,
      parse_mode: "Markdown",
    }
  );

  console.log("send photo status=", status);

  return data;
};

/**
 * Here we send animation message to a user
 */
export const sendAnimation = async (
  chatId: string,
  animation: string,
  caption: string
) => {
  if (!caption) {
    caption = "";
  }

  const generalData = await GeneralDataModel.findOne({}).exec();

  if (!generalData) {
    console.log("General data has not been found");
    throw createHttpError(404, "General data has not been found");
  }

  const { data, status } = await axios.post(
    `${env.API_TELEGRAM}${generalData.bot_token}/sendAnimation`,
    {
      chat_id: chatId,
      photo: `${env.API_URL}${animation}`,
      caption,
      disable_notification: false,
      reply_to_message_id: null,
      parse_mode: "Markdown",
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
    let count = 0;
    let errors = 0;

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
            await sendMessage(chatId, value, disableWebPagePreview)
              .then(() => {
                count++;
                emitIo({
                  event: "message-sent",
                  message: `Has been sent message to ${count} users `,
                });
              })
              .catch(async (err) => {
                if (err.response && !err.response.data.ok) {
                  errors++;
                  emitIo({
                    event: "message-sent-error",
                    message: `Couldn't sent message to ${errors} users`,
                  });
                  if (
                    err.response.data.error_code === 403
                  ) {
                    const telegramData = await TelegramDataModel.findOne({
                      telegram_id: user.telegram_id,
                    }).exec();
                    if (!telegramData) {
                      return;
                    }
                    telegramData.is_active = false;

                    await telegramData.save();

                    console.log(
                      err.response.data.error_code,
                      err.response.data.description
                    );
                  }
                }
              });
          }
          if (photo) {
            const re = /(?:\.([^.]+))?$/;
            const extension = photo && re.exec(photo);

            if ((extension && extension[1]) === "gif") {
              return await sendAnimation(chatId, photo, value)
                .then(() => {
                  count++;
                  emitIo({
                    event: "message-sent",
                    message: `Has been sent message with animation to ${count} users `,
                  });
                })
                .catch(async (err) => {
                  if (err.response && !err.response.data.ok) {
                    console.log(err.response);
                    errors++;
                    emitIo({
                      event: "message-sent-error",
                      message: `Couldn't sent message to ${errors} users`,
                    });
                    if (
                      err.response.data.error_code === 403
                    ) {
                      if (!user.telegram_id) {
                        return;
                      }
                      const telegramData = await TelegramDataModel.findOne({
                        telegram_id: user.telegram_id,
                      }).exec();
                      if (!telegramData) {
                        return;
                      }
                      telegramData.is_active = false;

                      await telegramData.save();

                      console.log(
                        err.response.data.error_code,
                        err.response.data.description
                      );
                    }
                  }
                });
            }

            await sendPhoto(chatId, photo, value)
              .then(() => {
                count++;
                emitIo({
                  event: "message-sent",
                  message: `Has been sent message with photo to ${count} users `,
                });
              })
              .catch(async (err) => {
                console.log(err);
                if (err.response && !err.response.data.ok) {
                  errors++;
                  emitIo({
                    event: "message-sent-error",
                    message: `Couldn't sent message to ${errors} users`,
                  });
                  if (
                    err.response.data.error_code === 403
                  ) {
                    const telegramData = await TelegramDataModel.findOne({
                      telegram_id: user.telegram_id,
                    }).exec();
                    if (!telegramData) {
                      return;
                    }
                    telegramData.is_active = false;

                    await telegramData.save();

                    console.log(
                      err.response.data.error_code,
                      err.response.data.description
                    );
                  }
                }
              });
          }

          console.log(`Sending message to ${user.telegram_id}`);
        });
      }, 1000 * sec);
    }
    res.status(200).json({
      message: `Сообщение отправляеться`,
    });
  } catch (error) {
    next(error);
  }
};
