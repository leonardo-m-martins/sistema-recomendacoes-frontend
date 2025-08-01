import BookCard from "./BookCard";

const BookGrid = ({livros}) => {
    return (
        <div className="grid grid-cols-[auto_auto_auto] md:grid-cols-10 gap-4">
          {livros.map((livro) => (
            <BookCard key={livro.id} livro={livro} />
          ))}
        </div>
    );
}

export default BookGrid;