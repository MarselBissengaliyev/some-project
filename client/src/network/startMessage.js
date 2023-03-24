import { fetchData } from ".";

export const getStartMessage = async () => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/start-message`,
    {
      method: "GET",
    }
  );

  return response.json();
};

export const updateStartMessage = async ({
  message,
  photo = "",
  disableWebPagePreview,
}) => {
  console.log(disableWebPagePreview);
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/start-message`,
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

export const deleteStartMessage = async () => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/start-message`,
    {
      method: "DELETE",
    }
  );

  return response;
};
