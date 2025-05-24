import * as Global from "../constants/global";

export const getReviews = async ({ businessid }) => {
  try {
    console.log("rere", businessid);

    const response = await fetch(
      `${Global.default.BACKEND_URL}/reviews?businessid=${businessid}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("reviews", data);

    return data;
  } catch (error) {
    console.error("Error finding nearby businesses", error);
    throw error; // Re-throw to let components handle it
  }
};

