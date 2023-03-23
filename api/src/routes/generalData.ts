import express from "express";
import * as GeneralDataController from "../controllers/generalData/generalData";
import avatarMiddleware from "../middlewares/avatar";

const router = express.Router();

router.get("/", GeneralDataController.getGeneralData);

router.post("/", GeneralDataController.createGeneralData);

router.patch("/token", GeneralDataController.updateGeneralDataToken);

router.post(
  "/avatar",
  avatarMiddleware.single("avatar"),
  GeneralDataController.uploadAvatar
);

export default router;
