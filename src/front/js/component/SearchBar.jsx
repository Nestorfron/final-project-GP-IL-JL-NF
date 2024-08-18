import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { store, actions } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <form
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
      />
      {showResults && (
        <ul className="search-results list-group position-absolute">
          {loading ? (
            <li className="list-group-item">Cargando...</li>
          ) : (
            <>
              {store.searchResults.beers &&
                store.searchResults.beers.length > 0 && (
                  <>
                    <h5 className="text-black text-center">Cervezas</h5>
                    {store.searchResults.beers.map((beer) => (
                      <li key={beer.id} className="list-group-item">
                        <Link to={`/beer/${beer.id}`} className="dropdown-item">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i> {beer.name} 
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              {store.searchResults.breweries &&
                store.searchResults.breweries.length > 0 && (
                  <>
                    <h5 className="text-black text-center">Cervecerías</h5>
                    {store.searchResults.breweries.map((brewery) => (
                      <li key={brewery.id} className="list-group-item">
                        <Link
                          to={`/brewery/${brewery.id}`}
                          className="dropdown-item"
                        >
                         <i className="fa-solid fa-arrow-up-right-from-square"></i> {brewery.name} 
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              {store.searchResults.beers.length === 0 &&
                store.searchResults.breweries.length === 0 && (
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
