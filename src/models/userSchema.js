import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
    select: false,
  },
  password: {
    type: String, // For credential-based users
    select: false, // Exclude password by default
  },
});

const User = models.User || model("User", UserSchema);

export default User;
