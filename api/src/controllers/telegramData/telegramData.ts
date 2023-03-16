import { RequestHandler } from "express";
import createHttpError from "http-errors";
import TelegramData from "../../models/telegramData";
import { UpdateUmnicoLeadIdDataBody } from "./telegramData.interface";

/**
 * Here we update the umnico_lead_id in the document that belongs to the telegram_data_items collection
 */
export const updateUmnicoLeadId: RequestHandler<
  unknown,
  unknown,
  UpdateUmnicoLeadIdDataBody,
  unknown
> = async (req, res, next) => {
  try {
    if (req.body?.type != "message.incoming") {
      return;
    }
    const socialId: string = req.body.message.sender.socialId;

    const leadId = req.body.leadId;
    const telegramId = socialId.replace("user_", "");
    if (!leadId || !telegramId) {
      console.log("Params does not exist");
      throw createHttpError(404, "Params does not exist");
    }

    const telegramData = await TelegramData.findOne({
      telegram_id: telegramId,
    }).exec();
    if (!telegramData) {
      console.log("User has not been found in database");
      throw createHttpError(404, "User has not been found in database");
    }

    telegramData.umnico_lead_id = +leadId;
    await telegramData.save();

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
