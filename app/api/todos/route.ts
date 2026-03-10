import { connectDB } from "@/lib/mongoDb";
import { Todo } from "@/models/todo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return NextResponse.json(todos);

  } catch (error) {
    
      console.log("GET ALL ERROR:", error); 
    return NextResponse.json(
      { message: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

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
      });

    return NextResponse.json(newTodo, { status: 201 });
  }catch(error){
    return NextResponse.json(
      { message: "Failed to create todos" },
      { status: 500 }
    );
  }
}