/*
 ** fetch data handler
 */
export const fetchData = async (input, init) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(
      "Request failed with status: " +
        response.status +
        " message: " +
        errorMessage
    );
  }
};

export const fetchTelegramApiData = async (input, init) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.description;
    throw Error(
      "Request failed with status: " +
        response.error_code +
        " message: " +
        errorMessage
    );
  }
}; 

/*
 ** fetch img handler
 */
export const fetchImg = async (input, init) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(
      "Request failed with status: " +
        response.status +
        " message: " +
        errorMessage
    );
  }
};
