"use client";
import Header from "@/components/header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteTask, getAllTodo } from "../services/taskService";
import NoData from "@/components/noDataFound";
import {ChevronRight, Edit, Pencil, Trash } from "lucide-react";

import { TodoType } from "@/types/todo";
import { useRouter } from "next/navigation";
import CustomDialog from "@/components/DialogBox";




export default function Tasks(){
    const [todos, setTodos] = useState<TodoType[]>([]);
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        fetchTodos();
        }, []);

    const  handleEdit = (todo : TodoType) => {
            router.push(`/tasks/add_task?id=${todo._id}`);
      };
    const handleDelete = (id: string) => {
        setSelectedId(id);
        setShowModal(true);
    };
    const confirmDelete = () => {
        if (selectedId) {
         deleteTodo();
        }
        setShowModal(false);
    };
    const deleteTodo = async () => {
          if (!selectedId) return;
        try{
           
           // if(selectedId != null){
                const data = await deleteTask(selectedId);
                 fetchTodos();
                 setTodos(prev => prev.filter(todo => todo._id !== selectedId));
                 setShowModal(false);
           // }
           
            
        }catch (error) {
            console.log(error);
        }
    }

    const fetchTodos = async () => {
        try {
         //const user = JSON.parse(localStorage.getItem("user") || "{}");
        // const userData = localStorage.getItem("user");

              if (typeof window === "undefined") return; // ✅ important

    const userData = localStorage.getItem("user");

    if (!userData) return;

         if (!userData) {
            console.log("No user found");
            return;
            }

            // const user = JSON.parse(userData);

            // let url = "/api/todo";

            // if (user?.role !== "admin") {
            // url = `/api/todo?userId=${user._id}`;
            // }

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
                    <Header showDrawer={false} showNoti={false} title="Tasks" />
                </div>
                    {todos.length === 0 ? (
                        <div className="text-center mt-10 text-gray-500">
                            <NoData />
                        </div>
                     ) : (
                       
                        <div className="mt-15 flex flex-col gap-4 m-6">
                             <CustomDialog
                                isOpen={showModal}
                                onClose={() => setShowModal(false)}
                                onConfirm={confirmDelete}
                                title="Delete this todo?"
                            />
                               {todos.map((task:any) => (
                                    <div 
                                    key={task._id}
                                    className="bg-white shadow-md rounded-xl p-4 flex justify-between"
                                    >
                                        <div className="mr-4">
                                            <p className="text-lg font-semibold">
                                                 {task.title}
                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {task.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                        <button onClick={()=>handleEdit(task)}> 
                                            <Pencil size={20} className="text-blue-600"/>
                                        </button>
                                        
                                        <ChevronRight size={20} className="text-blue-600"/>
                                        <button onClick={()=>handleDelete(task._id)}>
                                             <Trash size={20} className="text-red-600" />
                                        </button>
                                           
                                        </div>
                                  
                                    </div>
                                ))}
                        </div>
                    )}
                 

              
                <div className="fixed bottom-0 left-0 w-full bg-white  p-2 flex justify-center">
                        <Link href="/tasks/add_task" className="w-fit bg-indigo-500 text-white py-3 px-4 rounded-lg"> Add New Task</Link>
                </div>
            </div>
        </>
    )
}
