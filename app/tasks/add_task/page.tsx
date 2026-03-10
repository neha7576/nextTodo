"use client";
import { createTodo } from "@/app/services/taskService";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function AddTaskPage(){
    const [title,setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e:any) =>{
        e.preventDefault();
  setLoading(true)

          try{

                await createTodo({
                title,
                description
                })

                alert("Task Added")

                setTitle("")
                setDescription("")
                   router.back()

            }catch(error){
                console.log(error)
                alert("Something went wrong")
            }

  setLoading(false)


        //  const res = await fetch("/api/todos",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body: JSON.stringify({
        //         title,
        //         description
        //     })
        //     })

        //     const data = await res.json()

        //     console.log(data)

        //     setTitle("")
        //     setDescription("")
    };

    return(
        <>
          <div className="min-h-screen w-full flex flex-col bg-gray-100">
                    
                        <div className="fixed top-0 left-0 w-full">
         <Header showDrawer={false} showNoti={false} title="Add New Task" />
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
                            >
                            Add Task
                        </button>
                        </div>
                       
                </form>

            </div>
                        </div>
          
        </>
    )
}