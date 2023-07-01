import ModalAdd from "../modals/modalAdd/ModalAdd";
import s from "./addCarButton.module.css";
import { useState } from "react";

const AddCarButton = () => {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const openModalAdd = () => {
    setIsOpenModalAdd(true);
  };
  const closeModalAdd = () => {
    setIsOpenModalAdd(false);
  };
  return (
    <div>
      <button onClick={openModalAdd}>Add car</button>
      <div>
        {isOpenModalAdd && (
          <ModalAdd
            isOpen={isOpenModalAdd}
            onClose={closeModalAdd}
          />
        )}
      </div>
    </div>
  );
};
export default AddCarButton;
