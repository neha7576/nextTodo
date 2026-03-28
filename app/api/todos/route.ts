import { connectDB } from "@/lib/mongoDb";
import { Todo } from "@/models/todo";
import { NextResponse } from "next/server";
import "@/models/users"; // ✅
import mongoose from "mongoose";

export async function GET(req:any){
  try{
      await connectDB();
      
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId");

      let query: any = {};

      if (userId) {
        query.userId = userId;
      }
   

      const todos = await Todo.find(query).populate("userId", "email role");
      const formattedTodos = todos.map((todo) => ({
        _id: todo._id,
        title: todo.title,
        description: todo.description,
        user: todo.userId, // populated data
      }));

    return NextResponse.json(formattedTodos);

 

  } catch (error){
    return NextResponse.json(
      {message : "Failed to fetch todo."},
      {status : 500}
    );
  }
}

// export async function GET() {
//   try {
//     await connectDB();
//     //const todos = await Todo.find().sort({ createdAt: -1 });

//     const todos = await Todo.find().populate("userId", "email role ");
// // return NextResponse.json(todos);
// // if want to change response key or formate response 
//     const formattedTodos = todos.map((todo) => ({
//       _id: todo._id,
//       title: todo.title,
//       description: todo.description,
//       user: todo.userId, // 
//     }));

//     return NextResponse.json(formattedTodos);
   

//   } catch (error) {
    
//       console.log("GET ALL ERROR:", error); 
//     return NextResponse.json(
//       { message: "Failed to fetch todos" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req:Request){
  try{
      await connectDB();
      const body = await req.json();
      if(!body.title || !body.description){
        return NextResponse.json(
          { message: "Title and Description required" },
          { status: 400 }
        );
      }
      const newTodo = await Todo.create({
        title: body.title,
        description: body.description,
        userId: body.userId
      });

    return NextResponse.json(newTodo, { status: 201 });
  }catch(error){
    return NextResponse.json(
      { message: "Failed to create todos" },
      { status: 500 }
    );
  }
}
