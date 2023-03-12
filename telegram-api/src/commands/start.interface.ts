import { Context } from "telegraf";

export interface StartContext extends Context {
  startPayload: string;
}