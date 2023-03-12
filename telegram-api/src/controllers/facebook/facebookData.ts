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

const access_token = "<ACCESS_TOKEN>";
const pixel_id = "<ADS_PIXEL_ID>";
FacebookAdsApi.init(access_token);

const current_timestamp = Math.floor(new Date().getTime() / 1000);

export const postEvent = (
  { ip, user_agent, pixel, fb_click }: UserDataInterface,
  { eventName, actionSource }: ServerEventInterface
) => {
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

  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
    eventsData
  );

  eventRequest.execute().then(
    (response) => {
      console.log("Response: ", response);
    },
    (err) => {
      console.error("Error: ", err);
    }
  );
};
