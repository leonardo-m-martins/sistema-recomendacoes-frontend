import { useState } from "react";
import { SmallBrownButton } from "./SmallBrownButton";

export function PagesElement({paginaAtual, totalPaginas, onPrev, onNext, onSubmit, size = 40}) {
  const [inputPagina, setInputPagina] = useState(paginaAtual);

    return (
      <div className="flex pb-4">
        <SmallBrownButton label="Anterior" onClick={onPrev} disabled={paginaAtual === 1}/>
        
        <SmallBrownButton label="Próxima" onClick={onNext} disabled={paginaAtual === totalPaginas} />
        
        <form onSubmit={onSubmit} className="pagina-form ml-auto inline-flex items-center justify-center">
            <label>
                Página  
                    <input
                      type="number"
                      value={inputPagina}
                      onChange={(e) => setInputPagina(e.target.value)}
                      placeholder={paginaAtual}
                      max={totalPaginas}
                      min="1"
                      className="bg-white rounded border border-gray-400 mx-2 p-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <span> de {totalPaginas}</span>
                  </label>
                  <SmallBrownButton label="Enviar" type="submit" />
                </form>
      </div>
    );
}