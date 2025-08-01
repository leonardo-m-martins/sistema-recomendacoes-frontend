import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { searchLivros } from '../api/livroApi';
import StdHeader from '../components/StdHeader';
import { PeachMain } from '../components/PeachMain';
import BookGrid from '../components/BookGrid';
import BookCard from '../components/BookCard';
import { RenderBooksGrid } from '../components/RenderBooksGrid';

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

  useEffect(() => {
    // Simulação de busca filtrando localmente
    const params = {
        q: termoBusca
    }
      
    searchLivros(params).then(filtrados => {setResultados(filtrados)});
    console.log(resultados);

    setPageNumber(Math.ceil(resultados.length / 20));
    setPaginaAtual(1);
  }, [termoBusca]);

  const handleAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const handleProxima = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valor = parseInt(e.target.value);
    if (!isNaN(valor) && valor >= 1 && valor <= totalPaginas) {
      setPaginaAtual(valor);
    }
  };

  const getLivrosByQuery = useCallback(async (params) => {
    params["q"] = termoBusca;
    return await searchLivros(params);
  }, [termoBusca]);

  return (
    <div>
      <StdHeader usuario={usuario}/>

      <PeachMain>
        <section className="row">
          <h3>Resultados para "{termoBusca}"</h3>

          <RenderBooksGrid genericBookGetterFunction={getLivrosByQuery} />
        </section>
      </PeachMain>
    </div>
  );
}

export default Buscar;
