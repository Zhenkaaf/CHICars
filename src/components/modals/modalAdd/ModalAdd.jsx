import s from "./modalAdd.module.css";
import React, { useRef } from "react";
import ReactDOM from "react-dom";

const ModalAdd = ({ isOpen, onClose, addNewCar, cars }) => {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const createdId = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;
    const formData = new FormData(formRef.current);

    const year = parseInt(formData.get("car_model_year"));

    const vin = formData.get("car_vin").toUpperCase();

    const price = parseFloat(formData.get("price").replace(/[^\d.]/g, ""));
    const priceStr = price.toString();
    const formattedPrice =
      priceStr.length > 4
        ? `$${priceStr.slice(0, 4)}.${priceStr.slice(4, 6)}`
        : `$${priceStr}`;
    /*  let formattedPrice = "";
    if (priceStr.length > 4) {
      const integerPart = priceStr.slice(0, 4);
      const decimalPart = priceStr.slice(4, 6);
      formattedPrice = `$${integerPart}.${decimalPart}`;
    } else {
      formattedPrice = `$${priceStr}`;
    } */

    const company =
      formData.get("car").charAt(0).toUpperCase() +
      formData.get("car").slice(1);

    const model =
      formData.get("car_model").charAt(0).toUpperCase() +
      formData.get("car_model").slice(1);

    const color =
      formData.get("car_color").charAt(0).toUpperCase() +
      formData.get("car_color").slice(1);
    const newCar = Object.fromEntries(formData.entries());
    newCar.id = createdId;
    newCar.car_model_year = year;
    newCar.car_vin = vin;
    newCar.price = formattedPrice;
    newCar.car = company;
    newCar.car_model = model;
    newCar.car_color = color;
    newCar.availability = newCar.availability === "true";
    addNewCar(newCar);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h2>Add car</h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className={s.formGroup}>
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              name="car"
              required
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="car_model"
              required
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="vin">VIN:</label>
            <input
              type="text"
              id="vin"
              name="car_vin"
              required
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="car_model_year"
              min="1000"
              max="9999"
              pattern="\d{4}"
              required
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="color">Color:</label>
            <input
              type="text"
              id="color"
              name="car_color"
              required
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              required
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="availability">Availability:</label>
            <select
              className={s.selectModal}
              id="availability"
              name="availability"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
          <div className={s.buttonGroup}>
            <button type="submit">Add car</button>
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

export default ModalAdd;
