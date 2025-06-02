import React from "react";
import lupa from "../assets/lupa.png"; // ajuste o caminho se necessário
import "./SearchBox.css"; // ou onde estiver seu CSS

function SearchBox() {
  return (
    <form className="search-box" action="/buscar" method="GET">
      <input type="text" name="q" placeholder="Buscar..." />
      <button type="submit">
        <img src={lupa} alt="Buscar" className="lupa" />
      </button>
    </form>
  );
}

export default SearchBox;
