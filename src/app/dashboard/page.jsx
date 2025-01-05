"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Dashboard = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const userId = "";

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (userId) fetchPosts();
  }, [userId]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), name: newTask.trim() }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (taskId) => {
    router.push(`/dashboard/${taskId}`);
  };

  const handleLogout = () => {
    sessionStorage.setItem("token", null);
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
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="w-full"
          />
          <Button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add
          </Button>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
            >
              <span className="text-black">{task.name}</span>
              <div className="flex items-center space-x-2">
                {/* Edit Button */}
                <Button
                  onClick={() => handleEditTask(task.id)}
                  className="bg-gray-400/20 text-gray-500 hover:bg-gray-400/30 shadow-none"
                >
                  Edit
                </Button>

                {/* Delete Button */}
                <Button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-400/20 text-red-500 hover:bg-red-400/30 shadow-none"
                >
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
