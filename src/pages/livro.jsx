import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLivroById } from "../api/livroApi";
import { avaliar, deleteAvaliacao, getAvaliacaoByUsuarioAndLivro, patchAvaliacao } from "../api/avaliacaoApi";
import StarRating from "../components/StarRating";
import semCapaImagem from '../assets/sem-capa.jpg';
import StdHeader from "../components/StdHeader";
import { PeachMain } from "../components/PeachMain";
import { BookDetailsContainer } from "../components/BookDetailsContainer";
import { BookTag } from "../components/BookTag";
import { RenderTags } from "../components/RenderTags";

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
        usuarioId: usuario.id,
        livroId: livro.id
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

      <PeachMain>
      {/* Container pai pode ser flex se quiser lado a lado depois */}
      <div className="md:items-start gap-4">
        {/* Capa centralizada no mobile, alinhada à esquerda em telas maiores */}
        <div className="w-full md:w-1/6 max-w-xs mx-auto md:mx-0">
          <img
            src={livro.capa || semCapaImagem}
            alt={livro.titulo}
            className="w-full h-auto object-contain rounded shadow"
          />
        </div>

        {/* Título alinhado à esquerda */}
        <div className="my-4">
          <h1 className="text-3xl font-extrabold text-left">Título: {livro.titulo}</h1>
        </div>
      </div>


        <div className="flex items-center gap-4">
          <p className="text-2xl">Avalie este livro:</p>
          <StarRating value={avaliacao.nota} onChange={handleAvaliacao} />
        </div>

        <br />
          
        <BookDetailsContainer>
          <div className="livro-detalhes">
              <div className="my-2">
                <p className="mr-2 inline-flex">Gênero(s): </p>
                <RenderTags list={livro.generos} baseUrl={"/genero/"} />
              </div>
              <div className="items-center">
                <p className="mr-2 inline-flex">Autor(es): </p> 
                <RenderTags list={livro.autores} baseUrl={"/autor/"} />
              </div>
              <p>Ano de publicação: {livro.ano || "N/A"}</p>
              <p>Descrição: {livro.descricao || "N/A"}</p>

          </div>
        </BookDetailsContainer>
      </PeachMain>
    </div>
  );
}

export default Livro;
