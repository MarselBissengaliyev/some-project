import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import PixelModel from "../../models/pixel";
import {
  CreatePixelBody,
  UpdatePixelBody,
  UpdatePixelParams,
} from "./pixel.interface";

export const getPixel: RequestHandler = async (req, res, next) => {
  const pixelId = req.params.pixelId;
  try {
    if (!mongoose.isValidObjectId(pixelId)) {
      throw createHttpError(400, "Invalid pixel id");
    }

    const pixel = await PixelModel.findById(pixelId).exec();

    if (!pixel) {
      throw createHttpError(404, "Pixel not found");
    }

    res.status(200).json(pixel);
  } catch (error) {
    next(error);
  }
};

export const getPixels: RequestHandler = async (req, res, next) => {
  try {
    const pixels = await PixelModel.find().exec();

    res.status(200).json(pixels);
  } catch (error) {
    next(error);
  }
};

/**
 * Here we create a pixel document in the database
 */
export const createPixel: RequestHandler<
  unknown,
  unknown,
  CreatePixelBody,
  unknown
> = async (req, res, next) => {
  const fbPixelId = req.body.fb_pixel_id;
  const token = req.body.token;

  try {
    if (!fbPixelId || !token) {
      throw createHttpError(400, "Pixel must have a fb_pixel_id and token");
    }

    const existingPixel = await PixelModel.findOne({
      fb_pixel_id: fbPixelId,
    }).exec();

    if (existingPixel) {
      throw createHttpError(400, "Pixel with this Id already exists");
    }

    const newPixel = await PixelModel.create({
      fb_pixel_id: fbPixelId,
      token: token,
    });

    res.status(201).json(newPixel);
  } catch (error) {
    next(error);
  }
};

export const updatePixel: RequestHandler<
  UpdatePixelParams,
  unknown,
  UpdatePixelBody,
  unknown
> = async (req, res, next) => {
  const pixelId = req.params.pixelId;
  const fbPixelId = req.body.fb_pixel_id;
  const token = req.body.token;

  try {
    if (!mongoose.isValidObjectId(pixelId)) {
      throw createHttpError(400, "Invalid pixel id");
    }

    if (!fbPixelId) {
      throw createHttpError(400, "Pixel must have a pixel ID");
    }

    if (!token) {
      throw createHttpError(400, "Pixel must have a pixel token");
    }

    const pixel = await PixelModel.findById(pixelId).exec();

    if (!pixel) {
      throw createHttpError(404, "Pixel not found");
    }

    pixel.fb_pixel_id = fbPixelId;
    pixel.token = token;

    const updatedPixel = await pixel.save();

    res.status(200).json(updatedPixel);
  } catch (error) {
    next(error);
  }
};

/**
 * Here we delete a pixel document in the database
 */
export const deletePixel: RequestHandler = async (req, res, next) => {
  const pixelId = req.params.pixelId;
  console.log("Delte");
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
