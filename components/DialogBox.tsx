type Props = {
    isOpen : boolean,
    onClose : ()=> void;
    onConfirm : () => void;
    title?: string
}

export default function CustomDialog({isOpen,onClose,onConfirm,title}:Props){
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 " onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-semibold mb-4 text-center">
                    {title}
                </h2>
                <div className="flex justify-end gap-3">
                     <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-500 text-white"
                    >
                        Delete
                    </button>

                </div>
            </div>

        </div>
    )


}