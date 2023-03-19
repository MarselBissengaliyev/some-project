export const createFacebookData = async ({
  click_id,
  ip,
  user_agent,
  pixel,
  fb_click,
  domain,
}) => {
  try {
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
          time_click: new Date(),
        }),
      }
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
