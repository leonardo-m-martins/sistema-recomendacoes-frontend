import { FaRegCommentDots } from "react-icons/fa";
import { BookRow } from "./BookRow";
import BookCard from "./BookCard";

export function RenderBooksRow({livros}) {
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