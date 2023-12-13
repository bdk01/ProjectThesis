import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    teachingAssistant:{ type: mongoose.Types.ObjectId, ref: "Users" },
    personGiveFeedBack:{ type: mongoose.Types.ObjectId, ref: "Users" },
    description:String
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("feedbacks", feedbackSchema);
