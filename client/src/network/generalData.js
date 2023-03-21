import { fetchData } from ".";

export const updateGeneralDataMessage = async ({
  message,
  photo,
  disableWebPagePreview,
}) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/general-data/message`,
    {
      method: "PATCH",
      body: JSON.stringify({
        bot_start_message: message,
        photo: photo,
        disableWebPagePreview,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const updateGeneralDataToken = async (token) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/general-data/token`,
    {
      method: "PATCH",
      body: JSON.stringify({
        bot_token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const getGeneralData = async () => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/general-data`,
    {
      method: "GET",
    }
  );
  return response.json();
};
