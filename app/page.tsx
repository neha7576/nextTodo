import Image from "next/image";
import Link from "next/link";

export default function IntroPage() {
  return (
     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600">
        <div className="text-center text-white max-w-xl px-5">
          <h1 className="text-4xl font-bold mb-6">My TODO APP</h1>
          <p className="text-lg mb-8"> Organize your tasks, stay productive and manage your daily goals easily.</p>
           
           <Link href="/home" className="border-white text-indigo-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 bg-white transition">
           Get Started
           </Link>
          </div>
       
    </div>
  );
}
