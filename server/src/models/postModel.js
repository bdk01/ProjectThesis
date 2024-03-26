import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "Users" },
    content: String,
    likes: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comments" }],
    images: {
      type: Array,
      required: true,
    },
    reports: {
      type: Number,
      default: 0,
    },
    forumId:{ type: mongoose.Types.ObjectId, ref: "Forums" }
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
