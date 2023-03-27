import axios from "axios";
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
  console.log("Start");
  const startMessage = await StartMessageModel.findOne({}).exec();

  if (!startMessage) {
    return;
  }

  if (startMessage.photo) {
    const re = /(?:\.([^.]+))?$/;
    const extension = startMessage.photo && re.exec(startMessage.photo);

    if ((extension && extension[1]) === "gif") {
      return await ctx.replyWithAnimation(
        `${env.API_URL}${startMessage.photo}`,
        {
          caption: startMessage.message,
          parse_mode: "Markdown",
          disable_notification: false,
        }
      );
    }

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

  console.log(
    ctx.message.from.id,
    ctx.message.from.first_name,
    ctx.message.from.username,
    clickId
  );

  if (!ctx.message.from.id) {
    console.log("Has not been found id or first_name or username or clickId");
    return;
  }
  const { id, first_name, username, last_name } = ctx.message.from;

  const date = new Date();
  const unixTimeStamp = Math.floor(date.getTime() / 1000);

  await createTelegramData(clickId, {
    telegram_id: id,
    first_name_telegram: first_name ?? "",
    login_telegram: username ?? "",
    is_active: true,
    is_deposit: false,
    telegram_bot_login: ctx.botInfo.username,
    time_lead: unixTimeStamp,
    last_name_telegram: last_name ?? ""
  })
    .then(async (data) => {
      console.log(data?.facebookData);
      if (data && data.facebookData) {
        const pixels = await PixelModel.find({
          fb_pixel_id: data.facebookData.pixel,
        }).exec();

        const domain = data.facebookData.domain;
        const ip = data.facebookData.ip;
        const fb_click = data.facebookData.fb_click;
        const user_agent = data.facebookData.user_agent;
        if (!domain || !ip || !fb_click || !user_agent) {
          return;
        }

        for (let i = 0; i < pixels.length; i++) {
          const pixel = pixels[i];
          if (pixel.fb_pixel_id === data.facebookData.pixel) {
            const serverEventData: ServerEventInterface = {
              eventName: "Lead",
              actionSource: "website",
            };

            const eventRequestData: EventRequestInterface = {
              fb_pixel_id: pixel.fb_pixel_id,
              token: pixel.token,
              domain,
            };

            await postEvent(
              { ip, fb_click, user_agent },
              serverEventData,
              eventRequestData
            );
            break;
          }
        }

        await axios.post(
          `http://traffer.online/click.php?cnv_id=${clickId}&payout=0&cnv_status=lead`
        );
      }
    })
    .catch(console.error);
};
