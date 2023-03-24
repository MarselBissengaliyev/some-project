import { fetchData } from ".";

export const getMe = async (token) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_TELEGRAM}${token}/getMe`,
    {
      method: "POST",
    }
  );

  return response.json();
};

export const sendMessage = async (
  token,
  { chatId, text, disableWebPagePreview }
) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_TELEGRAM}${token}/sendMessage`,
    {
      method: "POST",
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
        disable_web_page_preview: disableWebPagePreview,
        disable_notification: true,
        reply_to_message_id: null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const sendPhoto = async (token, { chatId, photo, caption }) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_TELEGRAM}${token}/sendPhoto`,
    {
      method: "POST",
      body: JSON.stringify({
        chat_id: chatId,
        photo,
        caption,
        disable_notification: false,
        reply_to_message_id: null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const sendMassMessage = async ({
  photo = "",
  value,
  disableWebPagePreview,
  telegramBotLogin,
}) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/telegram-api/send-mass`,
    {
      method: "POST",
      body: JSON.stringify({
        photo,
        value,
        disableWebPagePreview,
        telegramBotLogin,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};
