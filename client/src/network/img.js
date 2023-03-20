import { fetchImg } from ".";

export const uploadImage = async (formData) => {
  const response = await fetchImg(
    `${process.env.REACT_APP_API_URL}/api/image`,
    {
      method: "POST",
      body: formData
    }
  );

  return response.json();
};
