document.addEventListener("DOMContentLoaded", () => {
  const test = document.getElementById("test");

  var params = window.location.search
    .replace("?", "")
    .split("&")
    .reduce(function (p, e) {
      var a = e.split("=");
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    }, {});

    const message = document.getElementById("message");

    console.log(params);

  if (!params.clickid || !params.fbclid || !params.fbp) {
    console.log()
    message.innerHTML = `У вас нет нужных макросов, кнопка не сработает`;
    return;
  }

  // Параметры
  const click_id = params.click_id;
  const pixel = params.fbp;
  const fb_click = params.fbclid;

  function setIp(value) {
    ip = value;
  }

  async function getAPi() {
    let ip;
    await fetch("https://ipapi.co/json/")
      .then((d) => d.json())
      .then((d) => {
        setIp(d.ip);
      });

    return ip;
  }

  console.log(getAPi());
  const user_agent = document.getElementById("user_agent").value;
  const domain = document.getElementById("domain").value;
  const time_click = document.getElementById("time_click").value;

  test.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(click_id, ip, user_agent, pixel, fb_click, domain, time_click);
    // 
    await fetch("https://back.roiup.team/api/facebook-data", {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: "POST",
      body: JSON.stringify({
        click_id,
        ip,
        user_agent,
        pixel,
        fb_click,
        domain,
        time_click,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        window.location.href = `https://t.me/umnico_test2_bot?start=${click_id}`;
      })
      .catch(console.log(err));
  });
});
