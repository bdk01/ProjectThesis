import mongoose from 'mongoose';
import { State } from '../constant';


const taEnrollmentSchema = mongoose.Schema(
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
    dateCloseForm:Date,
    state:{
      type: String,
      enum: Object.values(State),
      default: State.PENDING
},
    description:String,
    expireAt: { type: Date, default: undefined }
  },
  {
    timestamps: true,
  }
);

taEnrollmentSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });
export default mongoose.model("TaEnrollment", taEnrollmentSchema);