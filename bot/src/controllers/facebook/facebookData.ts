import env from '../../utils/validateEnv';

import {
  EventRequest,
  FacebookAdsApi,
  ServerEvent,
  UserData,
} from "facebook-nodejs-business-sdk";
import {
  ServerEventInterface,
  UserDataInterface,
} from "./facebookData.interface";

const access_token = env.FACEBOOK_API_ACCESS_TOKEN;
FacebookAdsApi.init(access_token);

const current_timestamp = Math.floor(new Date().getTime() / 1000);

export const postEvent = async (
  { ip, user_agent, pixel, fb_click }: UserDataInterface,
  { eventName, actionSource }: ServerEventInterface
) => {
  console.log("PostEvent run");
  const userData = new UserData()
    .setClientIpAddress(ip)
    .setClientUserAgent(user_agent)
    .setFbp(pixel)
    .setFbc(fb_click);

  const serverEvent = new ServerEvent()
    .setEventName(eventName)
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setActionSource(actionSource);

  const eventsData = [serverEvent];

  const eventRequest = new EventRequest(access_token, env.PIXEL_ID).setEvents(
    eventsData
  );

  await eventRequest.execute().then(
    (response) => {
      console.log("Response: ", response);
    },
    (err) => {
      console.error("Error: ", err);
    }
  );
};
