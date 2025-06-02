import React from "react";
import { Link } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import "./HistoryIcon.css";

const HistoryIcon = ({ usuarioId }) => {
  if (!usuarioId) return null;

  return (
    <Link
      to={`/usuario/historico/${usuarioId}`}
      className="history-icon"
      title="Ver histórico"
    >
      <FaHistory />
    </Link>
  );
};

export default HistoryIcon;
