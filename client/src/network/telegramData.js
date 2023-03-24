import { fetchData } from ".";

/*
 ** Delete start message in database
 */
export const getTelegramData = async (botUsername) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/telegram-data/${botUsername}`,
    {
      method: "GET",
    }
  );

  return response.json();
};
