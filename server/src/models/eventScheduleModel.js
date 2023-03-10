import mongoose from 'mongoose';


const eventSchema = mongoose.Schema(
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
    conversation: { type: mongoose.Types.ObjectId, ref: "Conversations" },
    location: String,
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("EventSchedules", eventSchema);
