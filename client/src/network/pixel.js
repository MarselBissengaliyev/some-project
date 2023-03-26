import { fetchData } from ".";

/*
 ** Get the pixel from database
 */
export const getPixel = async (pixelId) => {
  const response = await fetchData(
    `/api/pixels/${pixelId}`,
    {
      method: "GET",
    }
  );

  return response.json();
};

/*
 ** Get the all pixels from database
 */
export const getPixels = async () => {
  const response = await fetchData(
    `/api/pixels`,
    {
      method: "GET",
    }
  );

  return response.json();
};

/*
 ** Create the pixel in database
 */
export const createPixel = async ({ pixelId, token }) => {
  const response = await fetchData(
    `/api/pixels`,
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

/*
 ** Update the pixel in database
 */
export const updatePixel = async ({ pixelId, token, id }) => {
  const response = await fetchData(
    `/api/pixels/${id}`,
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
    `/pixels/${pixelId}`,
    {
      method: "DELETE",
    }
  );

  return response;
};
