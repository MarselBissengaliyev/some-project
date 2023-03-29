import {
  EventRequest,
  ServerEvent,
  UserData,
} from "facebook-nodejs-business-sdk";
import {
  EventRequestInterface,
  UserDataInterface,
} from "./facebookData.interface";

// const access_token = env.FACEBOOK_API_ACCESS_TOKEN;
// FacebookAdsApi.init(access_token);

const current_timestamp = Math.floor(new Date().getTime() / 1000);

/**
 * Read documentation
 * https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api#send
 */
export const postEvent = async (
  { ip, user_agent, fb_click }: UserDataInterface,
  { pixel_id, token, domain }: EventRequestInterface
) => {
  const userData = new UserData()
    .setClientIpAddress(ip)
    .setClientUserAgent(user_agent)
    .setFbc(`fb.1.${fb_click.time_click}.${fb_click.value}`);

  const serverEvent = new ServerEvent()
    .setEventName("Lead")
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setActionSource("website")
    .setEventSourceUrl(`https://${domain}`);

  const eventsData = [serverEvent];
  console.log(eventsData);

  const eventRequest = new EventRequest(token, pixel_id).setEvents(
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
