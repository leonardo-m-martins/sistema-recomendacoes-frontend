import React from "react";
import { Link } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
// import "./HistoryIcon.css";

const HistoryIcon = ({ usuarioId }) => {
  if (!usuarioId) return null;

  return (
    <Link
      to={`/usuario/historico/${usuarioId}`}
      className="cursor-pointer text-amber-500 hover:text-amber-600 mx-4"
      title="Ver histórico"
    >
      <FaHistory size={32} />
    </Link>
  );
};

export default HistoryIcon;
