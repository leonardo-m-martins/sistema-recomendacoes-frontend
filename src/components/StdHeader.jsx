import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import SearchIcon from "./SearchIcon";
import HistoryIcon from "./HistoryIcon";
import LogoutIcon from "./LogoutIcon";

function StdHeader({ usuario, onClickSearch }) {

  return (
    <header>
      <div className="header-container h-20 p-1 flex items-center text-white bg-amber-800">
        <Link to={"/"} className="mr-4">
          <img src={logo} alt="Logo RecLivros" className="max-h-16" />
        </Link>

        <SearchIcon onClick={onClickSearch} />

        <HistoryIcon usuarioId={usuario?.id} />

        <LogoutIcon />
      </div>
    </header>
  );
}

export default StdHeader;
