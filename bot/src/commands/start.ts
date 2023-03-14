import { postEvent } from "../controllers/facebook/facebookData";
import { create } from "../controllers/telegramData/telegramData";
import { StartContext } from "./start.interface";

export const start = async (ctx: StartContext) => {
  await ctx.sendMessage("Hello");
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

  await create(clickId, {
    telegram_id: id,
    first_name_telegram: first_name,
    login_telegram: username,
    is_activ: true,
    is_deposit: false,
    telegram_bot_login: ctx.botInfo.username,
    time_lead: new Date(),
  }).then(async (data) => {
    if (data?.facebookData) {
      console.log("Ura");
      await postEvent(data.facebookData, {
        eventName: "Lead",
        actionSource: "website",
      });
      // await axios.post(
      //   `https://tracker.com/click.php?cnv_id=${data.facebookData.click_id}&event1=1`,
      //   data
      // );
    }
  });
};
