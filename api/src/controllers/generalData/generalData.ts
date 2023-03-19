import { RequestHandler } from "express";
import fs from "fs";
import createHttpError from "http-errors";
import path from "path";
import GeneralDataModel from "../../models/generalData";
import {
  CreateGeneralDataBody,
  UpdateGeneralDataBody,
  UpdateGeneralDataParams,
} from "./generalData.interface";

export const updateGeneralDataMessage: RequestHandler<
  UpdateGeneralDataParams,
  unknown,
  UpdateGeneralDataBody,
  unknown
> = async (req, res, next) => {
  const botStartMessage = req.body.bot_start_message;
  console.log(req.body);

  try {
    if (!botStartMessage) {
      throw createHttpError(400, "GeneralData must have a bot_start_message");
    }

    const generalData = await GeneralDataModel.find().limit(1).exec();

    if (!generalData) {
      throw createHttpError(404, "GeneralData not found");
    }

    generalData[0].bot_start_message = botStartMessage;

    const updatedGeneralData = await generalData[0].save();

    res.status(200).json({
      bot_start_message: updatedGeneralData.bot_start_message,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGeneralDataToken: RequestHandler<
  UpdateGeneralDataParams,
  unknown,
  UpdateGeneralDataBody,
  unknown
> = async (req, res, next) => {
  const botToken = req.body.bot_token;

  try {
    if (!botToken) {
      throw createHttpError(400, "GeneralData must have a bot_token");
    }

    const generalData = await GeneralDataModel.find().exec();

    if (!generalData) {
      throw createHttpError(404, "GeneralData not found");
    }

    generalData[0].bot_token = botToken;

    const updatedGeneralData = await generalData[0].save();

    res.status(200).json({
      bot_token: updatedGeneralData.bot_token,
    });
  } catch (error) {
    next(error);
  }
};

export const createGeneralData: RequestHandler<
  unknown,
  unknown,
  CreateGeneralDataBody,
  unknown
> = async (req, res, next) => {
  const botStartMessage = req.body.bot_start_message;
  const botToken = req.body.bot_token;

  try {
    const countsGeneralData = await GeneralDataModel.countDocuments().exec();

    if (countsGeneralData === 1) {
      throw createHttpError(400, "Create more 'GeneralData'");
    }

    if (!botStartMessage) {
      throw createHttpError(400, "GeneralData must have a bot_start_message");
    }

    if (!botToken) {
      throw createHttpError(400, "GeneralData must have a bot_token");
    }

    const newGeneralData = await GeneralDataModel.create({
      bot_start_message: botStartMessage,
      bot_token: botToken,
    });

    res.status(201).json(newGeneralData);
  } catch (error) {
    next(error);
  }
};

export const getGeneralData: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const generalData = await GeneralDataModel.findOne({}).exec();

    if (!generalData) {
      throw createHttpError(
        404,
        "Genral data has not been found, make request POST by next url: http://localhost:4444/api/general-data"
      );
    }

    res.status(200).json(generalData);
  } catch (error) {
    next(error);
  }
};

export const uploadImage: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.file);
    const generalData = await GeneralDataModel.findOne({}).exec();

    if (!generalData) {
      throw createHttpError(404, "Has not been found general data");
    }

    generalData.bot_avatar = `avatar/${req.file?.filename}`;
    await generalData.save();

    res.status(200).json(generalData.bot_avatar);
  } catch (error) {
    next(error);
  }
};

export const deleteImage: RequestHandler = async (req, res, next) => {
  const directory = "./src/public/avatar";
  try {
    fs.readdir(directory, (err, files) => {
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw createHttpError(400, "File has not been found");
        });
      }
    });
    console.log("Delete");
    const generalData = await GeneralDataModel.findOne({}).exec();

    if (!generalData) {
      throw createHttpError(404, "Has not been found general data");
    }

    generalData.bot_avatar = `uploads/${req.file?.filename}`;
    generalData.bot_avatar = "";
    await generalData.save();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
