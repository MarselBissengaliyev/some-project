import { network } from ".";

export const updateGeneralDataMessage = async (message) => {
  try {
    const response = await network(
      `${process.env.REACT_APP_API_URL}/general-data/message`,
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
    const response = await network(
      `${process.env.REACT_APP_API_URL}/general-data/token`,
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
    const response = await network(
      `${process.env.REACT_APP_API_URL}/general-data`,
      {
        method: "GET",
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
