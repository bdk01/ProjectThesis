import mongoose from "mongoose";
import { UserRole } from "../constant";

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
    profile:{type: mongoose.Types.ObjectId, ref: 'Profile'},
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/khoa252001/image/upload/v1668777257/socialmedia/duck_orrdvy.jpg",
    },
    studentId: {
      type: String,
    },
    followers: [{type: mongoose.Types.ObjectId, ref: 'Users'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'Users'}],
    role: {
            type: String,
            enum: Object.values(UserRole),
            required: true,
            default: UserRole.USER
    },
   subjectTa:{type: mongoose.Types.ObjectId, ref: 'Subjects'},
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);
