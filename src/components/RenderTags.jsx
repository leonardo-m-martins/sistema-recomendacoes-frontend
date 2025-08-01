import { BookTag } from "./BookTag";

export const RenderTags = ({list, baseUrl}) => {
    if (list.length === 0) return "N/A";
    
    return (
        list.map((item) => (
            <BookTag key={item.id} name={item.nome} href={baseUrl + `${item.id}`} />
        ))
    );
}