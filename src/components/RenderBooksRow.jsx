import { FaRegCommentDots } from "react-icons/fa";
import { BookRow } from "./BookRow";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";

export function RenderBooksRow({genericBookGetterFunction, params}) {
  const [isLoading, setIsLoading] = useState(true);
  const [livros, setLivros] = useState(null);
  
  useEffect(() => {
    async function useFunction(params) {
      if (params != null) return await genericBookGetterFunction(params);
      else return await genericBookGetterFunction();
    }
    useFunction(params).then((tempLivros) => {
      setLivros(tempLivros);
      setIsLoading(false);
    });

  }, []);

    if (isLoading) {
      return (
        <BookRow />
      );
    }

    if (!livros || livros.length === 0) {
      return (
      <BookRow>
        <FaRegCommentDots className="self-center" size={32} color="gray"/>
        <p className="text-gray-500 self-center">Oops, parece que você não avaliou nenhum livro ainda! Avalie seus livros favoritos para experimentar nossas recomendações personalizadas!</p>
      </BookRow>
      );
    }

    return (
      <BookRow>
        {livros.map((livro) => (
          <BookCard key={livro.id} livro={livro} />
        ))}
      </BookRow>
    );
}