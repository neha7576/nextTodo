"use client";
import Drawer from "@/components/drawer";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { getAllTodo } from "../services/taskService";




export default function HomePage(){
      const [open, setOpen] = useState(false);
      const [todos, setTodos] = useState([]);

        useEffect(() => {
            fetchTodos();
            }, []);
    
            const fetchTodos = async () => {
            try {
                const data = await getAllTodo();
                setTodos(data);
            } catch (error) {
                console.log(error);
            }
            };

  
    return(
        <div className=" min-h-screen w-full flex flex-col bg-gray-100">
            <div className="fixed w-full flex">
                   <Header showDrawer showNoti  title= "Home" onMenuClick={() => setOpen(true)} />
            </div>
         
            <Drawer isOpen={open} onClose={() => setOpen(false)} />
            <main className="flex flex-col h-screen p-4 mt-10">
                <div className=" bg-linear-to-br from-purple-500 via-indigo-500 to bg-pink-800 text-white p-6 rounded-2xl shadow-lg  w-full">
                    <h3 className="text-white font-bold">Today's Tasks</h3>
                    <p className="text-white font-thin text-sm pt-2 pb-2">Here is all our tasks list. we can add update and delete tasks. This can help us to to our daily task without forget them.</p>
                    <div className="flex flex-row">
                        <p className="flex-1 text-white font-bold">Total Tasks :</p>
                        <p className="text-white font-bold">20</p>
                    </div>

                </div>
                <div className="flex pt-4 items-center">
                     <p className="flex-1 text-indigo-500 text-xl font-bold">Tasks</p>
                      <p className=" text-indigo-500 text-sm ">
                       <a href="/tasks">See All</a> </p>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 mt-2 indica">
                    {todos.map((task:any) => (
                        <div 
                        key={task._id}
                        className="bg-white shadow-md rounded-xl p-4"
                        >
                        <p className="text-lg font-semibold">
                            {task.title}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                            {task.description}
                        </p>
                        </div>
                    ))}

                    </div>
            </main>
        </div>
    )
}