import bizSdk from "facebook-nodejs-business-sdk";

export interface UserData extends bizSdk.UserData {
  ip: string;
  user_agent: string;
  pixel: string;
  fb_click: string;
}

export interface ServerEvent {
  actionSource: string;
  eventName: string;
}
