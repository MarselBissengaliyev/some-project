import { fetchData } from ".";

export const getPixel = async () => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/pixels`,
    {
      method: "GET",
    }
  );

  return response;
};

export const deletePixel = async () => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/pixels`,
    {
      method: "DELETE",
    }
  );

  return response;
};

export const createPixel = async ({ pixelId, token }) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/pixels`,
    {
      method: "POST",
      body: JSON.stringify({
        fb_pixel_id: pixelId,
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
