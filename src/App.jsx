import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import SearchField from "./components/SearchField";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [isNoResults, setIsNoResults] = useState(false)

  console.log(selectedCountry);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchResults[0]) return;

    console.log(searchResults[0])
  };

  const handleClick = (id) => {
    const clickedCountry = searchResults.find((country) => country.id === id);
    setSelectedCountry(clickedCountry);
  };

  useEffect(() => {
    if (searchTerm === "" || searchTerm.length < 2) return;
    setSearchResultsLoading(true)
    axios
      .get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=4`,
      )
      .then((response) => {
        if (!response.data.results) {
          setIsNoResults(true)
          setSearchResults([])
          return;
        }
        setSearchResults(response.data.results)
        setIsNoResults(false)
      })
      .finally(() => setSearchResultsLoading(false));

    return () => {
      setSearchResults([]);
    };
  }, [searchTerm]);

  return (
    <div className="app bg-neutral-900">
      <main className="pt-10 px-5 md:px-10">
        <Header />
        <h1 className="text-white text-6xl tracking-wider font-semibold page-title text-center my-15 font-bricolage-grotesque">
          How's the sky looking today?
        </h1>
        <SearchField
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          handleClick={handleClick}
          searchResults={searchResults}
          handleSubmit={handleSubmit}
          searchResultsLoading={searchResultsLoading}
          isNoResults={isNoResults}
        />
      </main>
    </div>
  );
}

export default App;
