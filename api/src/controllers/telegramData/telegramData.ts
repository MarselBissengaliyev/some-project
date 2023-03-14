import { RequestHandler } from "express";

export const createFacebookData: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json(req);
  } catch (error) {
    next(error);
  }
};
