import mongoose from 'mongoose';


const taScheduleSchema = mongoose.Schema(
  {
    subject: { type: mongoose.Types.ObjectId, ref: "Subjects" },
    requirement: String,
    studentId: String,
    fullName: String,
    gpaTotal:String,
    gpaSubject:String,
    candidate: { type: mongoose.Types.ObjectId, ref: "Users" },
    creator: { type: mongoose.Types.ObjectId, ref: "Users" },
    fill:{type:Boolean,default:false}, 
    link:String,
    state:{type:String,default:"open"}
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("TaSchedules", taScheduleSchema);