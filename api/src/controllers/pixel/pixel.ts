import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import PixelModel from "../../models/pixel";
import { CreatePixelBody, DeletePixelParams } from "./pixel.interface";

/**
 * Here we create a pixel document in the database
 */
export const createPixel: RequestHandler<
  unknown,
  unknown,
  CreatePixelBody,
  unknown
> = async (req, res, next) => {
  const fb_pixel_id = req.body.fb_pixel_id;
  const token = req.body.token;

  try {
    if (!fb_pixel_id || !token) {
      throw createHttpError(400, "Pixel must have a fb_pixel_id and token");
    }

    const newPixel = await PixelModel.create({
      fb_pixel_id: fb_pixel_id,
      token: token,
    });

    res.status(201).json(newPixel);
  } catch (error) {
    next(error);
  }
};

/**
 * Here we delete a pixel document in the database
 */
export const deletePixel: RequestHandler<
  DeletePixelParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const pixelId = req.params.pixelId;

  try {
    if (!mongoose.isValidObjectId(pixelId)) {
      throw createHttpError(400, "Invalid pixel id");
    }

    const pixel = await PixelModel.findById(pixelId).exec();

    if (!pixel) {
      throw createHttpError(404, "Pixel not found");
    }

    await pixel.remove();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
