import Todo from "@/models/todosSchema";
import { connectToDB } from "@/lib/connect";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const id = params.id;
    console.log("Todo ID: ", id);

    const todos = await Todo.find({ creator: id }).populate("creator");

    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch Todos created by user ${error}`, {
      status: 500,
    });
  }
};
