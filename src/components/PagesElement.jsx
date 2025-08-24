import { useState } from "react";
import { SmallBrownButton } from "./SmallBrownButton";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaChevronUp } from "react-icons/fa6";
import { BiNavigation, BiSolidNavigation } from "react-icons/bi";

export function PagesElement({paginaAtual, totalPaginas, onPrev, onNext, onSubmit, inputPagina, setInputPagina}) {

    return (
      <div className="flex flex-wrap pb-4">
        <SmallBrownButton label={<GrPrevious />} onClick={onPrev} disabled={paginaAtual === 1}/>
        
        <SmallBrownButton label={<GrNext />} onClick={onNext} disabled={paginaAtual === totalPaginas} />
        
        <form onSubmit={onSubmit} className="ml-auto inline-flex items-center justify-center">
          <label>
            Página  
            <input
              type="number"
              value={inputPagina}
              onChange={(e) => setInputPagina(e.target.value)}
              placeholder={paginaAtual}
              max={totalPaginas}
              min="1"
              className="bg-white rounded border border-gray-400 mx-1.5 p-1.5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none [-moz-appearance:textfield]"
            />
            <span>de {totalPaginas}</span>
          </label>
          <SmallBrownButton label={<BiSolidNavigation />} type="submit" />
        </form>
      </div>
    );
}