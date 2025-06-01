import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLivroById } from "../api/livroApi";
import logo from "../assets/logo2.png";
import lupa from "../assets/lupa.png";
import { avaliar, getAvaliacaoByUsuarioAndLivro } from "../api/avaliacaoApi";
import StarRating from "../components/StarRating";
import semCapaImagem from '../assets/sem-capa.jpg';

function Livro() {
  const navigate = useNavigate();

  const { id } = useParams(); // captura o :id da URL
  const [livro, setLivro] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [avaliacao, setAvaliacao] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulação de fetch dos dados com base no ID
  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioRaw = localStorage.getItem('usuario');

    if (!token || !usuarioRaw) {
      navigate('/login');
      return;
    }

    setUsuario(JSON.parse(usuarioRaw));

    async function buscarLivro() {
      setLoading(true);
      try {
        // Substitua por sua lógica real de fetch:
        const dados = await getLivroById(id);
        setLivro(dados);
      } catch (erro) {
        console.error("Erro ao buscar livro:", erro);
      }
      setLoading(false);
    }

    buscarLivro();

    async function getAvalicao() {
      const params = {
        usuario_id: usuario.id,
        livro_id: livro.id
      }
      getAvaliacaoByUsuarioAndLivro(params).then(a => setAvaliacao(a.nota));
    }

    getAvalicao();

    document.body.classList.add("home");
    return () => document.body.classList.remove("home"); // limpa ao sair
  }, [id]);

  useEffect(() => {
    // Eu coloco alguma coisa aqui????
  }, [avaliacao]);

  if (loading) return <p>Carregando livro...</p>;
  if (!livro) return <p>Livro não encontrado.</p>;

  const handleAvaliacao = (nota) => {
    const avaliacao = {
        usuario_id: usuario.id,
        livro_id: livro.id,
        nota: nota
    }
    avaliar(avaliacao).then(a => setAvaliacao(a.nota));
  }

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

      <div className="capa-e-titulo">
        <img src={livro.capa || semCapaImagem} alt={livro.titulo} className="card-capa" />
        <h1>{livro.titulo}</h1>
      </div>

      <div>
        <p style={{paddingLeft: "2%", fontSize: "24px"}}>Avalie este livro:</p>
        <StarRating value={avaliacao} onChange={handleAvaliacao} />
      </div>
        
      <div className="livro-detalhes-wrapper">
        <div className="livro-detalhes">
            <div className="tag-list">
            {livro.generos.map((g) => (
                <a key={g.id} href={`/genero/${g.id}`} className="tag">
                {g.nome}
                </a>
            ))}
            </div>
            <p className="detalhe-label">Autor(es): {livro.autores.map(a => a.nome).join(", ")}</p>
            <p className="detalhe-label">Ano de publicação: {livro.ano}</p>
            <p className="detalhe-label">Descrição: {livro.descricao}</p>

        </div>
      </div>
      
    </div>
  );
}

export default Livro;
