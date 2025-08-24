import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import BookGrid from './BookGrid';
import { SmallBrownButton } from './SmallBrownButton';
import { PagesElement } from './PagesElement';
import { RotateLoader } from 'react-spinners';

export function RenderBooksGrid({genericBookGetterFunction, size = 40}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [inputPage, setInputPage] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getResponse() {
    const params = {
      page: currentPage - 1, // menor página no backend = 0, menor página no frontend = 1.
      size: size
    };
    return await genericBookGetterFunction(params);
    
  }

  function updateBooks() {
    setIsLoading(true);
    getResponse().then((response) => {
      setTotalPages(response.page.totalPages);
      setBooks(response.content);
      setIsLoading(false);
    })
  }


  useEffect(() => {
    updateBooks();
  }, [currentPage])

  function handlePrev() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    setInputPage('');
  }

  function handleNext() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    setInputPage('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const value = parseInt(inputPage, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
      console.log(currentPage);
    }
    setInputPage('');
  }

  return (
    <>
      <PagesElement paginaAtual={currentPage} totalPaginas={totalPages} onPrev={handlePrev} onNext={handleNext} onSubmit={handleSubmit} inputPagina={inputPage} setInputPagina={setInputPage}/>
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center">
          <RotateLoader color="gray" />
        </div>
      ) : (<BookGrid livros={books} />)}
    </>
  );
}
