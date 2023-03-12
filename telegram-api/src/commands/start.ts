import axios from "axios";
import { UserData } from "facebook-nodejs-business-sdk";
import { postEvent } from "../controllers/facebook/facebookData";
import { createTelegramData } from "../controllers/telegramData";
import { StartContext } from "./start.interface";

export const start = async (ctx: StartContext) => {
  ctx.sendMessage("Hello");
  const clickId = ctx.startPayload;
  if (!ctx.message) {
    console.log("Has not been found message");
    return;
  }
  const { id, first_name, username } = ctx.message.from;

  if (!id || !first_name || !username || !clickId) {
    console.log("Has not been found id or first_name or username or clickId");
    return;
  }

  createTelegramData(clickId, {
    telegram_id: id,
    first_name_telegram: first_name,
    login_telegram: username,
    is_activ: true,
    is_deposit: false,
    time_lead: new Date().toDateString(),
    telegram_bot_login: ctx.botInfo.username,
  }).then((data) => {
    console.log(data);
    if (data?.facebookData instanceof UserData) {
      postEvent(data.facebookData, {
        eventName: "Lead",
        actionSource: data.facebookData.domain,
      });
      axios.post(
        `https://tracker.com/click.php?cnv_id=${data.facebookData.click_id}&event1=1`,
        data
      );
    }
  });
};
