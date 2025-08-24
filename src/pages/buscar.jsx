import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { searchLivros } from '../api/livroApi';
import { PeachMain } from '../components/PeachMain';
import { RenderBooksGrid } from '../components/RenderBooksGrid';
import StdH2 from '../components/StdH2';

function Buscar() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const termoBusca = queryParams.get('q') || '';

  const [resultados, setResultados] = useState([]);
  const [totalPaginas, setPageNumber] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [usuario, setUsuario] = useState([]);

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

  const getLivrosByQuery = useCallback(async (params) => {
    params["q"] = termoBusca;
    return await searchLivros(params);
  }, [termoBusca]);

  return (
    <div>
      <PeachMain usuario={usuario}>
        { termoBusca && <section>
          <StdH2>Resultados para "{termoBusca}"</StdH2>

          <RenderBooksGrid genericBookGetterFunction={getLivrosByQuery} />
        </section>
        }
      </PeachMain>
    </div>
  );
}

export default Buscar;
