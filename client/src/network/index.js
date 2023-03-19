export const fetchData = async (input, init) => {
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchImg = async (input, init) => {
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};
