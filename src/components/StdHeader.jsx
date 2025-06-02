import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import SearchBox from "./SearchBox";
import HistoryIcon from "./HistoryIcon";
import LogoutIcon from "./LogoutIcon";
import "./StdHeader.css"; // se quiser estilizações adicionais

function StdHeader({ usuario }) {
  return (
    <header>
      <div className="header-container">
        <Link to={"/"}>
          <div className="logo-header">
            <img src={logo} alt="Logo RecLivros" className="logo-header" />
          </div>
        </Link>

        <SearchBox />

        <HistoryIcon usuarioId={usuario?.id} />

        <LogoutIcon />
      </div>
    </header>
  );
}

export default StdHeader;
