import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import searchIcon from "./assets/images/icon-search.svg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchResults[0]);
  };

  const handleClick = (id) => {
    const clickedCountry = searchResults.find((country) => country.id === id);
    console.log(clickedCountry);
  };

  useEffect(() => {
    if (searchTerm === "" || searchTerm.length < 2) return;
    axios
      .get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=4`,
      )
      .then((response) => {
        setSearchResults(response.data.results ?? []);
      });

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
        <form
          className="flex flex-col gap-3 md:flex-row"
          onSubmit={handleSubmit}
        >
          <div className="input-wrapper relative flex-1">
            <input
              type="text"
              className="text-white  bg-neutral-700 py-4 rounded-[12px] pl-15 pr-5 w-full placeholder:text-[#f1f1f4] placeholder:tracking-wide cursor-pointer focus:border-3 focus:border-neutral-900 focus:outline-white focus:outline-2 "
              placeholder="Search for a place..."
              aria-label="Search for a place"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src={searchIcon}
              alt=""
              className="absolute left-8 top-2/4 -translate-2/4 "
            />
            {searchResults.length > 0 && (
              <div className="w-full absolute bg-neutral-800 top-[130%] rounded-[10px] border-2 border-neutral-600">
                {
                  <ul className="py-3 px-4">
                    {searchResults.map((country) => (
                      <li
                        className="text-neutral-0 py-3 px-2 text-[1.2rem] focus:outline-0 focus:bg-neutral-700 focus:border-neutral-600 focus:border-2 rounded-[10px]"
                        tabIndex={0}
                        key={country.id}
                        onClick={() => handleClick(country.id)}
                      >{`${country.name}, ${country.admin1 ?? ""}, ${country.country}`}</li>
                    ))}
                  </ul>
                }
              </div>
            )}
          </div>
          <button className="text-white bg-blue-500 py-4 px-7 rounded-[12px]  focus:border-3 focus:border-neutral-900 focus:outline-blue-700 focus:outline-2 cursor-pointer hover:bg-blue-700 transition-colors">
            Search
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
