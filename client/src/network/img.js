import { fetchImg } from ".";

/*
 ** Upload image to server
 */
export const uploadImage = async (formData) => {
  const response = await fetchImg(
    `/image`,
    {
      method: "POST",
      body: formData,
    }
  );

  return await response.json();
};
