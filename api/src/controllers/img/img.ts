import { RequestHandler } from "express";

export const uploadImage: RequestHandler = async (req, res, next) => {
  console.log(req.file);
  try {
    if (req.file) {
      res.status(200).json(`uploads/${req.file?.filename}`);
    }
  } catch (error) {
    next(error);
  }
};
