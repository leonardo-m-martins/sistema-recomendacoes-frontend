import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLivroById } from "../api/livroApi";
import logo from "../assets/logo2.png";
import lupa from "../assets/lupa.png";
import { avaliar, deleteAvaliacao, getAvaliacaoByUsuarioAndLivro, patchAvaliacao } from "../api/avaliacaoApi";
import StarRating from "../components/StarRating";
import semCapaImagem from '../assets/sem-capa.jpg';
import HistoryIcon from '../components/HistoryIcon';
import StdHeader from "../components/StdHeader";

function Livro() {
  const navigate = useNavigate();

  const { id } = useParams(); // captura o :id da URL
  const [livro, setLivro] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [avaliacao, setAvaliacao] = useState({ id: null, nota: 0 });;
  const [loading, setLoading] = useState(true);

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
        const dados = await getLivroById(id);
        setLivro(dados);
      } catch (erro) {
        console.error("Erro ao buscar livro:", erro);
      }
      setLoading(false);
    }

    buscarLivro();

    document.body.classList.add("home");
    return () => document.body.classList.remove("home");
  }, [id]);

  // Novo useEffect para buscar avaliação somente quando livro e usuario estiverem definidos
  useEffect(() => {
    if (!usuario || !livro) return; // espera os dois estarem definidos

    async function getAvalicao() {
      const params = {
        usuario_id: usuario.id,
        livro_id: livro.id
      }
      try {
        const a = await getAvaliacaoByUsuarioAndLivro(params);
        if (a != null) setAvaliacao(a);
      } catch (erro) {
        setAvaliacao(0);
      }
    }

    getAvalicao();
  }, [usuario, livro]);


  if (loading) return <p>Carregando livro...</p>;
  if (!livro) return <p>Livro não encontrado.</p>;

  const handleAvaliacao = (nota) => {
    const avaliacaoNova = {
        usuario_id: usuario.id,
        livro_id: livro.id,
        nota: nota
    }
    if (avaliacao.id == null) avaliar(avaliacaoNova).then(a => setAvaliacao(a));
    else if(avaliacao.nota != avaliacaoNova.nota) patchAvaliacao(avaliacao.id, {nota: nota}).then(a => setAvaliacao(a));
    else {
      deleteAvaliacao(avaliacao.id);
      setAvaliacao({id: null, nota: 0});
      alert("Livro removido do histórico.");
    }
  }

  return (
    <div className="home">
      <StdHeader usuario={usuario}/>

      <div className="capa-e-titulo">
        <img src={livro.capa || semCapaImagem} alt={livro.titulo} className="card-capa" />
        <h1>{livro.titulo}</h1>
      </div>

      <div>
        <p style={{paddingLeft: "2%", fontSize: "24px"}}>Avalie este livro:</p>
        <StarRating value={avaliacao.nota} onChange={handleAvaliacao} />
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
