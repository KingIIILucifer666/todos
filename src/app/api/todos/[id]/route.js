import Todo from "@/models/todosSchema";
import { connectToDB } from "@/lib/connect";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const id = await params.id;

    const todo = await Todo.findById(id).populate("creator");
    if (!todo) return new Response("Todos Not Found", { status: 404 });

    return new Response(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { task, completed, updated_at } = await request.json();

  try {
    await connectToDB();

    const id = await params.id;
    console.log("Todo ID: ", id);

    const existingtodo = await Todo.findById(id);

    if (!existingtodo) {
      return new Response("Todo not found", { status: 404 });
    }

    existingtodo.task = task;
    existingtodo.completed = completed;
    existingtodo.updated_at = updated_at;

    await existingtodo.save();

    return new Response("Successfully updated the Todos", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Todos", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const id = await params.id;
    console.log("Todo ID: ", id);

    await Todo.findByIdAndDelete(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting todo: ", error);
    return new Response("Error deleting todo", { status: 500 });
  }
};
