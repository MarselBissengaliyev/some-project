import express from "express";
import * as GeneralDataController from "../controllers/generalData/generalData";

const router = express.Router();

router.get("/", GeneralDataController.getGeneralData);
router.post("/", GeneralDataController.createGeneralData);

router.patch("/token", GeneralDataController.updateGeneralDataToken);

export default router;
