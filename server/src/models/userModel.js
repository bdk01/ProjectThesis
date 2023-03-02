import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: "String" } },
      },
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/khoa252001/image/upload/v1668777257/socialmedia/duck_orrdvy.jpg",
    },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);
