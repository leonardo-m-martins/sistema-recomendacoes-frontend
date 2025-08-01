import { Link } from 'react-router-dom';
import semCapaImagem from '../assets/sem-capa.jpg';

const BookCard = ({livro}) => {
    return (
        <Link to={`/livro/${livro.id}`} className="items-center hover:text-red-500" key={livro.id}>
          <div className="pb-4 h-60 w-40">
              <img className="rounded-xl shadow-xl size-full bg-black/10" src={livro.capa || semCapaImagem} alt={livro.titulo} />
          </div>
          <div className="text-center justify-center line-clamp-2">
              <p>{livro.titulo}</p>
          </div>
        </Link>
    );
}

export default BookCard;