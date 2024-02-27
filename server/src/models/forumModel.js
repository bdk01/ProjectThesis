import mongoose from "mongoose";

const forumSchema = new mongoose.Schema(
  {
    attendees: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    forumName: String,
    creator: { type: mongoose.Types.ObjectId, ref: "Users" },
    forumImg:String,
    description:String,
    isPrivate:Boolean,
    waitingUsers:[{ type: mongoose.Types.ObjectId, ref: "Users" }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Forums", forumSchema);
