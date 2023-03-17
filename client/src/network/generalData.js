export const updateGeneralDataMessage = async (message) => {
  try {
    const { data } = await fetch(
      `${process.env.REACT_APP_API_URL}/general-data/message`,
      {
        method: "PATCH",
        body: JSON.stringify({
          bot_start_message: message
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateGeneralDataToken = async (token) => {
  try {
    const { data } = await fetch(
      `${process.env.REACT_APP_API_URL}/general-data/message`,
      {
        method: "PATCH",
        body: JSON.stringify({
          bot_token: token
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

