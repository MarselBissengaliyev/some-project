export const getParams = () => {
  const params = window.location.search
    .replace("?", "")
    .split("&")
    .reduce(function (p, e) {
      var a = e.split("=");
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    }, {});

  return params;
};

export const getIp = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) {
      throw Error('Не удалось получить ip');
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
