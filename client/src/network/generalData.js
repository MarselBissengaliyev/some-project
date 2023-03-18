import { fetchData } from ".";

export const updateGeneralDataMessage = async (message) => {
  try {
    const response = await fetchData(
      `${process.env.REACT_APP_API_URL}/api/general-data/message`,
      {
        method: "PATCH",
        body: JSON.stringify({
          bot_start_message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateGeneralDataToken = async (token) => {
  try {
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

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getGeneralData = async () => {
  try {
    const response = await fetchData(
      `${process.env.REACT_APP_API_URL}/api/general-data`,
      {
        method: "GET",
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
