import s from "./modalEdit.module.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { binarySearch } from "../../../utils/binarySearch";
import { convertPrice } from "../../../utils/convertPrice";

const ModalEdit = ({ isOpen, onClose, carId, updateCarData, cars }) => {
  /* const selectedCar = cars.find((car) => car.id === carId); */
  const selectedCar = binarySearch(cars, carId);

  const [color, setColor] = useState(selectedCar?.car_color);
  const [price, setPrice] = useState(selectedCar?.price);
  const [availability, setAvailability] = useState(
    selectedCar?.availability || false
  );

  const handleKeyDown = (event) => {
    const pattern = /^[0-9\b]+$/;
    const allowedKeys = ["Backspace"];
    if (!pattern.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateCarData(carId, {
      car_color: color,
      price: convertPrice(price),
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
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="price">Price $:</label>
            <input
              type="text"
              id="price"
              value={price.replace(/^\$/, "")}
              onKeyDown={handleKeyDown}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="availability">Availability:</label>
            <select
              className={s.selectModal}
              id="availability"
              value={availability ? "notAvailable" : "available"}
              onChange={(event) =>
                setAvailability(event.target.value === "available")
              }
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
