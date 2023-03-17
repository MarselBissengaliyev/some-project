import { network } from ".";

export const getTelegramData = async (botUsername) => {
  const response = await network(
    `${process.env.REACT_APP_API_URL}/telegram-data/${botUsername}`,
    {
      method: "GET",
    }
  );

  return response;
};
