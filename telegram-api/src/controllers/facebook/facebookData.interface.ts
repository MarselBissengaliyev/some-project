import bizSdk from "facebook-nodejs-business-sdk";

export interface UserDataInterface extends bizSdk.UserData {
  ip: string;
  user_agent: string;
  pixel: string;
  fb_click: string;
}

export interface ServerEventInterface {
  actionSource: string;
  eventName: string;
}
