import { fetchData } from ".";

/*
 ** Delete start message in database
 */
export const getTelegramData = async () => {
  const response = await fetchData(
    `/api/telegram-data`,
    {
      method: "GET",
    }
  );

  return response.json();
};

export const getDepositors = async (botUsername) => {
  const response = await fetchData(
    `/api/telegram-data/depositors/${botUsername}`,
    {
      method: "GET",
    }
  );

  return response.json();
};
