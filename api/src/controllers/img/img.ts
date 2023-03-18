import { RequestHandler } from "express";
import GeneralDataModel from "../../models/generalData";
import createHttpError from "http-errors";
import fs from 'fs';
import path from "path";


export const uploadImage: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.file);
    const generalData = await GeneralDataModel.findOne({}).exec();

    if (!generalData) {
      throw createHttpError(404, 'Has not been found general data');
    }

    generalData.bot_avatar = `uploads/${req.file?.filename}`;
    await generalData.save();

    res.status(200).json(generalData.bot_avatar);
  } catch (error) {
    next(error);
  }
};

export const deleteImage: RequestHandler = async (req, res, next) => {
  const directory = './src/public/uploads';
  try {
    fs.readdir(directory, (err, files) => {
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw createHttpError(400, 'File has not been found')
        })
      }
    });
    console.log('Delete');
    const generalData = await GeneralDataModel.findOne({}).exec();

    if (!generalData) {
      throw createHttpError(404, 'Has not been found general data');
    }

    generalData.bot_avatar = `uploads/${req.file?.filename}`;
    generalData.bot_avatar = '';
    await generalData.save();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
