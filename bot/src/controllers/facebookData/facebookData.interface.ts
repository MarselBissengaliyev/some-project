export interface UserDataInterface {
  ip: string;
  user_agent: string;
  fb_click: {
    time_click: number;
    value: string;
  };
}

export interface ServerEventInterface {
  actionSource: string;
  eventName: string;
}

export interface EventRequestInterface {
  pixel_id: string;
  token: string;
  domain: string;
}
