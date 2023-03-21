import { RequestHandler } from "express";
import createHttpError from "http-errors";
import StartMessageModel from "../../models/startMessage";
import {
  CreateStartMessageBody,
  UpdateStartMessageBody,
} from "./startMessage.interface";

export const createStartMessage: RequestHandler<
  unknown,
  unknown,
  CreateStartMessageBody,
  unknown
> = async (req, res, next) => {
  const message = req.body.message;
  const photo = req.body.photo;
  const disableWebPagePreview = req.body.disable_web_page_preview;

  try {
    if (!message) {
      throw createHttpError(400, "Start Message must have a message");
    }

    const startMessage = await StartMessageModel.create({
      message: message,
    });

    if (photo) {
      startMessage.photo = photo;
    }

    startMessage.disable_web_page_preview = disableWebPagePreview;

    await startMessage.save();

    res.status(201).json(startMessage);
  } catch (error) {
    next(error);
  }
};

export const getStartMessage: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const startMessage = await StartMessageModel.findOne({}).exec();

    if (!startMessage) {
      throw createHttpError(404, "Start message has not been found");
    }

    res.status(200).json(startMessage);
  } catch (error) {
    next(error);
  }
};

export const updateStartMessage: RequestHandler<
  unknown,
  unknown,
  UpdateStartMessageBody,
  unknown
> = async (req, res, next) => {
  const message = req.body.message;
  const photo = req.body.photo;
  const disableWebPagePreview = req.body.disable_web_page_preview;

  try {
    if (!message) {
      throw createHttpError(400, "Start Message must have a message");
    }

    const startMessage = await StartMessageModel.findOne({}).exec();

    if (!startMessage) {
      throw createHttpError(404, "Start message has not been found");
    }

    startMessage.message = message;

    if (photo) {
      startMessage.photo = photo;
    }

    startMessage.disable_web_page_preview = disableWebPagePreview;

    const updatedStartMessage = await startMessage.save();

    res.status(200).json(updatedStartMessage);
  } catch (error) {
    next(error);
  }
};
