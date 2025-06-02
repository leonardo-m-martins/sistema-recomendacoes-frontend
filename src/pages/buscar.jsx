import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../assets/logo2.png';
import lupa from '../assets/lupa.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import semCapaImagem from '../assets/sem-capa.jpg';
import page from './catalogo-exemplo.json';
import { searchLivros } from '../api/livroApi';
import HistoryIcon from '../components/HistoryIcon';
import StdHeader from '../components/StdHeader';

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

    setPageNumber(Math.ceil(resultados.length / 20));
    setPaginaAtual(1);
  }, [termoBusca]);

  const renderResultados = (livros) => (
    <div className="livros-grid">
      {livros.map((livro) => (
        <Link to={`/livro/${livro.id}`} className="link-livro" key={livro.id}>
          <div className="book-wrapper">
            <div className="book-card">
              <img src={livro.capa || semCapaImagem} alt={livro.titulo} />
            </div>
            <div className="book-title">
              <p>{livro.titulo}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

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

  const livrosPaginados = resultados.slice((paginaAtual - 1) * 20, paginaAtual * 20);

  return (
    <div className="home">
      <StdHeader usuario={usuario}/>

      <main>
        <section className="row">
          <h3>Resultados para "{termoBusca}"</h3>
          <div className="paginas-container">
            <button className="paginas-button" onClick={handleAnterior} disabled={paginaAtual === 1}>Anterior</button>

            <form onSubmit={handleSubmit} className="pagina-form">
              <label>
                Página
                <input
                  type="number"
                  value={paginaAtual}
                  max={totalPaginas}
                  className="paginas-text-box"
                />
              </label>
              <span>de {totalPaginas}</span>
            </form>

            <button className="paginas-button" onClick={handleProxima} disabled={paginaAtual === totalPaginas}>Próxima</button>
          </div>

          {renderResultados(livrosPaginados)}
        </section>
      </main>
    </div>
  );
}

export default Buscar;
