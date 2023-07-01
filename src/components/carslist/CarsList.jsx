import Select from "../select/Select";
import s from "./carsList.module.css";

const CarsList = ({ currentPageCars, updateCarData, cars, updateCars }) => {
  return (
    <div className={s.table__container}>
      <div
        className={`${s.table} ${s.table__sticky_head} ${s.table__sticky_foot} ${s.table__theme_default} ${s.table__striped_rows}`}
      >
        <div className={s.table__head}>
          <div className={s.table__row}>
            <div className={s.table__cell}>Company</div>
            <div className={s.table__cell}>Model</div>
            <div className={s.table__cell}>VIN</div>
            <div className={s.table__cell}>Color</div>
            <div className={s.table__cell}>Year</div>
            <div className={s.table__cell}>Price</div>
            <div className={s.table__cell}>Availability</div>
            <div className={s.table__cell}>Actions</div>
          </div>
        </div>
        <div className={s.table__body}>
          {currentPageCars.map((car) => (
            <div
              className={s.table__row}
              key={car.id}
              id={car.id}
            >
              <div className={s.table__cell}>{car.car}</div>
              <div className={s.table__cell}>{car.car_model}</div>
              <div className={s.table__cell}>{car.car_vin}</div>
              <div className={s.table__cell}>{car.car_color}</div>
              <div className={s.table__cell}>{car.car_model_year}</div>
              <div className={s.table__cell}>{car.price}</div>
              <div className={s.table__cell}>
                {car.availability ? "Available" : "Not Available"}
              </div>
              <div className={s.table__cell}>
                <Select
                  carId={car.id}
                  updateCarData={updateCarData}
                  cars={cars}
                  updateCars={updateCars}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CarsList;
