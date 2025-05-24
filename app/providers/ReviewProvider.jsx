import * as Global from "../constants/global";

export const getReviews = async ({ businessid }) => {
  try {
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
export const addReviews = async (review) => {
  console.log("reviewaddreivews", review);

  try {
    const response = await fetch(
      `${Global.default.BACKEND_URL}/reviews/addreview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      }
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
