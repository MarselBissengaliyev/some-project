import { RequestHandler } from "express";
import {
  UpdateGeneralDataBody,
  UpdateGeneralDataParams,
} from "./generalData.interface";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import GeneralDataModel from "../../models/generalData";

export const updateGeneralData: RequestHandler<
  UpdateGeneralDataParams,
  unknown,
  UpdateGeneralDataBody,
  unknown
> = async (req, res, next) => {
  const generalDataId = req.params.general_data_id;
  const botStartMessage = req.body.bot_start_message;
  const botToken = req.body.bot_token;

  try {
    if (!mongoose.isValidObjectId(generalDataId)) {
      throw createHttpError(400, "Invalid note id");
    }

    if (!botStartMessage) {
      throw createHttpError(400, "GeneralData must have a bot_start_message");
    }

    if (!botToken) {
      throw createHttpError(400, "GeneralData must have a bot_token");
    }

    const generalData = await GeneralDataModel.findById(generalDataId).exec();

    if (!generalData) {
      throw createHttpError(404, "GeneralData not found");
    }

    generalData.bot_token = botToken;
    generalData.bot_start_message = botStartMessage;

    const updatedGeneralData = await generalData.save();

    res.status(200).json(updatedGeneralData);
  } catch (error) {
    next(error);
  }
};

export const createGeneralData: RequestHandler<
  UpdateGeneralDataParams,
  unknown,
  UpdateGeneralDataBody,
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
      bot_token: botToken
    });

    res.status(201).json(newGeneralData);
  } catch (error) {
    next(error);
  }
};
