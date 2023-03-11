import { RequestHandler } from "express";
import createHttpError from "http-errors";
import FacebookDataModel from "../models/facebookData";
import UserModel from "../models/user";

interface CreateFacebookDataBody {
  click_id?: string;
  ip?: string;
  user_agent?: string;
  pixel?: string;
  fb_click?: string;
  domain?: string;
  time_click?: string;
}

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

  console.log('click_id=', click_id);
  console.log('ip=', ip);
  console.log('user_agent=', user_agent);
  console.log('pixel=', pixel);

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

    const newFacebookData = await FacebookDataModel.create({
      click_id,
      ip,
      user_agent,
      pixel,
      fb_click,
      domain,
      time_click,
    })

    await UserModel.create({
      facebook_data_id: newFacebookData._id,
    });

    res.status(201).json(newFacebookData);
  } catch (error) {
    next(error);
  }
};
