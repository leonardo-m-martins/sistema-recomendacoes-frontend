import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../assets/logo2.png';
import lupa from '../assets/lupa.png'
import { recomendacaoConteudo, recomendacaoColaborativa } from '../api/recomendacaoApi';
import { Link, useNavigate } from 'react-router-dom';
import './exemplo.json';
import semCapaImagem from '../assets/sem-capa.jpg';
import { getLivros } from '../api/livroApi';

function Home() {
    const navigate = useNavigate();

  const [recomendados, setRecomendados] = useState([]);
  const [emAlta, setEmAlta] = useState([]);
  var [catalogo, setCatalogo] = useState([]);
  const [totalPaginas, setPageNumber] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioRaw = localStorage.getItem('usuario');

    if (!token || !usuarioRaw) {
      navigate('/login');
      return;
    }

    const usuario = JSON.parse(usuarioRaw);

    setPaginaAtual(1);

    // Carregar os dados do backend
    const carregarDados = async () => {
      try {
        const conteudo = await recomendacaoConteudo(usuario.id);
        const colaborativa = await recomendacaoConteudo(usuario.id);

        setRecomendados(conteudo);
        setEmAlta(colaborativa);
      } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
      }
    };

    carregarDados();

    document.body.classList.add("home");
    return () => document.body.classList.remove("home"); // limpa ao sair
  }, []);

  useEffect(() => {
    const carregarCatalogo = async () => {
      try {
        const params = {
          page: paginaAtual - 1, // ajuste de index (página 1 no frontend = 0 no backend)
          size: 40,
        };

        const page = await getLivros(params);
        setCatalogo(page.content);
        setPageNumber(page.totalPages);
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);
      }
    };

    if (paginaAtual >= 1) {
      carregarCatalogo();
    }
  }, [paginaAtual]);


  const renderLivros = (livros) => (
    <div className="scroll-row">
      {livros.map((livro) => (
        <Link to={`/livro/${livro.id}`} className="link-livro">
          <div className="book-wrapper" key={livro.id}>
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

  const renderLivrosCatalogo = (livros) => (
      <div className="livros-grid">
          {livros.slice(0, 20).map((livro) => (
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

  return (
    <div className="home">
      <header>
        <div className="header-container">
          <Link to={"/"}>
            <div className="logo-header">
              <img src={logo} alt="Logo RecLivros" className="logo-header" />
            </div>
          </Link>
          <form className="search-box" action="/buscar" method="GET">
            <input type="text" name="q" placeholder="Buscar..." />
            <button type="submit"><img src={lupa} className="lupa" /></button>
          </form>
        </div>
      </header>

      <main>
        <section className="hero">
          <h2>Destaque do dia</h2>
          <p>"Descubra sua próxima leitura favorita com nossas recomendações inteligentes."</p>
        </section>

        <section className="row">
          <h3>Recomendados para você</h3>
          {renderLivros(recomendados)}
        </section>

        <section className="row">
          <h3>Recomendado por outros usuários:</h3>
          {renderLivros(emAlta)}
        </section>

        <section className="row">
          <h3>Catálogo</h3>
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
          {renderLivrosCatalogo(catalogo)}
        </section>
      </main>
    </div>
  );
}

export default Home;
