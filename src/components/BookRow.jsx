export function BookRow({children}){
    return (
        <div className="flex flex-row overflow-x-auto p-4 gap-4 min-h-60 bg-white/20 rounded-2xl border border-gray-400 items-start justify-center">
            {children}
        </div>
    )
}