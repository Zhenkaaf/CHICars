import React, { useState } from "react";
import ReactDOM from "react-dom";
import s from "./modalEdit.module.css";

const ModalEdit = ({ isOpen, onClose, carId, updateCarData }) => {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];

  /* const selectedCar = cars.find((car) => car.id === carId); */
  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid].id === target) {
        return arr[mid];
      }

      if (arr[mid].id < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return null;
  };

  cars.sort((a, b) => a.id - b.id);

  const selectedCar = binarySearch(cars, carId);

  const [color, setColor] = useState(selectedCar?.car_color || "");
  const [price, setPrice] = useState(
    selectedCar?.price?.trim().replace(/[^0-9.]/g, "") || ""
  );
  const [availability, setAvailability] = useState(
    selectedCar?.availability || false
  );

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value.replace(/[^\d.]/g, ""));
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value === "available");
  };

  /* const updateCarData = (carId, newData) => {
    const updatedCars = cars.map((car) => {
      if (car.id === carId) {
        return { ...car, ...newData };
      }
      return car;
    });
    localStorage.setItem("cars", JSON.stringify(updatedCars));
  }; */

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCarData(carId, {
      car_color: color,
      price: `$${price}`,
      availability,
    });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h2>Edit Car Data</h2>
        <form onSubmit={handleSubmit}>
          <div className={s.formGroup}>
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              value={selectedCar.car}
              disabled
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              value={selectedCar.car_model}
              disabled
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="vin">VIN:</label>
            <input
              type="text"
              id="vin"
              value={selectedCar.car_vin}
              disabled
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              value={selectedCar.car_model_year}
              disabled
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="color">Color:</label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={handleColorChange}
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={`$${price}`}
              onChange={handlePriceChange}
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="availability">Availability:</label>
            <select
              className={s.selectModal}
              id="availability"
              value={availability ? "available" : "notAvailable"}
              onChange={handleAvailabilityChange}
            >
              <option value="available">Available</option>
              <option value="notAvailable">Not Available</option>
            </select>
          </div>
          <div className={s.buttonGroup}>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ModalEdit;
