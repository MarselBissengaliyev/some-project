import { fetchData, fetchImg } from ".";

/*
 ** Update a general token from the GENERAL DATA in a database
 */
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

/*
 ** Get a general data from the database
 */
export const getGeneralData = async () => {
  const response = await fetchData(
    `/api/general-data`,
    {
      method: "GET",
    }
  );
  return response.json();
};

/*
 ** Upload a general data avatar from the database
 */
export const uploadAvatar = async (formData) => {
  const response = fetchImg(
    `/api/general-data/avatar`,
    {
      method: "POST",
      body: formData,
    }
  );

  return await response;
};
