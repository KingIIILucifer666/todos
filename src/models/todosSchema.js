import { Schema, model, models } from "mongoose";
import User from "@/models/userSchema";

const TodoSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: User,
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
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
