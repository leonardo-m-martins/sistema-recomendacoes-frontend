import { FaSearch } from "react-icons/fa";

function SearchBox() {
  return (
    <form className="items-center flex ml-auto mr-1" action="/buscar" method="GET">
      <input 
        className="bg-white placeholder-gray-400 text-black rounded-l-md h-10 p-4" 
        type="text" 
        name="q" 
        placeholder="Buscar..." 
      />
      <button className="bg-amber-500 hover:bg-amber-600 rounded-r-md cursor-pointer p-2 h-10 w-10" type="submit" title="Buscar no catálogo">
        <FaSearch size={24} color="black"/>
      </button>
    </form>
  );
}

export default SearchBox;
