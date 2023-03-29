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
export const postEvent = (
  { ip, user_agent, fb_click }: UserDataInterface,
  { pixel_id, token, domain }: EventRequestInterface
) => {
  // const userData = new UserData()
  //   .setClientIpAddress(ip)
  //   .setClientUserAgent(user_agent)
  //   .setFbc(`fb.1.${fb_click.time_click}.${fb_click.value}`);

  // const serverEvent = new ServerEvent()
  //   .setEventName("Lead")
  //   .setEventTime(current_timestamp)
  //   .setUserData(userData)
  //   .setActionSource("website")
  //   .setEventSourceUrl(`https://${domain}`);

  const userData = new UserData()
  .setClientIpAddress("103.255.4.24")
  .setClientUserAgent("Mozilla/5.0 (Linux; Android 11; V2043_21) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36")
  .setFbc(`fb.1.1679914434.PAAabcPnGV7ReY6TMWJtT_Qpt13cpcm7wz-7LjrK51R31cTp8OCd7BlFxOdZ4_aem_Ae-EPbJM-u0GgiaoVUuNf6dxdDIZBy3yg9knryaxMCwZUHJQSANcw5rKwI_kIilzxnGsRb0Wir4l4Y5dXzNf8xQBvpK36WRgu9PY4_vVIubsMSYQb20gB77dyoUCDpkrk8tpr7ToFc6XyZYVPee7JjVc`);

const serverEvent = new ServerEvent()
  .setEventName("Lead")
  .setEventTime(current_timestamp)
  .setUserData(userData)
  .setActionSource("website")
  .setEventSourceUrl(`https://softwerenews.click`);

  const eventsData = [serverEvent];

  const eventRequest = new EventRequest(token, pixel_id).setEvents(
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
