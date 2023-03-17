export interface CreateGeneralDataBody {
  bot_start_message: string;
  bot_token: string;
}


export interface UpdateGeneralDataBody {
  bot_start_message?: string;
  bot_token?: string;
}

export interface UpdateGeneralDataParams {
  general_data_id: string;
}