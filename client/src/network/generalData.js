import { fetchData } from ".";

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
