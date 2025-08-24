import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHistorico } from '../api/usuarioApi';
import StdHeader from '../components/StdHeader';
import { PeachMain } from '../components/PeachMain';
import { RenderBooksGrid } from '../components/RenderBooksGrid';
import StdH2 from '../components/StdH2';

function Historico() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioRaw = localStorage.getItem('usuario');

    if (!token || !usuarioRaw) {
      navigate('/login');
      return;
    }

    setUsuario(JSON.parse(usuarioRaw));

    document.body.classList.add("home");
    return () => document.body.classList.remove("home");
  }, []);

  const fetchHistoricoUsingUserConst = useCallback((params) => {
    return getHistorico(usuario.id, params);
  }, [usuario]);

  return (
    <div>
      <PeachMain usuario={usuario}>
        <section className="row">
          <StdH2>Histórico de leitura</StdH2>

          {usuario && (
            <RenderBooksGrid genericBookGetterFunction={fetchHistoricoUsingUserConst} />
          )}
        </section>
      </PeachMain>
    </div>
  );
}

export default Historico;
