export function BigBrownButton({label, onClick, type}) {
    return (
        <button 
            onClick={onClick} 
            type={type} 
            className=" bg-amber-800 hover:bg-amber-900 rounded w-full text-white p-2 mr-auto ml-auto cursor-pointer flex items-center justify-center"
        >
            {label}
        </button>
    )
}