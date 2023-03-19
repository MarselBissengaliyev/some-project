import { RequestHandler } from "express";


export const uploadImage: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json(`uploads/${req.file?.filename}`);
  } catch (error) {
    next(error);
  }
};
