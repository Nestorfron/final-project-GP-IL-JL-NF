import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { store, actions } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      setLoading(true);
      actions.search(query).finally(() => {
        setLoading(false);
        setShowResults(true);
      });
    } else {
      setShowResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setLoading(true);
      actions.search(searchQuery).finally(() => {
        setLoading(false);
        setShowResults(true);
      });
    }
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchQuery("");
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      ref={searchRef}
      className="d-flex position-relative"
      role="search"
      onSubmit={handleSearchSubmit}
    >
      <input
        className="form-control me-2"
        type="text"
        placeholder="Buscar"
        value={searchQuery}
        onChange={handleSearchChange}
        aria-label="Buscar"
      />
      {showResults && (
        <ul className="search-results list-group position-absolute">
          {loading ? (
            <li className="list-group-item">Cargando...</li>
          ) : (
            <>
              {store.searchResults.beers?.length > 0 && (
                <>
                  <h5 className="text-black text-start mx-2">Cervezas</h5>
                  {store.searchResults.beers.map((beer) => (
                    <li key={beer.id} className="list-group-item text-center">
                      <Link to={`/beer/${beer.id}`} className="dropdown-item">
                        <i className="fa-solid fa-magnifying-glass fa-xs-custom"></i>{" "}
                        {beer.name}
                      </Link>
                    </li>
                  ))}
                </>
              )}
              {store.searchResults.breweries?.length > 0 && (
                <>
                  <h5 className="text-black text-start mx-2">Cervecerías</h5>
                  {store.searchResults.breweries.map((brewery) => (
                    <li
                      key={brewery.id}
                      className="list-group-item text-center"
                    >
                      <Link
                        to={`/brewery/${brewery.id}`}
                        className="dropdown-item"
                      >
                        <i className="fa-solid fa-magnifying-glass fa-xs-custom"></i>{" "}
                        {brewery.name}
                      </Link>
                    </li>
                  ))}
                </>
              )}
              {store.searchResults.beers?.length === 0 &&
                store.searchResults.breweries?.length === 0 && (
                  <li className="list-group-item">
                    No se encontraron resultados
                  </li>
                )}
            </>
          )}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
