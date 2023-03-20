import { postEvent } from "../controllers/facebookData/facebookData";
import {
  EventRequestInterface,
  ServerEventInterface,
} from "../controllers/facebookData/facebookData.interface";
import { createTelegramData } from "../controllers/telegramData/telegramData";
import PixelModel from "../models/pixel";
import StartMessageModel from "../models/startMessage";
import env from "../utils/validateEnv";
import { StartContext } from "./start.interface";

/**
 * The Logic, which will be executed when user clicks on the button "Start" in telegram bot
 */
export const start = async (ctx: StartContext) => {
  console.log("hi");
  const startMessage = await StartMessageModel.findOne({}).exec();

  if (!startMessage) {
    return;
  }

  if (startMessage.photo) {
    await ctx.replyWithPhoto(`${env.API_URL}${startMessage.photo}`, {
      caption: startMessage.message,
      parse_mode: "Markdown",
      disable_notification: false,
    });
  } else {
    await ctx.reply(startMessage.message, {
      disable_notification: false,
      disable_web_page_preview: startMessage.disable_web_page_preview,
      parse_mode: "Markdown",
    });
  }

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
    start_time: new Date()
  })
    .then(async (data) => {
      if (data?.facebookData) {
        const pixels = await PixelModel.find({
          fb_pixel_id: data.facebookData.pixel,
        }).exec();

        pixels.forEach(async (pixel) => {
          const serverEventData: ServerEventInterface = {
            eventName: "Lead",
            actionSource: "website",
          };

          const eventRequestData: EventRequestInterface = {
            fb_pixel_id: pixel.fb_pixel_id,
            token: pixel.token,
          };

          await postEvent(data.facebookData, serverEventData, eventRequestData);
        });
        // await axios.post(
        //   `https://tracker.com/click.php?cnv_id=${data.facebookData.click_id}&event1=1`,
        //   data
        // );
      }
    })
    .catch(console.error);
};
