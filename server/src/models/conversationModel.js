import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    recipients: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    text: String,
    media: Array,
    call: Object,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversations", conversationSchema);
