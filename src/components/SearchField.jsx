import searchIcon from "../assets/images/icon-search.svg";
import DisplaySearchResults from "./DisplaySearchResults";

const SearchField = ({
  setSearchTerm,
  searchTerm,
  searchResults,
  handleClick,
  handleSubmit,
  searchResultsLoading,
  isNoResults,
}) => {
  return (
    <form className="flex flex-col gap-3 md:flex-row relative" onSubmit={handleSubmit}>
      <div className="input-wrapper relative flex-1">
        <input
          type="text"
          className="text-white bg-neutral-700 py-4 rounded-xl pl-15 pr-5 w-full placeholder:text-[#f1f1f4] placeholder:tracking-wide cursor-pointer focus:border-3 focus:border-neutral-900 focus:outline-white focus:outline-2"
          placeholder="Search for a place..."
          aria-label="Search for a place"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt=""
          className="absolute left-8 top-2/4 -translate-2/4"
        />
      </div>
      <DisplaySearchResults
        searchResults={searchResults}
        handleClick={handleClick}
        searchResultsLoading={searchResultsLoading}
        isNoResults={isNoResults}
      />
      <button className="text-white bg-blue-500 py-4 px-7 rounded-xl focus:border-3 focus:border-neutral-900 focus:outline-blue-700 focus:outline-2 cursor-pointer hover:bg-blue-700 transition-colors">
        Search
      </button>
    </form>
  );
};

export default SearchField;
