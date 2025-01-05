import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/models/userSchema";
import { connectToDB } from "@/lib/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectToDB();

  const { email, password } = await req.json();

  try {
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields must be filled" },
        { status: 404 }
      );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 400 }
      );
    }

    const token = createToken(user);

    return NextResponse.json(
      { message: "Login successful!", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
