import { fetchData } from ".";

export const getTelegramData = async (botUsername, { page = 1 }) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/telegram-data/${botUsername}?page=${page}`,
    {
      method: "GET",
    }
  );

  return response.json();
};
