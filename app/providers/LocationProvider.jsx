import * as Global from "../constants/global";

export const getLocations = async () => {
  try {
    const response = await fetch(`${Global.default.BACKEND_URL}/locations`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("locations", data);

    return data;
  } catch (error) {
    console.error("Error finding nearest city:", error);
    throw error; // Re-throw to let components handle it
  }
};
