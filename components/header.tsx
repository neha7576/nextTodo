"use client";
import { ArrowLeft, Bell, Menu } from "lucide-react"
import { useRouter } from "next/navigation";

type headerProps = {
    showDrawer? : boolean,
    showNoti?:boolean,
    title:string,
     onMenuClick?: () => void;
}

export default function Header( {showDrawer = false,showNoti = false, title,onMenuClick}:headerProps){
      const router = useRouter();
    return(
        <header className="w-full flex items-center justify-between px-3 py-3  shadow bg-indigo-500">
            {showDrawer ?(
<div>
             <Menu size={24} onClick={onMenuClick} className="text-white"/>
            </div>
            ) : (<div> <ArrowLeft onClick={() => router.back()} size={24} className="text-white"/></div>)             
            }
            
          
            <h2 className="font-semibold text-white">{title}</h2>
            <div>
            {showNoti? (
 <Bell size={24} className="text-white"/>
            )  : (<div className="w-6"></div>)
                
                   
               
            }
             </div>
           
        </header>
    )
}