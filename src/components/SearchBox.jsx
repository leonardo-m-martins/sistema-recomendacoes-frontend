import { FaSearch } from "react-icons/fa";

export default function SearchBox() {


    return (
      <form className="items-center justify-center flex ml-auto max-w-md py-8 px-2 border-1 border-gray-600 bg-white/50 rounded-md" action="/buscar" method="GET">
        <input 
          className="bg-white border-1 border-gray-400 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md max-w-md h-10 p-4 mr-4" 
          type="text" 
          name="q" 
          placeholder="Buscar..." 
        />
        <button className="bg-amber-500 border-1 border-gray-400 hover:bg-amber-600 rounded-md cursor-pointer p-2 h-10 w-10" type="submit" title="Buscar no catálogo">
          <FaSearch size={24} color="black"/>
        </button>
      </form>
    );
}
