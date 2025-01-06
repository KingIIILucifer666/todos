"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkBox";

export default function EdittodoPage() {
  const router = useRouter();
  const { id } = useParams();
  const [todo, setTodo] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [completed, setCompleted] = useState(false);
  const todo_id = id;

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch(`/api/todos/${todo_id}`);
      const data = await response.json();
      setTodo(data || []);
      setTodoName(data.task || "");
      setCompleted(data.completed || false);

      console.log(data);
    };

    if (todo_id) {
      fetchTodo();
    }
  }, [todo_id]);

  const handleChange = () => {
    setCompleted((prevState) => !prevState);
  };

  const handleUpdateTodo = async () => {
    if (!todoName.trim()) return;

    try {
      const response = await axios.patch(`/api/todos/${todo_id}`, {
        task: todoName,
        completed: completed,
        updated_at: new Date().toISOString(),
      });
      if (response.status === 200) {
        console.log("Todo updated: ", response);
        router.push("/dashboard");
      } else {
        console.error("Failed to update todo", response);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  console.log(completed);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 gap-5">
      <div className="max-w-4xl w-full bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Edit Todo
        </h2>

        <div className="flex items-center space-x-2 mb-6">
          <Input
            type="text"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            placeholder="Edit Todo"
            className="w-full"
          />
          <Button
            onClick={handleUpdateTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Update
          </Button>
        </div>

        <div className="inline-flex items-center gap-3">
          <Checkbox checked={completed} onChange={handleChange} />
          <span className="text-xl">{completed ? "completed" : "pending"}</span>
        </div>

        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-400 hover:bg-gray-500 text-white flex items-center"
        >
          <ArrowLeft className="mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
