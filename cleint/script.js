document.addEventListener("DOMContentLoaded", () => {
  const test = document.getElementById("test");
  const click_id = document.getElementById("click_id").value;
  const ip = document.getElementById("ip").value;
  const user_agent = document.getElementById("user_agent").value;
  const pixel = document.getElementById("pixel").value;
  const fb_click = document.getElementById("fb_click").value;
  const domain = document.getElementById("domain").value;
  const time_click = document.getElementById("time_click").value;

  test.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(click_id, ip, user_agent, pixel, fb_click, domain, time_click);
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
      .then((res) => {res.json()})
      .then((data) => {
        console.log(data);
        window.location.href=`https://t.me/umnico_test2_bot?start=${click_id}`;
      })
      .catch(console.log(err));
  });
});
