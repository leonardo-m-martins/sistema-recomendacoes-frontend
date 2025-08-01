import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StdHeader from '../components/StdHeader';
import { PeachMain } from '../components/PeachMain';
import { RenderBooksGrid } from '../components/RenderBooksGrid';
import { VscLoading } from 'react-icons/vsc';
import { getAutor, getLivrosByAutor } from '../api/apiAutor';

function Autor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [autor, setAutor] = useState(null);

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
        const autorResponse = await getAutor(id);
        setAutor(autorResponse);
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

  const getLivrosUsingAutor = useCallback(async (params) => {
    return await getLivrosByAutor(id, params);
  }, [id]);

  if (loading || !autor) {
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
      <StdHeader usuario={usuario} />

      <PeachMain>
        <section className="row">
          <h3 className="text-2xl font-bold">Autor: {autor.nome}</h3>
          <RenderBooksGrid genericBookGetterFunction={getLivrosUsingAutor} />
        </section>
      </PeachMain>
    </div>
  );
}

export default Autor;
