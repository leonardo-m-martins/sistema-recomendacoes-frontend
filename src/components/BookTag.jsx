
export function BookTag({name, href}) {
    return (
        <a className="bg-custom-peach rounded-xl border border-[#e5c9b6] p-1 m-0.5 inline-block hover:bg-[#e5c9b6] text-sm" href={href}>{name}</a>
    )
}