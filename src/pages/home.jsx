import React, { useEffect, useState } from 'react';
// import './style.css';
import { recomendacaoConteudo, recomendacaoColaborativa, livrosEmAlta } from '../api/recomendacaoApi';
import { Link, useNavigate } from 'react-router-dom';
import './exemplo.json';
import { getLivros } from '../api/livroApi';
import StdHeader from '../components/StdHeader';
import { PeachMain } from '../components/PeachMain';
import { getTopLivros } from '../api/avaliacaoApi';
import { RenderBooksRow } from '../components/RenderBooksRow';
import { RenderBooksGrid } from '../components/RenderBooksGrid';

function Home() {
    const navigate = useNavigate();

  const [recomendados, setRecomendados] = useState([]);
  const [emAlta, setEmAlta] = useState([]);
  const [topLivros, setTopLivros] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioRaw = localStorage.getItem('usuario');

    if (!token || !usuarioRaw) {
      navigate('/login');
      return;
    }

    const usuarioParsed = JSON.parse(usuarioRaw);
    setUsuario(usuarioParsed);

    document.body.classList.add("home");
    return () => document.body.classList.remove("home"); // limpa ao sair
  }, []);

  useEffect(() => {
    if (usuario == null) return;
    // Carregar os dados do backend
    const carregarDados = async () => {
      const conteudo = await recomendacaoConteudo(usuario.id);
      const colaborativa = await recomendacaoColaborativa(usuario.id);
      const top = await getTopLivros({size: 10});

      setRecomendados(conteudo);
      setEmAlta(colaborativa);
      setTopLivros(top.content);
    };

    carregarDados();
  }, [usuario])

  return (
    <div>
      <StdHeader usuario={usuario}/>

      <PeachMain>
        <h2 className="text-center p-24 text-xl">Descubra sua próxima leitura favorita com nossas recomendações inteligentes.</h2>

        <div>
          <h3 className="py-4 font-bold text-xl">Livros mais populares</h3>
          <RenderBooksRow livros={topLivros} />
        </div>

        <div>
          <h3 className="py-4 font-bold text-xl">Recomendados para você</h3>
          <RenderBooksRow livros={recomendados} />
        </div>

        <section>
          <h3 className="py-4 font-bold text-xl">Recomendado por outros usuários</h3>
          <RenderBooksRow livros={emAlta} />
        </section>

        <section className="row">
          <h3 className="text-xl py-4 font-bold">Catálogo</h3>
          <RenderBooksGrid genericBookGetterFunction={getLivros} size={40} />
        </section>
      </PeachMain>
    </div>
  );
}

export default Home;
