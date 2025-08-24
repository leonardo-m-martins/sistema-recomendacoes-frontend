import BookCard from "./BookCard";

const BookGrid = ({livros}) => {

    return (
        <div className="flex flex-wrap justify-center gap-4">
          {livros.map((livro) => (
            <BookCard key={livro.id} livro={livro} />
          ))}
        </div>
    );
}

export default BookGrid;