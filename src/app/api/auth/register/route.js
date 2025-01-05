import bcrypt from "bcrypt";
import User from "@/models/userSchema";
import { connectToDB } from "@/lib/connect";

export const POST = async (req) => {
  try {
    const { email, username, password } = await req.json();

    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      provider: "credentials",
    });

    await newUser.save();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error Adding user:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
};
