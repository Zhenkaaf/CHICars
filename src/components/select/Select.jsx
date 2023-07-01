import { useState } from "react";
import ModalDelete from "../modals/modalDelete/ModalDelete";
import s from "./select.module.css";
import ModalEdit from "../modals/modalEdit/ModalEdit";

const Select = ({ carId }) => {
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
          />
        )}
      </div>
      <div>
        {isOpenModalDelete && (
          <ModalDelete
            isOpen={isOpenModalDelete}
            onClose={closeModalDelete}
            carId={carId}
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
export default Select;
