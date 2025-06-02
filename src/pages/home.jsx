import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../assets/logo2.png';
import lupa from '../assets/lupa.png'
import { recomendacaoConteudo, recomendacaoColaborativa } from '../api/recomendacaoApi';
import { Link, useNavigate } from 'react-router-dom';
import './exemplo.json';
import semCapaImagem from '../assets/sem-capa.jpg';
import { getLivros } from '../api/livroApi';
import HistoryIcon from '../components/HistoryIcon';
import LogoutIcon from '../components/LogoutIcon';
import StdHeader from '../components/StdHeader';

function Home() {
    const navigate = useNavigate();

  const [recomendados, setRecomendados] = useState([]);
  const [emAlta, setEmAlta] = useState([]);
  var [catalogo, setCatalogo] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [inputPagina, setInputPagina] = useState(paginaAtual);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioRaw = localStorage.getItem('usuario');

    if (!token || !usuarioRaw) {
      navigate('/login');
      return;
    }

    const usuarioParsed = JSON.parse(usuarioRaw);
    setUsuario(usuarioParsed);

    setPaginaAtual(1);

    document.body.classList.add("home");
    return () => document.body.classList.remove("home"); // limpa ao sair
  }, []);

  useEffect(() => {
    if (usuario == null) return;
    // Carregar os dados do backend
    const carregarDados = async () => {
      const conteudo = await recomendacaoConteudo(usuario.id);
      const colaborativa = await recomendacaoColaborativa(usuario.id);

      setRecomendados(conteudo);
      setEmAlta(colaborativa);
    };

    carregarDados();
  }, [usuario])

  useEffect(() => {
    const carregarCatalogo = async () => {
      try {
        const params = {
          page: paginaAtual - 1, // ajuste de index (página 1 no frontend = 0 no backend)
          size: 40,
          sortBy: "id"
        };

        const resultado = await getLivros(params);
        setCatalogo(resultado.content);
        setTotalPaginas(resultado.page.totalPages);
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
    const valor = parseInt(inputPagina, 10);
    if (!isNaN(valor) && valor >= 1 && valor <= totalPaginas) {
      setPaginaAtual(valor);
    }
  };

  return (
    <div className="home">
      <StdHeader usuario={usuario}/>

      <main>
        <section className="hero">
          <p>Descubra sua próxima leitura favorita com nossas recomendações inteligentes.</p>
        </section>

        <section className="row">
          <h3>Recomendados para você</h3>
          {renderLivros(recomendados)}
        </section>

        <section className="row">
          <h3>Recomendado por outros usuários</h3>
          {renderLivros(emAlta)}
        </section>

        <section className="row">
          <h3>Catálogo</h3>
          <div className="paginas-container">
            <button className="paginas-button" onClick={handleAnterior} disabled={paginaAtual === 1}>Anterior</button>

            <button className="paginas-button" onClick={handleProxima} disabled={paginaAtual === totalPaginas}>Próxima</button>

            <form onSubmit={handleSubmit} className="pagina-form">
              <label>
                Página  
                <input
                  type="number"
                  value={inputPagina}
                  onChange={(e) => setInputPagina(e.target.value)}
                  placeholder={paginaAtual}
                  max={totalPaginas}
                  min="1"
                  className="paginas-text-box"
                />
                <span> de {totalPaginas}</span>
              </label>
              <button type="submit" className="paginas-button">Enviar</button>
            </form>
          </div>
          {renderLivrosCatalogo(catalogo)}
        </section>
      </main>
    </div>
  );
}

export default Home;
