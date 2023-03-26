/*
 ** Create facebook data from database
 */
export const createFacebookData = async ({
  click_id,
  ip,
  user_agent,
  pixel,
  fb_click,
  domain,
}) => {
  const date = new Date();
  const unixTimeStamp = Math.floor(date.getTime() / 1000);
  
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/facebook-data`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        click_id,
        ip,
        user_agent,
        pixel,
        fb_click,
        domain,
        time_click: unixTimeStamp,
      }),
    }
  );

  return response.json();
};
