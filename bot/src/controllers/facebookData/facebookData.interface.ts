export interface UserDataInterface {
  ip: string;
  user_agent: string;
  fb_click: string;
}

export interface ServerEventInterface {
  actionSource: string;
  eventName: string;
}

export interface EventRequestInterface {
  fb_pixel_id: string;
  token: string;
}