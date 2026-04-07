"use client";
import { useEffect, useState } from "react";
import { loginUser } from "../services/authService";
import Link from "next/link";
import Loader from "@/components/loader";
import Router, { useRouter } from "next/navigation";


export default function LoginPage(){
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState("");
    const [password,setpassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter()

    useEffect(() => {
        let isLoggedIn = null;

if (typeof window !== "undefined") {
  isLoggedIn = localStorage.getItem("isLoggedIn");
}

        if (isLoggedIn === "true") {
            router.replace("/home");
        }
        }, []);

        const handleSubmit = async (e:any) =>{
            e.preventDefault();
            if (!email.trim()) {
                alert("Please enter email.");
                return;
                }
                if (!password.trim()) {
                alert("Please enter password.");
                return;
            }
            setLoading(true)
            try{
               const data =  await loginUser(email,password)
                if (data.success) {
                    setError("");
                    setEmail("")
                    setpassword("")
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("user", JSON.stringify(data.user));
                   
                    router.push("/home");
                }else{
                    setError(data.message);
                }
                
            }catch(error){
                console.log(error)
                alert("Something went wrong")
            }
            setLoading(false)
        };
        return(
            <>
            <div className="min-h-screen flex items-center justify-center bg-purple-800">        
                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 items-center justify-center">
                        {loading && <Loader />}                   
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <input 
                        type="password"
                        placeholder="Password"
                        onChange={(e)=>setpassword(e.target.value)}
                        className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-purple-400"
                        />  
                        <button className="block mx-auto  bg-purple-800 text-white p-2 rounded hover:bg-purple-600">
                            Login
                        </button> 

                    </form>
                    <p className="w-full flex text-end justify-end ">
                        <Link href="" className="text-purple-800 hover:underline text-sm">Forget Password</Link>
                    </p>
                
                </div>

            </div>

                      
             
            </>
        )
}