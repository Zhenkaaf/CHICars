import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Container, Pagination, TextField, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarsList from "./components/carslist/CarsList";
import ModalAdd from "./components/modals/modalAdd/ModalAdd";

function App() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  const [currentPageCars, setCurrentPageCars] = useState([]);
  const [error, setError] = useState(null);
  const [searchResultsMessage, setSearchResultsMessage] = useState(null);

  async function fetchCars() {
    try {
      const res = await axios.get("https://myfakeapi.com/api/cars/");
      localStorage.setItem("cars", JSON.stringify(res.data.cars));
      setCars(res.data.cars);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError("An error occurred while loading data. Please try again later.");
      setIsLoading(false);
    }
  }
  const addNewCar = (newCar) => {
    // Добавьте новый элемент в массив cars
    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
  };

  //ModalDelete
  const updateCars = (updatedCars) => {
    setCars(updatedCars);
  };

  const handleStorageChange = (event) => {
    if (event.key === "cars") {
      const updatedCars = JSON.parse(event.newValue) || [];
      setCars(updatedCars);
    }
  };

  useEffect(() => {
    const storage = localStorage.getItem("cars");
    if (!storage) {
      fetchCars();
    } else {
      setCars(JSON.parse(storage));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const filteredCars = searchWord
      ? cars.filter((car) =>
          car.car.toLowerCase().includes(searchWord.toLowerCase())
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

  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const openModalAdd = () => {
    setIsOpenModalAdd(true);
  };
  const closeModalAdd = () => {
    setIsOpenModalAdd(false);
  };

  //Modal Edit
  const updateCarData = (carId, newData) => {
    const updatedCars = cars.map((car) => {
      if (car.id === carId) {
        return { ...car, ...newData };
      }
      return car;
    });
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
  };

  // Добавляем слушателя события storage при монтировании компонента
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    // Очищаем слушателя события storage при размонтировании компонента
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-container">
          <CircularProgress />
          <DirectionsCarIcon className="car-icon" />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="container">
          <div className="header">
            <div className="header__body">
              <div className="search">
                <TextField
                  fullWidth
                  label="search"
                  value={searchWord}
                  onChange={(event) => setSearchWord(event.target.value.trim())}
                />
              </div>
              <div className="pagination">
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
                    <div className="search__message">
                      {searchResultsMessage}
                    </div>
                  )}
                </Stack>
              </div>
              <div className="addButton">
                <button onClick={openModalAdd}>Add car</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        {isOpenModalAdd && (
          <ModalAdd
            isOpen={isOpenModalAdd}
            onClose={closeModalAdd}
            addNewCar={addNewCar}
          />
        )}
      </div>

      <CarsList
        currentPageCars={currentPageCars}
        updateCarData={updateCarData}
        cars={cars}
        updateCars={updateCars}
      />
    </div>
  );
}

export default App;
