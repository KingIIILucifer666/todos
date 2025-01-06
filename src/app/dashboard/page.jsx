"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = session.user.id;

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`/api/user/${userId}/todos`);
      const data = await response.json();

      setTodos(data);

      // Stop loading if there are no todos
      setLoading(data.length === 0 ? false : true);
    };

    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  console.log("New Todo: ", newTodo);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        const newTodoData = {
          creator: userId,
          task: newTodo,
          completed: false,
        };

        const response = await axios.post(`/api/todos/insert`, newTodoData);

        setTodos([...todos, response.data]);
        setNewTodo("");
      } catch (error) {
        console.error("Failed to add todo", error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      if (id) {
        const response = await axios.delete(`/api/todos/${id}`);
        if (response.status === 200) {
          setTodos(todos.filter((todo) => todo._id !== id));
          setLoading(false);
          console.log("Todo deleted!");
        } else {
          return console.error("Error: ", response);
        }
      }
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  const handleEditTodo = (todoId) => {
    router.push(`/dashboard/${todoId}`);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 gap-5">
      <div className="max-w-4xl w-full bg-white rounded-lg p-6 flex justify-between items-center">
        <div className="text-lg font-semibold uppercase">To Do App</div>
        <Button
          onClick={handleLogout}
          className="bg-red-400/20 text-red-500 hover:bg-red-400/30 shadow-none"
        >
          <LogOut /> Logout
        </Button>
      </div>
      <div className="max-w-4xl w-full bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Dashboard
        </h2>

        <div className="flex items-center space-x-2 mb-6">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="w-full"
          />
          <Button
            onClick={handleAddTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add
          </Button>
        </div>

        <div className="space-y-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
              >
                <span className="text-black">{todo.task}</span>
                <div className="flex items-center space-x-2">
                  {/* Edit Button */}
                  <Button
                    onClick={() => handleEditTodo(todo._id)}
                    className="bg-gray-400/20 text-gray-500 hover:bg-gray-400/30 shadow-none"
                  >
                    Edit
                  </Button>

                  {/* Delete Button */}
                  <Button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="bg-red-400/20 text-red-500 hover:bg-red-400/30 shadow-none"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
              {loading ? "loading..." : "No Todos"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
