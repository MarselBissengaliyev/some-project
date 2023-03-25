export interface GetTelegramDataParams {
  telegram_bot_login: string;
}

export interface ActiveUsersWithClickIdInterface {
  click_id: string | null;
  telegram_id: number | null;
  first_name_telegram: string | null;
  login_telegram: string | null;
  is_active: boolean | null;
  telegram_bot_login: string | null;
  is_deposit: boolean | null;
  time_lead: number | null;
  umnico_lead_id: number | null;
  amount: number | null;
  time_sale: number | null;
  time_click: number | null;
}
