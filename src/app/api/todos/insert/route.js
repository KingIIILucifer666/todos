import Todo from "@/models/todosSchema";
import { connectToDB } from "@/lib/connect";

export const POST = async (request) => {
  const { creator, task, completed } = await request.json();

  try {
    await connectToDB();
    const newtodo = new Todo({
      creator,
      task,
      completed,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await newtodo.save();
    return new Response(JSON.stringify(newtodo), { status: 201 });
  } catch (error) {
    return new Response(`Failed to create a new Todo ${error}`, {
      status: 500,
    });
  }
};
