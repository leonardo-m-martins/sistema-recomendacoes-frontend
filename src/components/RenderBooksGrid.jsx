import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import BookGrid from './BookGrid';
import { SmallBrownButton } from './SmallBrownButton';

export function RenderBooksGrid({genericBookGetterFunction, size = 40}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [inputPage, setInputPage] = useState('');
  const [books, setBooks] = useState([]);

  async function updateBooks() {
    const params = {
      page: currentPage - 1, // menor página no backend = 0, menor página no frontend = 1.
      size: size
    };
    const response = await genericBookGetterFunction(params);
    setTotalPages(response.page.totalPages);
    setBooks(response.content);
  }

  useEffect(() => {
    updateBooks();
  }, [currentPage])

  function handlePrev() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function handleNext() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const value = parseInt(inputPage, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  }

  return (
    <>
      <div className="flex pb-4">
        <SmallBrownButton label="Anterior" onClick={handlePrev} disabled={currentPage === 1} />
        <SmallBrownButton label="Próxima" onClick={handleNext} disabled={currentPage === totalPages} />

        <form onSubmit={handleSubmit} className="pagina-form ml-auto inline-flex items-center justify-center">
          <label>
            Página  
            <input
              type="number"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              placeholder={currentPage}
              max={totalPages}
              min="1"
              className="bg-white rounded border border-gray-400 mx-2 p-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <span> de {totalPages}</span>
          </label>
          <SmallBrownButton label="Enviar" type="submit" />
        </form>
      </div>
      <BookGrid livros={books} />
    </>
  );
}
