import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import searchIcon from "./assets/images/icon-search.svg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countriesData, setCountriesData] = useState(null);

  // useEffect(() => {
  //   if (searchTerm === "" || searchTerm.length < 2) return;
  //   axios
  //     .get(
  //       `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=4`,
  //     )
  //     .then((response) => setCountriesData(response.data.results));
  // }, [searchTerm]);
  return (
    <div className="app bg-neutral-900">
      <main className="pt-10 px-5 md:px-10">
        <Header />
        <h1 className="text-white text-6xl tracking-wider font-semibold page-title text-center my-15 font-bricolage-grotesque">
          How's the sky looking today?
        </h1>
        <form className="flex flex-col gap-3 md:flex-row">
          <div className="input-wrapper relative flex-1">
            <input
              type="text"
              className="text-white  bg-neutral-700 py-4 rounded-[12px] pl-15 pr-5 w-full placeholder:text-[#f1f1f4] placeholder:tracking-wide cursor-pointer focus:border-3 focus:border-neutral-900 focus:outline-white focus:outline-2 "
              placeholder="Search for a place..."
              aria-label="Search for a place"
            />
            <img
              src={searchIcon}
              alt=""
              className="absolute left-8 top-2/4 -translate-2/4 "
            />
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
