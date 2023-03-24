import { RequestHandler } from "express";

/**
 * Here we upload image to general data
 */
export const uploadImage: RequestHandler = async (req, res, next) => {
  try {
    if (req.file) {
      res.status(200).json(`uploads/${req.file?.filename}`);
    }
  } catch (error) {
    next(error);
  }
};
