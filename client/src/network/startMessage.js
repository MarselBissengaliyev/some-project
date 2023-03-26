import { fetchData } from ".";

/*
 ** Get the start message from database
 */
export const getStartMessage = async () => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/start-message`,
    {
      method: "GET",
    }
  );

  return response.json();
};

/*
 ** Update the start message in database
 */
export const updateStartMessage = async ({
  message,
  photo = "",
  disableWebPagePreview,
}) => {
  const response = await fetchData(
    `/api/start-message`,
    {
      method: "PATCH",
      body: JSON.stringify({
        message,
        photo,
        disable_web_page_preview: disableWebPagePreview,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

/*
 ** Delete the start message in database
 */
export const deleteStartMessage = async () => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/start-message`,
    {
      method: "DELETE",
    }
  );

  return response;
};
