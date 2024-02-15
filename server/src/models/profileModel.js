import mongoose from "mongoose";


const { Schema } = mongoose;

const ProfileSchema = new Schema(
  {
    phone: {
      type: Number,
    },
    introduction: {
      type: String,
    },
    address: {
      type: String,
    },
    userId:{type: mongoose.Types.ObjectId, ref: 'Users'}

  }
);

export default mongoose.model("Profile", ProfileSchema);
