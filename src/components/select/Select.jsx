import s from "./select.module.css";

const Select = ({ carId }) => {
  const handleSelectChange = (event, carId) => {
    console.log(carId);
    const selectedAction = event.target.value;
    if (selectedAction === "edit") {
      // Выполнить действие 1
    } else if (selectedAction === "delete") {
      // Выполнить действие 2
    }
  };

  return (
    <select
      className={s.select}
      onChange={(event) => handleSelectChange(event, carId)}
    >
      <option
        className={s.option}
        value=""
      >
        Choose an action
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
  );
};
export default Select;
