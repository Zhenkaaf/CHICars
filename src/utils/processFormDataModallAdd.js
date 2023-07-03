import { convertPrice } from "./convertPrice";

export const processFormData = (formData, createdId) => {
  const newCar = {};

  formData.forEach((value, key) => {
    if (key === "price") {
      newCar[key] = convertPrice(value);
    } else if (key === "car" || key === "car_model" || key === "car_color") {
      newCar[key] = value.charAt(0).toUpperCase() + value.slice(1);
    } else if (key === "car_model_year") {
      newCar[key] = parseInt(value);
    } else if (key === "car_vin") {
      newCar[key] = value.toUpperCase();
    } else if (key === "availability") {
      newCar[key] = value === "true";
    } else {
      newCar[key] = value;
    }
  });

  newCar.id = createdId;
  return newCar;
};
