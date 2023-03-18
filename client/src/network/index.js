export const fetchData = async (input, init) => {
  try {
    const res = await fetch(input, init);
    console.log(res);
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
}