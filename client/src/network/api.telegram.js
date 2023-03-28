import { fetchData, fetchTelegramApiData } from ".";

const API_URL = process.env.REACT_APP_API_URL;

/*
 ** Get a my bot info from telegram api
 */
export const getMe = async (token) => {
  const response = await fetchTelegramApiData(
    `${process.env.REACT_APP_API_TELEGRAM}${token}/getMe`,
    {
      method: "POST",
    }
  );

  return response.json();
};

/*
 ** Send message to a some user who existing in bot
 */
export const sendMessage = async (
  token,
  { chatId, text, disableWebPagePreview }
) => {
  const response = await fetchTelegramApiData(
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

/*
 ** Send animation to a some user who existing in bot
 */
export const sendAnimation = async (token, { chatId, animation, caption }) => {
  const response = await fetchTelegramApiData(
    `${process.env.REACT_APP_API_TELEGRAM}${token}/sendAnimation`,
    {
      method: "POST",
      body: JSON.stringify({
        chat_id: chatId,
        animation: `${API_URL}/${animation}`,
        caption,
        parse_mode: "Markdown",
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

/*
 ** Send photo to a some user who existing in bot
 */
 export const sendPhoto = async (token, { chatId, photo, caption }) => {
  console.log(`${API_URL}/${photo}`);
  const response = await fetchTelegramApiData(
    `${process.env.REACT_APP_API_TELEGRAM}${token}/sendPhoto`,
    {
      method: "POST",
      body: JSON.stringify({
        chat_id: chatId,
        photo: `${API_URL}${photo}`,
        caption,
        parse_mode: "Markdown",
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

/*
 ** Send mass message to the users who existing in bot
 */
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
        photo: `${API_URL}${photo}`,
        value,
        parse_mode: "Markdown",
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
