import { fetchImg } from ".";

export const uploadImage = async (formData) => {
  try {
    const response = await fetchImg(
      `${process.env.REACT_APP_API_URL}/api/img`,
      {
        method: "POST",
        body: formData,
      }
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};  

export const deleteImage = async () => {
  try {
    const response = await fetchImg(
      `${process.env.REACT_APP_API_URL}/api/img`,
      {
        method: "DELETE",
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}