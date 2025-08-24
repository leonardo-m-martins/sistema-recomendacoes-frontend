import { useState } from "react";
import StdHeader from "./StdHeader";
import SearchBox from "./SearchBox";

export function PeachMain({children, usuario}) {
    const [clickedSearch, setClickedSearch] = useState(false)
    const renderSearchBox = (clicked) => {
        if (clicked) return (<SearchBox />)
        else return;
    }

    return (
        <>
          <StdHeader usuario={usuario} onClickSearch={setClickedSearch} />
          <main className="min-h-screen flex-col items-center justify-center bg-custom-peach px-4 py-8 md:px-12">
            {renderSearchBox(clickedSearch)}
            {children}
          </main>
        </>

    )
}