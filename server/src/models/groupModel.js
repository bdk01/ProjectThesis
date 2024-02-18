import mongoose from 'mongoose';


const groupSchema = mongoose.Schema(
  {
    subject: { type: mongoose.Types.ObjectId, ref: "Subjects" },
    startTime: {
      type: Date,
      default: new Date(),
    },
    endTime: {
      type: Date,
      default: new Date(),
    },
    description: String,
    meetingName: String,
    attendees: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    creatorId: { type: mongoose.Types.ObjectId, ref: "Users" },
    receiverId: { type: mongoose.Types.ObjectId, ref: "Users" },
    conversation: { type: mongoose.Types.ObjectId, ref: "Conversations" },
  
    isCouple: {
      type: Boolean,
      default:false
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Groups", groupSchema);
