import bizSdk from "facebook-nodejs-business-sdk";
import { FacebookDataInterface } from "./facebook.interface";
const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const DeliveryCategory = bizSdk.DeliveryCategory;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

const access_token = "<ACCESS_TOKEN>";
const pixel_id = "<ADS_PIXEL_ID>";
const api = bizSdk.FacebookAdsApi.init(access_token);

const current_timestamp = Math.floor(new Date().getTime() / 1000);

export const setUserData = ({
  ip,
  user_agent,
  pixel,
  fb_click,
}: FacebookDataInterface) => {
  const userData = new UserData()
    .setClientIpAddress(ip)
    .setClientUserAgent(user_agent)
    .setFbp(pixel)
    .setFbc(fb_click);

  return userData;
}

export const setSererEvent = (userData: bizSdk.UserData) => {
  const serverEvent = (new ServerEvent())
                .setEventName('Purchase')
                .setEventTime(current_timestamp)
                .setUserData(userData)
                .setActionSource('website');
}