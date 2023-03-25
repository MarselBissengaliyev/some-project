import axios from "axios";
import { RequestHandler } from "express-serve-static-core";
import createHttpError from "http-errors";
import FacebookDataModel from "../../models/facebookData";
import {
  default as TelegramData,
  default as TelegramDataModel,
} from "../../models/telegramData";
import { default as User, default as UserModel } from "../../models/user";
import env from "../../utils/validateEnv";
import { StatusInterface, UmnikoWebhookDataBody } from "./umnico.interface";

/**
 * https://api.umnico.com/docs/ru/apiMethods/events.html#id1
 */
export const messageIncoming: RequestHandler<
  unknown,
  unknown,
  UmnikoWebhookDataBody,
  unknown
> = async (req, res, next) => {
  try {
    console.log("message.incoming");
    const socialId: string = req.body.message.sender.socialId;

    const leadId = req.body.leadId;
    const telegramId = socialId.replace("user_", "");
    if (!leadId || !telegramId) {
      console.log("Params does not exist");
      throw createHttpError(422, "Params does not exist");
    }

    const telegramData = await TelegramData.findOne({
      telegram_id: telegramId,
    }).exec();

    if (!telegramData) {
      console.log("User has not been found in database");
      throw createHttpError(
        404,
        "Telegram data has not been found in database"
      );
    }

    telegramData.umnico_lead_id = +leadId;

    const user = await UserModel.findOne({
      telegram_data_id: telegramData._id,
    }).exec();

    if (!user) {
      throw createHttpError(404, "User has not been found in database");
    }

    const facebookData = await FacebookDataModel.findById(
      user.facebook_data_id
    ).exec();

    if (!facebookData) {
      throw createHttpError(404, "Facebook data has not been found");
    }

    await telegramData.save();

    const clickid = facebookData.click_id || telegramData.click_id;

    await axios.post(
      `https://traffer.online/click.php?event5=1&clickid=${clickid}`
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

/**
 * https://api.umnico.com/docs/ru/apiMethods/events.html#id5
 */
export const leadChangedStatus: RequestHandler<
  unknown,
  unknown,
  UmnikoWebhookDataBody,
  unknown
> = async (req, res, next) => {
  try {
    const statusesResponse = await axios.get(
      "https://api.umnico.com/v1.3/statuses",
      {
        headers: { Authorization: env.UMNICO_API_TOKEN },
      }
    );

    const statuses: StatusInterface[] = statusesResponse.data;

    const leadStatus = statuses.filter(
      (status) => status.id === req.body.lead?.statusId
    )[0];

    if (!leadStatus) {
      throw createHttpError(422, "Lead has a non-existent status");
    }

    console.log(leadStatus.name);

    if (leadStatus.name !== "Оплатили") {
      return;
    }

    const telegramData = await TelegramDataModel.findOne({
      umnico_lead_id: req.body.leadId,
    }).exec();

    if (!telegramData) {
      throw createHttpError(
        404,
        "Telegram data with this umnico_lead_id has not been found"
      );
    }

    telegramData.is_deposit = true;
    telegramData.time_sale = new Date().getTime();
    telegramData.amount = req.body.lead?.amount ? req.body.lead.amount : 0;

    await telegramData.save();

    const user = await User.findOne({
      telegram_data_id: telegramData._id,
    });

    if (user) {
      const facebookData = await FacebookDataModel.findById(
        user.facebook_data_id
      ).exec();

      if (!facebookData) {
        throw createHttpError(404, "Has not been found facebook data");
      }

      const cnv_id = facebookData.click_id || telegramData.click_id;
      const payout = telegramData.amount;
      const cnv_status = "approved";

      if (cnv_id) {
        await axios
          .post(`https://traffer.online/click.php?event6=1&clickid=${cnv_id}`)
          .then(async () => {
            await axios.post(
              `https://traffer.online/click.php?cnv_status=${cnv_status}&payout=${payout}&cnv_id=${cnv_id}`
            );
          });
      }
      // Send a POST request to the tracker with the inserted data, like
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

/**
 * https://api.umnico.com/docs/ru/apiMethods/events.html#id4
 */
export const leadChanged: RequestHandler<
  unknown,
  unknown,
  UmnikoWebhookDataBody,
  unknown
> = async (req, res, next) => {
  try {
    const statusesResponse = await axios.get(
      "https://api.umnico.com/v1.3/statuses",
      {
        headers: { Authorization: env.UMNICO_API_TOKEN },
      }
    );

    const statuses: StatusInterface[] = statusesResponse.data;

    const leadStatus = statuses.filter(
      (status) => status.id === req.body.lead?.statusId
    )[0];

    if (!leadStatus) {
      throw createHttpError(422, "Lead has a non-existent status");
    }

    console.log(leadStatus.name);

    if (leadStatus.name !== "Оплатили") {
      return;
    }

    const telegramData = await TelegramDataModel.findOne({
      umnico_lead_id: req.body.leadId,
    }).exec();

    if (!telegramData) {
      throw createHttpError(
        404,
        "Telegram data with this umnico_lead_id has not been found"
      );
    }

    telegramData.amount = req.body.lead?.amount
      ? req.body.lead.amount
      : telegramData.amount;

    await telegramData.save();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
