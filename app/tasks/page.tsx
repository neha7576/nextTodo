"use client";
import Header from "@/components/header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllTodo } from "../services/taskService";



export default function Tasks(){
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
        <>
          <div className="min-h-screen w-full flex flex-col bg-gray-100">
            
                <div className="fixed top-0 left-0 w-full">
                    <Header showDrawer={false} showNoti={false} title="Task" />
                </div>
               
                  <div className="flex-1 overflow-y-auto space-y-2 mt-15 indica">
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
              
                <div className="fixed bottom-0 left-0 w-full bg-white  p-2 flex justify-center">
                    {/* <button className="w-fit bg-indigo-500 text-white py-3 px-4 rounded-lg">
                        Add New Task</button> */}
                        <Link href="/tasks/add_task" className="w-fit bg-indigo-500 text-white py-3 px-4 rounded-lg"> Add New Task</Link>
                </div>
            </div>
        </>
    )
}
