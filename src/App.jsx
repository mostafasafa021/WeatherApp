import { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import SearchField from "./components/SearchField";
import WeatherWidget from "./components/WeatherWidget";
import getCountriesData from "./services/countriesApi";
import ErrorWidget from "./components/ErrorWidget";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const selectedPlaceRef = useRef(null);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [isNoResults, setIsNoResults] = useState(false);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [weatherUnits, setWeatherUnits] = useState({
    tempUnit: "celsius",
    windUnit: "kmh",
    precipitationUnit: "mm",
  });

  console.log("Selected Place:", selectedPlace);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchResults[0]) return;
    selectedPlaceRef.current = searchResults[0];
    setSelectedPlace(searchResults[0]);
    setSearchResults([]);
    setSearchTerm("");
  };

  const handleClick = (id) => {
    const clickedCountry = searchResults.find((country) => country.id === id);
    selectedPlaceRef.current = clickedCountry;
    setSelectedPlace(clickedCountry);
    setSearchResults([]);
    setSearchTerm("");
  };

  useEffect(() => {
    if (selectedPlaceRef.current) return;
    getCountriesData("berlin")
      .then((data) => {
        if (selectedPlaceRef.current === null) {
          setSelectedPlace(data.results[0]);
        }
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [retryCount]);

  useEffect(() => {
    if (searchTerm.length < 2) return;
    setSearchResultsLoading(true);
    const controller = new AbortController();
    getCountriesData(searchTerm, controller.signal)
      .then((data) => {
        setIsError(false);
        if (!data.results?.length) {
          setIsNoResults(true);
          setSearchResults([]);
          setIsError(false);
          return;
        }
        setSearchResults(data.results);
        setIsNoResults(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(`Reqeust canceled`, err);
        } else {
          setIsError(true);
          console.log("Request Error", err);
        }
      })
      .finally(() => setSearchResultsLoading(false));

    return () => {
      setSearchResults([]);
      setIsNoResults(false);
      controller.abort();
    };
  }, [searchTerm, retryCount]);

  return (
    <div className="app bg-neutral-900">
      <main className="pt-10 px-5 md:px-10">
        <Header weatherUnits={weatherUnits} setWeatherUnits={setWeatherUnits} />

        {isError ? (
          <ErrorWidget setRetryCount={setRetryCount} setIsError={setIsError} />
        ) : (
          <>
            <h1 className="text-white text-6xl tracking-wider font-semibold page-title text-center my-15 font-bricolage-grotesque">
              How's the sky looking today?
            </h1>
            <SearchField
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              handleSubmit={handleSubmit}
              handleClick={handleClick}
              searchResultsLoading={searchResultsLoading}
              isNoResults={isNoResults}
            />
          </>
        )}
        <WeatherWidget
          selectedPlace={selectedPlace}
          weatherUnits={weatherUnits}
          isError={isError}
          setIsError={setIsError}
          retryCount={retryCount}
        />
      </main>
    </div>
  );
}

export default App;
