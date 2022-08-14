const SearchResultCard = ({ searchResult, style }) => {
  return (
    <option
      className={`w-full cursor-pointer border border-t-0 p-3 text-[#333] outline-0 hover:bg-indigo-200 ${style}`}
      id={searchResult.id}
    >{`${searchResult.name}, ${searchResult.adminDivision1.name}, ${searchResult.country.id}`}</option>
  );
};

export default SearchResultCard;
