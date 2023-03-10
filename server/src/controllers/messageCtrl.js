import Users from "../models/userModel";
import Conversations from "../models/conversationModel";
import Messages from "../models/messageModel";
import bcrypt from "bcrypt";

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const messageCtrl = {
  createMessage: async (req, res) => {
    try {
      const { sender, text, media, call, conversation } = req.body;
      if ((!text.trim() && media.length === 0 && !call)) return;
         const newMessage = new Messages({
           conversation: conversation,
           sender:sender,
           call,
           text,
           media,
         });

         await newMessage.save();
      await Conversations.updateOne(
        {
          _id: conversation,
        },
        { $push: { messages: newMessage._id } },
        { new: true, upsert: true }
      );
    let newmessage = await newMessage.populate('sender')

      res.status(200).json( newmessage );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createConversation: async (req, res) => {
    try {
      const  attendees  = req.body.attendees;
   /*    attendees.push(req.user._id) */
      console.log(attendees)
    /*   if (!attendees || (!text.trim() && media.length === 0 && !call)) return; */
       const newConversation = new Conversations({
         attendees:attendees
       });

      await newConversation.save();

      res.status(200).json( newConversation );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getConversations: async (req, res) => {
    try {
  
   const conversations = await Conversations.find({
     attendees: { $in:[req.user._id] },
   }).sort({ UpdatedAt: -1 }).populate('event');
    res.status(200).json({
      conversations,
      result: conversations.length,
    });
   
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getMessages: async (req, res) => {
    try {
       const {id} = req.params
    /*   const features = new APIfeatures(
        Messages.find(),
        req.query
      ).paginating();

      const messages = await features.query.sort("-createdAt").populate('recipient', 'avatar username fullname'); */
       const conversation = await Conversations.findById(id).populate({path: 'messages'  ,populate: { path: 'sender' }});
       /* console.log(conversation) */
       /*         lay themn user  */
      res.status(200).json({
        conversation,
      });
    
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteMessages: async (req, res) => {
    try {
     console.log(req.params)
      await Messages.findOneAndDelete({
        _id: req.params.id,
        sender: req.user._id,
      });
      res.json({ msg: "Delete Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteConversation: async (req, res) => {
    try {
     console.log(req.params);
      const newConver = await Conversations.findOneAndDelete({
        $or: [
          { recipients: [req.user._id, req.params.id] },
          { recipients: [req.params.id, req.user._id] },
        ],
      });
      await Messages.deleteMany({ conversation: newConver._id });

      res.json({ msg: "Delete Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default messageCtrl;
