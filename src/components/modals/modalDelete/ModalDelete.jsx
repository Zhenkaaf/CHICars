import s from "./modalDelete.module.css";
import React from "react";
import ReactDOM from "react-dom";

const ModalDelete = ({
  isOpen,
  onClose,
  carId,
  cars,
  updateCars,
  carModel,
  carYear,
  carVin,
}) => {
  const deleteCar = (carId) => {
    const updatedCars = cars.filter((car) => car.id !== carId);
    updateCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
  };

  const handleOk = () => {
    deleteCar(carId);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={s.modal__overlay}>
      <div className={s.modal}>
        <div className={s.modal__header}>
          <h2>Delete this car?</h2>
        </div>
        <p>
          Model: <b>{carModel}</b>.
        </p>
        <p>
          VIN: <b>{carVin}</b>.
        </p>
        <p>
          Year: <b>{carYear}</b>.
        </p>
        <div className={s.modal__footer}>
          <button
            className={s.modal__ok}
            onClick={handleOk}
          >
            Ok
          </button>
          <button
            className={s.modal__cancel}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
export default ModalDelete;
