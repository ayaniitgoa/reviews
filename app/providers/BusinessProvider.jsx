import * as Global from "../constants/global";

export const getBusinesses = async (locationid) => {
  try {
    console.log("locationid", locationid);

    const response = await fetch(
      `${Global.default.BACKEND_URL}/businesses?locationid=${locationid}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("businesses", data);

    return data;
  } catch (error) {
    console.error("Error finding nearby businesses", error);
    throw error; // Re-throw to let components handle it
  }
};

export const getBusiness = async ({ businessid }) => {
  try {
    const response = await fetch(
      `${Global.default.BACKEND_URL}/businesses/business?businessid=${businessid}`
    );

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
