import { RequestHandler } from "express";
import {
  leadChanged,
  leadChangedStatus,
  messageIncoming,
} from "../controllers/umnico/umnico";
import { UmnikoWebhookDataBody } from "./umnico.interface";

/**
 * Here we update the umnico_lead_id in the document that belongs to the telegram_data_items collection
 */
export const umnikoWebhook: RequestHandler<
  unknown,
  unknown,
  UmnikoWebhookDataBody,
  unknown
> = async (req, res, next) => {
  try {
    switch (req.body.type) {
      case "lead.changed.status":
        leadChangedStatus(req, res, next);
        break;
      case "message.incoming":
        messageIncoming(req, res, next);
        break;
      case "lead.changed":
        leadChanged(req, res, next);
        break;
      default:
        res.sendStatus(204);
        break;
    }
  } catch (error) {
    next(error);
  }
};
