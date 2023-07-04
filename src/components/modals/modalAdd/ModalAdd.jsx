import s from "./modalAdd.module.css";
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { filterKeys } from "../../../utils/filterKeys.js";
import { processFormData } from "../../../utils/processFormDataModallAdd";

const ModalAdd = ({ isOpen, onClose, addNewCar, cars }) => {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const createdId = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;
    const formData = new FormData(formRef.current);
    const newCar = processFormData(formData, createdId);
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
            <label htmlFor="price">Price $:</label>
            <input
              type="text"
              id="price"
              name="price"
              required
              onKeyDown={filterKeys}
              pattern="[0-9]*"
              title="Please enter digits only."
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
