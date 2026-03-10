export async function createTodo(data:any){

 const res = await fetch("/api/todos",{
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


export async function getAllTodo() {
  const res = await fetch("/api/todos", {
    method:"GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}