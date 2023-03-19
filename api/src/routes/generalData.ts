import express from "express";
import * as GeneralDataController from "../controllers/generalData/generalData";
import multer from "multer";
import path from "path";

const router = express.Router();

router.get("/", GeneralDataController.getGeneralData);
router.post("/", GeneralDataController.createGeneralData);

router.patch("/message", GeneralDataController.updateGeneralDataMessage);
router.patch("/token", GeneralDataController.updateGeneralDataToken);

export default router;
