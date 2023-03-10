import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
  {
    subjectName: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

export default mongoose.modell("Subjects", subjectSchema);



