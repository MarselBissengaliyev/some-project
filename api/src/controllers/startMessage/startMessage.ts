import { RequestHandler } from "express";
import createHttpError from "http-errors";
import StartMessageModel from "../../models/startMessage";
import {
  CreateStartMessageBody,
  UpdateStartMessageBody,
} from "./startMessage.interface";
import fs from 'fs';
import path from "path";

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

export const deletePhotoMessage: RequestHandler = async (req, res, next) => {
  const imagesDir = './public/uploads';
  try {
    fs.readdir(imagesDir, (err, files) => {
      if (err) throw createHttpError(400, err.message)

      for (const file of files) {
        fs.unlink(path.join(imagesDir, file), err => {
          if (err) throw createHttpError(400, err.message);
        })
      }
    });

    const startMessage = await StartMessageModel.findOne({}).exec();

    if (!startMessage) {
      throw createHttpError(404, 'Has not been found start message');
    }

    startMessage.photo = '';

    await startMessage.save();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
