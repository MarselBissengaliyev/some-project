import {
  EventRequest,
  ServerEvent,
  UserData,
} from "facebook-nodejs-business-sdk";
import {
  EventRequestInterface,
  ServerEventInterface,
  UserDataInterface,
} from "./facebookData.interface";

// const access_token = env.FACEBOOK_API_ACCESS_TOKEN;
// FacebookAdsApi.init(access_token);

const current_timestamp = Math.floor(new Date().getTime() / 1000);

export const postEvent = async (
  { ip, user_agent, fb_click }: UserDataInterface,
  { eventName, actionSource }: ServerEventInterface,
  { fb_pixel_id, token }: EventRequestInterface
) => {
  console.log("PostEvent run");
  const userData = new UserData()
    .setClientIpAddress(ip)
    .setClientUserAgent(user_agent)
    .setFbc(fb_click);

  const serverEvent = new ServerEvent()
    .setEventName(eventName)
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setActionSource(actionSource)
    .setEventSourceUrl("https://domain.com/thanks");

  const eventsData = [serverEvent];

  const eventRequest = new EventRequest(token, fb_pixel_id).setEvents(
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
