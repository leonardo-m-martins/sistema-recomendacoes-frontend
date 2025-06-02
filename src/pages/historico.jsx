import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../assets/logo2.png';
import lupa from '../assets/lupa.png';
import { Link, useNavigate } from 'react-router-dom';
import semCapaImagem from '../assets/sem-capa.jpg';
import { historico } from '../api/usuarioApi';
import HistoryIcon from '../components/HistoryIcon';
import StdHeader from '../components/StdHeader';

function Historico() {
  const navigate = useNavigate();
  const [resultados, setResultados] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [paginaAtual, setPaginaAtual] = useState(1);
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

  useEffect(() => {
    async function fetchHistorico() {
      if (usuario == null) return;
      try {
        historico(usuario.id).then(h => setResultados(h));
        setTotalPaginas(Math.ceil(resultados.length / 20));
        setPaginaAtual(1); // Começa na primeira página
      } catch (erro) {
        console.error('Erro ao buscar histórico:', erro);
      }
    }

    fetchHistorico();
  }, [usuario])

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
    const valor = parseInt(e.target.page.value);
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
          <h3>Histórico de leitura</h3>
          <div className="paginas-container">
            <button className="paginas-button" onClick={handleAnterior} disabled={paginaAtual === 1}>Anterior</button>

            <form onSubmit={handleSubmit} className="pagina-form">
              <label>
                Página
                <input
                  type="number"
                  name="page"
                  value={paginaAtual}
                  max={totalPaginas}
                  className="paginas-text-box"
                  onChange={(e) => setPaginaAtual(Number(e.target.value))}
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

export default Historico;
