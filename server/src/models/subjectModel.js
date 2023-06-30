import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
  {
    subjectName: { type: String, required: true },
    description: { type: String, required: true },
    teacher :[{ type: mongoose.Types.ObjectId, ref: "Users" }],
    teachingAssistant:[{ type: mongoose.Types.ObjectId, ref: "Users" }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Subjects", subjectSchema);



