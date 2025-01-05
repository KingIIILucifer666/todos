"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

export default function EditTaskPage() {
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState("");
  const router = useRouter();
  const { id } = router;
  const taskId = id;

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      const response = await fetch(`/api/user/${taskId}/todos`);
      const data = await response.json();
      setTask(data);
      setTaskName(data.name);
    };

    fetchTask();
  }, [taskId]);

  const handleUpdateTask = async () => {
    if (!taskName.trim()) return;

    // Update the task on the server (API call)
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ name: taskName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // After successful update, redirect back to the dashboard
      router.push("/dashboard");
    } else {
      // Handle error, e.g., show a message or alert
      console.error("Failed to update task");
    }
  };

  if (!task) {
    return <div>Loading...</div>; // Show loading state while fetching task data
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 gap-5">
      <div className="max-w-4xl w-full bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Edit Task
        </h2>

        <div className="flex items-center space-x-2 mb-6">
          <Input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Edit task"
            className="w-full"
          />
          <Button
            onClick={handleUpdateTask}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Update
          </Button>
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
