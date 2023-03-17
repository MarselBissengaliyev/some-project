export const network = async (input, init) => {
  try {
    const res = await fetch(input, init);
    console.log(res);
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
