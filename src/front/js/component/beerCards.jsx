import React from "react";
import "../../styles/beerCards.css";
import HazyIPA from "../../img/hazyipa.jpeg";

export const BeerCards = () => {
  return (
    <div className="cards-container container-fluid">
      <h1 className="beer-cards-title">Estilos:</h1>

      <div className="beer-card">
        <img src={HazyIPA} alt="Beer Image" className="beer-picture" />
        <h3 className="beer-name">Hazy IPA</h3>
        <h4 className="beer-brewery">Cerveceria Cuspide</h4>
        <p className="beer-style">Estilo BJCP: NEIPA</p>
        <p className="beer-IBUs">IBUs: 20</p>
        <p className="beer-abv">ABV: 8%</p>
        <button className="add-to-basket">Más Info</button>
      </div>
    </div>
  );
};
