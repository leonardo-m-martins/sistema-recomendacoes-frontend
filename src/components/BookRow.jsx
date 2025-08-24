import { useState, useRef, useEffect } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { RotateLoader } from "react-spinners";

export function BookRow({ children }) {
  const items = (children == null) ? null : Array.isArray(children) ? children : [children];
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [rowLocation, setRowLocation] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const itemWidthRem = 11;


  const updateItemsPerView = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = 176; // largura fixa aproximada de cada card
      setItemsPerView(Math.max(1, Math.floor(containerWidth / itemWidth)));
    }
  };

  // calcula quantos cabem na tela
  useEffect(() => {

    updateItemsPerView();

    window.addEventListener('resize', updateItemsPerView);

    // Remova o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', updateItemsPerView);
    };
  }, []);

  useEffect(() => {
    updateItemsPerView();
  }, [items]);

  useEffect(() => {
    setRowLocation(index * itemWidthRem);
  }, [index])

  const next = () => {
    setIndex(Math.min(index + itemsPerView, items.length - itemsPerView));
  };

  const prev = () => {
    setIndex(Math.max(index - itemsPerView, 0));
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4 min-w-full min-h-60 bg-white/20 rounded-2xl border border-gray-400">
      {/* Botão Esquerda */}
      <button
        onClick={prev}
        disabled={index === 0}
        className="bg-white/70 p-2 rounded-full shadow disabled:opacity-30"
      >
        <GrPrevious />
      </button>

      
      {items != null ? ( 
        <div ref={containerRef} className="overflow-hidden flex-1">
          <div className={`flex gap-4 transition-transform duration-500 ease-in-out`} style={{ transform: `translateX(-${rowLocation}rem)` }}>
            {items.map((child, i) => (
              <div key={i} className="">
                {child}
              </div>
            ))}
          </div>
        </div> ) : (
        <div className="mx-auto">
          <RotateLoader color="gray"/>
        </div>
        )
      }

      {/* Botão Direita */}
      <button
        onClick={next}
        disabled={items==null || index >= items.length - itemsPerView}
        className="bg-white/70 p-2 rounded-full shadow disabled:opacity-30"
      >
        <GrNext />
      </button>
    </div>
  );
}
