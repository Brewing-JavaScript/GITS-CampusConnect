import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    default: "student",
    type: String,
  },
  branch: {
    type: String,
  },
  skills: {
    type: [String],
    default: [],
  },
  experience: [
    {
      company: {
        type: String,
      },
      role: {
        type: String,
      },
      duration: {
        type: String,
      },
    },
  ],
  logourl: {
    type: String,
  },
  public_url: {
    type: String,
  },
  cover: {
    type: String,
  },
  hired: {
    default: false,
    type: Boolean,
  },
});

// Create a User model from the schema
const User = mongoose.model("User", userSchema);

export default User;
