import { X } from "lucide-react"
import Link from "next/link"

type DrawerProps = {
    isOpen :boolean,
    onClose : () => void
}

export default function Drawer({isOpen,onClose} : DrawerProps){
    return(
        <>
        {isOpen && (
            <div className="fixed inset-0 bg-black/40" onClick={onClose} />
        )}
            
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-semibold">Hello,User</h2>
                <X onClick={onClose}  className="cursor-pointer" />
                </div>

                <nav className="p-4 space-y-3">
                    <Link href="/about" className="block">About</Link>
                    <Link href="/tasks" className="block">Tasks</Link>
                </nav>
            </div>
        </>
    )

}