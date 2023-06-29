import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Container, Pagination, TextField, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

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
      alert("query");
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
        <Container
          sx={{ marginTop: 3 }}
          maxWidth="sm"
        >
          <TextField
            fullWidth
            label="search"
            value={searchWord}
            onChange={(event) => setSearchWord(event.target.value.trim())}
          />
          <Stack spacing={2}>
            {!!pageQty && (
              <Pagination
                count={pageQty}
                page={currentPageNumber}
                onChange={(_, pageNum) => setCurrentPageNumber(pageNum)}
                sx={{ marginY: 2, marginX: "auto" }}
              />
            )}
            {currentPageCars.length === 0 && <div>{searchResultsMessage}</div>}
            {currentPageCars.map((car) => (
              <span key={car.id}>{car.car}</span>
            ))}
          </Stack>
        </Container>
      )}
    </div>
  );
}

export default App;
