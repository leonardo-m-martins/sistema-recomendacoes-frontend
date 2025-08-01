export function SmallBrownButton({label, onClick, type, disabled}) {
    return (
        <button 
            onClick={onClick} 
            type={type} 
            disabled={disabled}
            className="bg-amber-800 hover:bg-amber-900 disabled:bg-amber-800/50 disabled:cursor-not-allowed rounded w-auto text-white py-2 px-4 m-2 cursor-pointer inline-flex items-center justify-center"
        >
            {label}
        </button>
    )
}