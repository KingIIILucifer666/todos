import { Schema, model, models } from "mongoose";
import User from "@/models/userSchema"; // Ensure this path is correct

const TodoSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: User, // Reference to User model
    required: true,
  },
  task: {
    type: String,
    required: [true, "Task is required!"],
    trim: true,
    maxlength: [200, "Task cannot exceed 200 characters"],
  },
  completed: {
    type: Boolean,
    default: false, // Tracks whether the task is completed
  },
  created_at: {
    type: Date,
    default: Date.now, // Set default to the current timestamp
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now, // Set default to the current timestamp
    required: true,
  },
});

// Register the Todo model
const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
