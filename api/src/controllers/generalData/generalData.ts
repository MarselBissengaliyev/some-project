import axios, { AxiosError } from "axios";
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

const API_TELEGRAM = "https://api.telegram.org/bot";

/**
 * Here we update a general data token in the database
 */
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

    await axios
      .get(`${API_TELEGRAM}${botToken}/getMe`)
      .then(async () => {
        generalData[0].bot_token = botToken;

        const updatedGeneralData = await generalData[0].save();

        res.status(200).json({
          bot_token: updatedGeneralData.bot_token,
        });
      })
      .catch((err: AxiosError) => {
        throw createHttpError(
          err.status || 404,
          "Bot has not been found or is not valid telegram token"
        );
      });
  } catch (error) {
    next(error);
  }
};

/**
 * Here we create a general data
 */
export const createGeneralData: RequestHandler<
  unknown,
  unknown,
  CreateGeneralDataBody,
  unknown
> = async (req, res, next) => {
  const botToken = req.body.bot_token;

  try {
    const countsGeneralData = await GeneralDataModel.countDocuments().exec();

    if (countsGeneralData === 1) {
      throw createHttpError(400, "Create more 'GeneralData'");
    }

    if (!botToken) {
      throw createHttpError(400, "GeneralData must have a bot_token");
    }

    const newGeneralData = await GeneralDataModel.create({
      bot_token: botToken,
    });

    res.status(201).json(newGeneralData);
  } catch (error) {
    next(error);
  }
};

/**
 * Here we get a general data
 */
export const getGeneralData: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const generalData = await GeneralDataModel.findOne({}).exec();

    if (!generalData) {
      throw createHttpError(404, "Genral data has not been found");
    }

    res.status(200).json(generalData);
  } catch (error) {
    next(error);
  }
};

/**
 * Here upload avatar to general data
 */
export const uploadAvatar: RequestHandler = async (req, res, next) => {
  const imagesDir = "./public/avatar";

  try {
    if (req.file) {
      fs.readdir(imagesDir, (err, files) => {
        if (err) throw createHttpError(400, err.message);

        for (const file of files) {
          if (file === req.file?.filename) {
            return;
          }
          fs.unlink(path.join(imagesDir, file), (err) => {
            if (err) throw createHttpError(400, err.message);
          });
        }
      });

      const generalData = await GeneralDataModel.findOne({}).exec();

      if (!generalData) {
        throw createHttpError(404, "General data has not been found");
      }

      generalData.bot_avatar = `avatar/${req.file?.filename}`;
      await generalData.save();

      res.status(200).json(`avatar/${req.file?.filename}`);
    } else {
      res.status(400).json(`Need to upload image`);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Here we delete avatar to general data
 */
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
