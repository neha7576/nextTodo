"use client";
export const dynamic = "force-dynamic";
import { createTodo, getTodoById, updateTask } from "@/app/services/taskService";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";

export default function AddTaskPage(){
    const [title,setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [loading,setLoading] = useState(false)
    const router = useRouter()
    const [user, setUser] = useState<any>(null);

    const searchParams = useSearchParams();
    const [id, setId] = useState<string | null>(null);
    //const id = searchParams.get("id");

    useEffect(() => {
  const taskId = searchParams.get("id");
  setId(taskId);
}, [searchParams]);

 
  

    useEffect(()=>{
         if (typeof window === "undefined") return;
          const userData = localStorage.getItem("user");
          
       
            if (!userData) {
               
                console.log("No user found");
                return;
            }else{
               // alert(userData)
            }
    const user = JSON.parse(userData);
    setUser(user);
          if (id) {
          setLoading(true)

            getTodoById(id)
            .then((data) => {
                  setLoading(false)
                setTitle(data.title);
                setDescription(data.description);
            })
            .catch((err) => {
                console.log(err);
            })
           
        }
        
          
    },[id])

  

    const handleSubmit = async (e:any) =>{
        e.preventDefault();
         if (!title.trim()) {
            alert("Title is required");
            return;
        }
        if (!description.trim()) {
            alert("Description is required");
            return;
        }
        setLoading(true)
        try{
            if(id){
                await updateTask(id,{title,description})
            }else{
                await createTodo({title,description,userId :user._id})
                alert("Task Added")
            }
            setTitle("")
            setDescription("")
            router.back()

        }catch(error){
            console.log(error)
            alert(error)
        }
        setLoading(false)
    };

    return(
        <>
          <div className="min-h-screen w-full flex flex-col bg-gray-100">
            <div className="fixed top-0 left-0 w-full">
                <Header showDrawer={false} showNoti={false} title={id?"Update Task":"Add New Task"} />
            </div>
            <div className="min-h-screen bg-gray-300 p-4">
                <h1 className="font-bold mb-6 text-2xl">Add New Task</h1>
            {loading && <Loader />}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Title :</label>
                         <input
                            type="text"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            className="w-full border p-2 rounded-lg"
                            placeholder="Enter task title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            className="w-full border p-2 rounded-lg"
                            placeholder="Enter task description"
                        />
                        </div>
                        <div className="w-full flex justify-center items-center ">
                             <button
                                type="submit"
                                className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
                                >{id ? "Update Task" : "Add Task"}
                                
                            </button>
       
                        </div>
                       
                </form>

            </div>
        </div>
          
        </>
    )
}