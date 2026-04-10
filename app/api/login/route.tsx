import { connectDB } from "@/lib/mongoDb";
import users from "@/models/users";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req:Request){
  try{
      await connectDB();
    const { email, password } = await req.json();
    const user = await users.findOne({ email });
    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      });
    }
    if (user.password !== password) {
      return Response.json({
        success: false,
        message: "Wrong password",
      });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    // return Response.json({
    //   success: true,
    //   user: {
    //     email: user.email,
    //     role: user.role,
    //     _id: user._id,
    //   },
      
    // });
    return Response.json({
      success: true,
      token, 
      user: {
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    });
    

    
  }catch(error){
    return NextResponse.json(
      { message: "Failed to login." },
      { status: 500 }
    );
  }
}