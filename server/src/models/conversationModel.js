import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    attendees: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    messages: [{ type: mongoose.Types.ObjectId, ref: "Messages" }],
    event: [{ type: mongoose.Types.ObjectId, ref: "EventSchedules" }],
    text: String,
    media: Array,
    call: Object,
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversations", conversationSchema);
