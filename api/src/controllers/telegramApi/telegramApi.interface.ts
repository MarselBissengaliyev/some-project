export interface SendMassMessageUserInterface {
  telegram_id: string;
}

export interface SendMassMessageBody {
  photo: string;
  value: string;
  disableWebPagePreview: boolean;
  telegramBotLogin: string;
}