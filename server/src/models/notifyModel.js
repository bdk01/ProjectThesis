import mongoose from "mongoose";

const notifySchema =  mongoose.Schema({
    id: mongoose.Types.ObjectId,
    user: {type: mongoose.Types.ObjectId, ref: 'Users'},
    recipients: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    url: String,
    text: String,
    content: String,
    image: String,
    isRead: {type: Boolean, default: false}
}, {
    timestamps: true
})

export default mongoose.model("Notifies", notifySchema);


