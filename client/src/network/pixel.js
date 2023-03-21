import { fetchData } from ".";

export const getPixel = async (pixelId) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/pixels/${pixelId}`,
    {
      method: "GET",
    }
  );

  return response.json();
};

export const getPixels = async () => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/pixels`,
    {
      method: "GET",
    }
  );

  return response.json();
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

  return response.json();
};

export const updatePixel = async ({ pixelId, token, id }) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/pixels/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        fb_pixel_id: pixelId,
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const deletePixel = async (pixelId) => {
  const response = await fetchData(
    `${process.env.REACT_APP_API_URL}/api/pixels/${pixelId}`,
    {
      method: "DELETE",
    }
  );

  return response;
};
