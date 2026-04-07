import { X } from "lucide-react"
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";

type DrawerProps = {
    isOpen :boolean,
    onClose : () => void
}

export default function AdminDrawer({isOpen,onClose} : DrawerProps){
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        setShowModal(false);
        router.replace("/login");
    };
    const handleLogoutButton = () => {
        setShowModal(true)
          onClose(); 

    }
    return(
        <>
        {isOpen &&  (
            <div className="fixed inset-0 bg-black/40" onClick={onClose} />
        )}
        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                
                {/* White Box */}
                <div className="bg-white rounded-2xl p-6 w-75 text-center space-y-4 shadow-xl">
                
                <h2 className="text-lg font-semibold">
                    Logout
                </h2>

                <p className="text-gray-600 text-sm">
                    Are you sure you want to logout?
                </p>

                <div className="flex justify-center gap-4 pt-2">
                    
                    {/* Yes Button */}
                    <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                    Yes
                    </button>

                    {/* No Button */}
                    <button 
                    onClick={() => setShowModal(false)}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                    No
                    </button>

                </div>

                </div>

            </div>
            )}
            
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-semibold">Hello,Admin</h2>
                <X onClick={onClose}  className="cursor-pointer" />
                </div>

                <nav className="p-4 space-y-3">
                    <Link href="/about" className="block">About</Link>
                    <Link href="/tasks" className="block">Tasks</Link>
                   <Link href="/tasks" className="block">Users</Link>

                </nav>
                <button 
                onClick={() => handleLogoutButton()}
                className="text-red-500 ml-4"
                >
                Logout
                </button>
            </div>
        </>
    )

}