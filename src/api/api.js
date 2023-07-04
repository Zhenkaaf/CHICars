import axios from "axios";

export async function fetchCars() {
  try {
    const res = await axios.get("https://myfakeapi.com/api/cars/");
    return res.data.cars;
  } catch (error) {
    console.error(error);
    throw new Error(
      "An error occurred while loading data. Please try again later."
    );
  }
}
