import { RequestHandler } from "express";
import createHttpError from "http-errors";
import FacebookDataModel from "../../models/facebookData";
import UserModel from "../../models/user";
import { CreateFacebookDataBody } from "./facebookData.interface";
import TelegramDataModel from "../../models/telegramData";

/**
 * Here we create a fecbook_data document in the database
 */
export const createFacebookData: RequestHandler<
  unknown,
  unknown,
  CreateFacebookDataBody,
  unknown
> = async (req, res, next) => {
  const click_id = req.body.click_id;
  const ip = req.body.ip;
  const user_agent = req.body.user_agent;
  const pixel = req.body.pixel;
  const fb_click = req.body.fb_click;
  const domain = req.body.domain;
  const time_click = req.body.time_click;

  try {
    if (
      !click_id ||
      !ip ||
      !user_agent ||
      !pixel ||
      !fb_click ||
      !domain ||
      !time_click
    ) {
      throw createHttpError(400, "Parameters missing");
    }

    const telegramDataWithClickId = await TelegramDataModel.findOne({
      click_id: click_id,
    }).exec();

    const existingClickId = await FacebookDataModel.findOne({
      click_id: click_id,
    }).exec();

    if (existingClickId || telegramDataWithClickId) {
      throw createHttpError(409, "Click_id already taken.");
    }

    const newFacebookData = await FacebookDataModel.create({
      click_id,
      ip,
      user_agent,
      pixel,
      fb_click,
      domain,
      time_click,
    });

    await UserModel.create({
      facebook_data_id: newFacebookData._id,
    });

    res.status(201).json(newFacebookData);
  } catch (error) {
    next(error);
  }
};
