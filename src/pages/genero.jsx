import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StdHeader from '../components/StdHeader';
import { PeachMain } from '../components/PeachMain';
import { RenderBooksGrid } from '../components/RenderBooksGrid';
import { getGenero, getGeneroLivros } from '../api/apiGenero';
import { VscLoading } from 'react-icons/vsc';
import StdH2 from '../components/StdH2';

function Genero() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [genero, setGenero] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      const token = localStorage.getItem('token');
      const usuarioRaw = localStorage.getItem('usuario');

      if (!token || !usuarioRaw) {
        navigate('/login');
        return;
      }

      setUsuario(JSON.parse(usuarioRaw));

      try {
        const generoResposta = await getGenero(id);
        setGenero(generoResposta);
      } catch (error) {
        console.error("Erro ao buscar gênero:", error);
        // poderia setar um estado de erro aqui
      }

      setLoading(false);
    }

    carregarDados();

    document.body.classList.add("home");
    return () => document.body.classList.remove("home");
  }, [id, navigate]);

  const getLivrosUsingGenero = useCallback(async (params) => {
    return await getGeneroLivros(id, params);
  }, [id]);

  if (loading || !genero) {
    return (
      <PeachMain>
        <div className="flex justify-center items-center py-10">
          <VscLoading className="animate-spin" size={64} />
        </div>
      </PeachMain>
    );
  }

  return (
    <div>

      <PeachMain usuario={usuario}>
        <section className="row">
          <StdH2>Gênero: {genero.nome}</StdH2>
          <RenderBooksGrid genericBookGetterFunction={getLivrosUsingGenero} />
        </section>
      </PeachMain>
    </div>
  );
}

export default Genero;
