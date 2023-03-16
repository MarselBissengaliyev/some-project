import { postEvent } from "../controllers/facebookData/facebookData";
import {
  EventRequestInterface,
  ServerEventInterface,
} from "../controllers/facebookData/facebookData.interface";
import { createTelegramData } from "../controllers/telegramData/telegramData";
import PixelModel from "../models/pixel";
import { StartContext } from "./start.interface";

/**  
 * The Logic, which will be executed when user clicks on the button "Start" in telegram bot
*/
export const start = async (ctx: StartContext) => {
  await ctx.reply("Hello");
  const clickId = ctx.startPayload;

  if (!ctx.message) {
    console.log("Has not been found message");
    return;
  }

  if (
    !ctx.message.from.id ||
    !ctx.message.from.first_name ||
    !ctx.message.from.username ||
    !clickId
  ) {
    console.log("Has not been found id or first_name or username or clickId");
    return;
  }
  const { id, first_name, username } = ctx.message.from;

  await createTelegramData(clickId, {
    telegram_id: id,
    first_name_telegram: first_name,
    login_telegram: username,
    is_activ: true,
    is_deposit: false,
    telegram_bot_login: ctx.botInfo.username,
    time_lead: new Date(),
  })
    .then(async (data) => {
      if (data?.facebookData) {
        const pixel = await PixelModel.findOne({
          fb_pixel_id: data.facebookData.pixel,
        }).exec();

        if (!pixel) {
          return;
        }

        const serverEventData: ServerEventInterface = {
          eventName: "Lead",
          actionSource: "website",
        };

        const eventRequestData: EventRequestInterface = {
          fb_pixel_id: pixel.fb_pixel_id,
          token: pixel.token,
        };

        await postEvent(data.facebookData, serverEventData, eventRequestData);
        // await axios.post(
        //   `https://tracker.com/click.php?cnv_id=${data.facebookData.click_id}&event1=1`,
        //   data
        // );
      }
    })
    .catch(console.error);
};
