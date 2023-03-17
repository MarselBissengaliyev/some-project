import { network } from ".";

export const getMe = async (token) => {
  const response = await network(
    `${process.env.REACT_APP_API_TELEGRAM}${token}/getMe`,
    {
      method: "POST",
    }
  );

  return response;
};

export const sendMessage = async (token, { chat_id, text }) => {
  const response = await network(
    `${process.env.REACT_APP_API_TELEGRAM}${token}/sendMessage`,
    {
      method: "POST",
      body: JSON.stringify({
        chat_id: chat_id,
        text: text,
        parse_mode: "Markdown",
        disable_web_page_preview: false,
        disable_notification: true,
        reply_to_message_id: null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const sendPhoto = async (token, { chat_id, photo, caption }) => {
  const response = await network(
    `${process.env.REACT_APP_API_TELEGRAM}${token}/sendPhoto`,
    {
      method: "POST",
      body: JSON.stringify({
        chat_id,
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

  return response;
};
