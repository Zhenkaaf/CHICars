import s from "./paginationComp.module.css";
import { Pagination, Stack } from "@mui/material";
import { useEffect } from "react";

const PaginationComp = ({
  pageQty,
  currentPageNumber,
  setCurrentPageNumber,
  currentPageCars,
  searchResultsMessage,
  cars,
  searchWord,
  setPageQty,
  setCurrentPageCars,
  setSearchResultsMessage,
}) => {
  const searchProperties = ["car", "car_model", "car_model_year", "car_vin"];
  useEffect(() => {
    /* const filteredCars = searchWord
      ? cars.filter((car) =>
          car.car.toLowerCase().includes(searchWord.toLowerCase())
        )
      : cars; */

    /*  const filteredCars = searchWord
      ? cars.filter((car) =>
          Object.values(car).some((value) =>
            String(value).toLowerCase().includes(searchWord.toLowerCase())
          )
        )
      : cars; */

    const filteredCars = searchWord
      ? cars.filter((car) =>
          searchProperties.some((property) =>
            String(car[property])
              .toLowerCase()
              .includes(searchWord.toLowerCase())
          )
        )
      : cars;

    setPageQty(
      filteredCars.length > 0 ? Math.ceil(filteredCars.length / 100) : 0
    );

    if (currentPageNumber > Math.ceil(filteredCars.length / 100)) {
      setCurrentPageNumber(1);
    }

    const start = (currentPageNumber - 1) * 100;
    const end = currentPageNumber * 100;
    setCurrentPageCars(filteredCars.slice(start, end));

    setSearchResultsMessage(
      filteredCars.length === 0 && searchWord !== ""
        ? "Nothing was found according to your request."
        : ""
    );
  }, [currentPageNumber, cars, searchWord]);

  return (
    <div className={s.pagination}>
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={currentPageNumber}
            onChange={(_, pageNum) => setCurrentPageNumber(pageNum)}
            sx={{ marginY: 2, marginX: "auto" }}
          />
        )}
        {currentPageCars.length === 0 && (
          <div className={s.search__message}>{searchResultsMessage}</div>
        )}
      </Stack>
    </div>
  );
};
export default PaginationComp;
