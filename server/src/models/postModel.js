import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "Users" },
    desc: { type: String, required: true },
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
