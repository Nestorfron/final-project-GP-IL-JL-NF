import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const SearchBar = () => {
  const { actions, store } = useContext(Context);
  const [query, setQuery] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    await actions.searchBeers(query);
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
      {store.beers.length === 0 && query && <p>No results found</p>}
    </form>
  );
};

export default SearchBar;
