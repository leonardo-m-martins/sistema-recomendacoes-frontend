import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

function SearchIcon({ onClick }) {
  const [clicked, setClicked] = useState(false);

  const SearchIconOrX = (clicked) => {
    if (clicked) return (<FaX size={32} />);
    else return (<FaSearch size={32}/>);
  }

  const handleClick = () => {
    const newClicked = !clicked;
    setClicked(newClicked); // Alterna o estado de clicked
    onClick(newClicked); // Chama a função onClick que vem como prop (se existir)
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer self-center text-amber-500 hover:text-amber-600 selection:text-amber-600 ml-auto"
      title="Buscar"
    >
      {SearchIconOrX(clicked)}
    </button>
  );
}

export default SearchIcon;
