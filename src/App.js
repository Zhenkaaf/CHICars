import { useEffect, useState } from "react";
import "./App.css";
import { fetchCars } from "./api/api";
import { TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarsList from "./components/carslist/CarsList";
import ModalAdd from "./components/modals/modalAdd/ModalAdd";
import PaginationComp from "./components/pagination/PaginationComp";

function App() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  const [currentPageCars, setCurrentPageCars] = useState([]);
  const [error, setError] = useState(null);
  const [searchResultsMessage, setSearchResultsMessage] = useState(null);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

  //fetchDataAPI
  async function fetchData() {
    try {
      const carsData = await fetchCars();
      setCars(carsData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  //LocalStorageEventListener
  const handleStorageChange = (event) => {
    if (event.key === "cars") {
      const updatedCars = JSON.parse(event.newValue) || [];
      setCars(updatedCars);
    }
  };

  //UpdateLocalStorageState
  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    const storage = localStorage.getItem("cars");
    if (!storage) {
      fetchData();
    } else {
      setCars(JSON.parse(storage));
      setIsLoading(false);
    }

    // AddLocalStorageEventListener
    window.addEventListener("storage", handleStorageChange);
    // ClearLocalStorageEventListener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  //Modal Add Car
  const openModalAdd = () => {
    setIsOpenModalAdd(true);
  };
  const closeModalAdd = () => {
    setIsOpenModalAdd(false);
  };
  const addNewCar = (newCar) => {
    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
  };

  //Modal Edit Car
  const updateCarData = (carId, newData) => {
    const updatedCars = cars.map((car) => {
      if (car.id === carId) {
        return { ...car, ...newData };
      }
      return car;
    });
    setCars(updatedCars);
  };

  //Modal Delete Car
  const updateCars = (updatedCars) => {
    setCars(updatedCars);
  };

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-container">
          <CircularProgress />
          <DirectionsCarIcon className="car-icon" />
        </div>
      ) : error ? (
        <p className="error__message">Error: {error}</p>
      ) : (
        <div>
          <div className="container">
            <div className="header">
              <div className="header__body">
                <div className="search">
                  <TextField
                    fullWidth
                    label="search"
                    value={searchWord}
                    onChange={(event) =>
                      setSearchWord(event.target.value.trim())
                    }
                  />
                </div>
                <PaginationComp
                  pageQty={pageQty}
                  currentPageNumber={currentPageNumber}
                  setCurrentPageNumber={setCurrentPageNumber}
                  currentPageCars={currentPageCars}
                  searchResultsMessage={searchResultsMessage}
                  cars={cars}
                  searchWord={searchWord}
                  setPageQty={setPageQty}
                  setCurrentPageCars={setCurrentPageCars}
                  setSearchResultsMessage={setSearchResultsMessage}
                />
                <div className="addButton">
                  <button onClick={openModalAdd}>Add car</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <CarsList
              currentPageCars={currentPageCars}
              updateCarData={updateCarData}
              cars={cars}
              updateCars={updateCars}
            />
          </div>
        </div>
      )}

      {isOpenModalAdd && (
        <ModalAdd
          isOpen={isOpenModalAdd}
          onClose={closeModalAdd}
          addNewCar={addNewCar}
          cars={cars}
        />
      )}
    </div>
  );
}

export default App;
