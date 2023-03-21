export interface SendMassMessageUserInterface {
  telegram_id: string;
}

export interface SendMassMessageBody {
  activeUsersId: SendMassMessageUserInterface[];
  photo: string;
  value: string;
  disableWebPagePreview: boolean;
}