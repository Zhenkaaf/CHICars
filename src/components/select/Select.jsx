import s from "./select.module.css";
import { useState } from "react";
import ModalDelete from "../modals/modalDelete/ModalDelete";
import ModalEdit from "../modals/modalEdit/ModalEdit";

const SelectComp = ({
  carId,
  updateCarData,
  cars,
  updateCars,
  carModel,
  carYear,
  carVin,
}) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [selected, setSelected] = useState("");

  const openModalEdit = () => {
    setIsOpenModalEdit(true);
  };
  const closeModalEdit = () => {
    setIsOpenModalEdit(false);
    setSelected("");
  };

  const openModalDelete = () => {
    setIsOpenModalDelete(true);
  };
  const closeModalDelete = () => {
    setIsOpenModalDelete(false);
    setSelected("");
  };

  const handleSelectChange = (event, carId) => {
    const selectedAction = event.target.value;
    setSelected(selectedAction);
    if (selectedAction === "edit") {
      openModalEdit();
    } else if (selectedAction === "delete") {
      openModalDelete();
    } else if (selectedAction === "") {
      setSelected("");
    }
  };

  return (
    <div>
      <div>
        {isOpenModalEdit && (
          <ModalEdit
            isOpen={isOpenModalEdit}
            onClose={closeModalEdit}
            carId={carId}
            cars={cars}
            updateCarData={updateCarData}
          />
        )}
      </div>
      <div>
        {isOpenModalDelete && (
          <ModalDelete
            isOpen={isOpenModalDelete}
            onClose={closeModalDelete}
            carId={carId}
            cars={cars}
            updateCars={updateCars}
            carModel={carModel}
            carYear={carYear}
            carVin={carVin}
          />
        )}
      </div>
      <select
        className={s.select}
        onChange={(event) => handleSelectChange(event, carId)}
        value={selected}
      >
        <option
          className={s.option}
          value=""
          /*  disabled */
          style={{ display: "none" }}
        >
          Actions
        </option>
        <option
          className={s.option}
          value="edit"
        >
          Edit
        </option>
        <option
          className={s.option}
          value="delete"
        >
          Delete
        </option>
      </select>
    </div>
  );
};
export default SelectComp;
