import { TodoType } from "@/types/todo";
import { API_BASE } from "../api/config";
import { DELETE } from "../api/todos/[id]/route";

export async function createTodo(data:any){

 const res = await fetch(API_BASE,{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify(data)
 })
  if(!res.ok){
    throw new Error("Failed to create todo")
  }

 return res.json()
}
export async function updateTask(id:string,data:Partial<TodoType>){
  const res = await fetch(`${API_BASE}/${id}`,{
    method : "PUT",
     headers:{
      "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
  })
    if(!res.ok){
      throw new Error("Failed to update todo.")
    }

  return res.json()
}

export async function getAllTodo() {
    const userData = localStorage.getItem("user");

    let url = API_BASE;

    if (userData) {
      const user = JSON.parse(userData);

      if (user.role === "user") {
        url += `?userId=${user._id}`;
      }
    }

  const res = await fetch(url, {
    method:"GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}

export async function getTodoById(id : string) {
  try {
    const res = await fetch(`${API_BASE}/${id}`,{
      method : "GET",
      cache : "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch todo");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Service Error:", error);
    throw error;
  }
};
export async function deleteTask(id:string) {
  try{
    const res = await fetch(`${API_BASE}/${id}`,{
      method : "DELETE",
      cache : "no-cache",
    });
    if(!res.ok) {
      throw new Error("Failed to delete task.")
    }
    const data = await res.json();
    return data;

  } catch(error){
    console.log("Server Error :",error)
    throw error;
  }
}

