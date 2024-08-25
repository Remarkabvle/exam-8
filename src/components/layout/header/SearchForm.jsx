import React from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

const SearchForm = ({ searchValue, setSearchValue }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} action="">
      <button>
        <IoSearch />
      </button>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for products..."
        type="text"
      />
      {searchValue.trim() ? (
        <button onClick={() => setSearchValue("")}>
          <MdOutlineCancel />
        </button>
      ) : (
        <></>
      )}
    </form>
  );
};

export default SearchForm;
