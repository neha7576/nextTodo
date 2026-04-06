import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDb";
import { Todo } from "@/models/todo";


export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

//     const params = await context.params;
// const id = params.id;  // iski short form  niche h .. ye javascript ki object destructing h 
    const { id } = await context.params;  

    console.log("ID:", id);

    const todo = await Todo.findById(id);

    if (!todo) {
      return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json(
      { message: "Error fetching todo" },
      { status: 500 }
    );
  }
}



export async function PUT(
  request: Request,
  context : {params : Promise<{ id : string}>}
) {
  try {
    await connectDB();

    const body = await request.json();
    const {id} = await context.params;  // short form h javascript m object destructing
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ message: "Error updating todo" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context : {params : Promise<{ id : string}>}
   //{ params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const params = await context.params;
    const id =  params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting todo" }, { status: 500 });
  }
}