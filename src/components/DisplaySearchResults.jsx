import loadingIcon from "../assets/images/icon-loading.svg";

const DisplaySearchResults = ({
  searchResults,
  handleClick,
  searchResultsLoading,
  isNoResults,
}) => {
  if (searchResultsLoading) {
    return (
      <div className="w-full absolute top-[115%] md:top-[130%] rounded-[10px] bg-neutral-800 border-2 flex gap-4 items-center border-neutral-600 py-4 px-3 text-neutral-0 z-10">
        <img src={loadingIcon} alt="" className="loading" />
        <p className="text-[1.2rem]">Search in progress</p>
      </div>
    );
  }

  if (isNoResults) {
    return (
      <div className="w-full absolute top-[130%] md:top-[170%] text-neutral-0 text-[1.5rem] font-medium text-center tracking-wide z-10">
        No Search Results Found!
      </div>
    );
  }

  return (
    <>
      {searchResults.length > 0 && (
        <div className="w-full absolute bg-neutral-800 top-[115%] md:top-[130%] rounded-[10px] border-2 border-neutral-600 z-10">
          {
            <ul className="py-3 px-4">
              {searchResults.map((country) => (
                <button
                  className="text-neutral-0 py-3 px-2 text-[1.2rem] focus:outline-0 focus:bg-neutral-700 focus:border-neutral-600 focus:border-2 rounded-[10px] block w-full text-start"
                  key={country.id}
                  onClick={() => handleClick(country.id)}
                >{`${country.name}, ${country.admin1 ?? ""}, ${country.country}`}</button>
              ))}
            </ul>
          }
        </div>
      )}
    </>
  );
};

export default DisplaySearchResults;
