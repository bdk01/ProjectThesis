import groups from "../models/groupModel";
import Conversations from "../models/conversationModel";
const groupsCtrl = {

  createEvent: async (req, res) => {
    try {
     const {  startTime, endTime,description,conversation,location,attendees, meetingName  } = req.body;
    /*  attendees.push(req.user._id) */
      const newEvet = new groups({
        conversation: conversation,
         meetingName,
        startTime,
        endTime,
        description,
        creatorId: req.user._id,
        location,
        attendees
      });
        await newEvet.save();
      /*   const  */
       /* const newConversation = await groups.findById(conversation); */
        const newConversation = await Conversations.findByIdAndUpdate(
          conversation,
          { $set: { event: newEvet._id } },
          { new: true }
        );
    console.log(newConversation)
         res.status(200).json(newEvet);
    } catch (err) {
     return res.status(500).json({ msg: err.message });
    }
  },
  getEvent: async (req, res) => {
     const { id } = req.params;
    try {
    const event = await groups.findById(id);
        res.status(200).json(event);

    } catch (err) {
  res.status(404).json({ message: err.message });
    }
  },
  searchEvent: async (req, res) => {
   /*   const { id } = req.params; */
    try {
   /*  const event = await groups.findById(id); */
    const event = await groups.find({
      meetingName: { $regex: req.query.meetingName },
    })
      .limit(10)
      .select("meetingName description conversation");
    res.status(200).json(event);


    } catch (err) {
  res.status(404).json({ message: err.message });
    }
  },
  getEventByCreatorIdDate: async (req, res) => {
    try {
    const event = await groups.findOne(
            {$and: [
                { StartTime: new Date(date) },
                { CreatorId: req.userId }
            ]}
        );
             res.status(200).json(event);
    } catch (err) {
  res.status(404).json({ message: err.message });
    }
  },
   getEvents : async (req, res) => {
    try {
     const groupss = await groups.find({ 
            $or: [ 
                { CreatorId: req.userId }, 
                { Attendees: req.userName + ',' + req.userId }
            ]     
        })
        .slice('Messages', -1)
        .sort({ UpdatedAt: -1 });
        res.status(200).json(groupss);
    } catch (err) {
  res.status(404).json({ message: err.message });
    }
  },
   updateEvent : async (req, res) => {
     const {id} = req.params
       const changedEvent = req.body;
    try {
      const updatedEvent = await groups.findByIdAndUpdate(id, { ...changedEvent, id }, { new: true });
        res.json(updatedEvent);
    } catch (err) {
  res.status(404).json({ message: err.message });
    }
  },
   updateEventByCreatorIdDate : async (req, res) => {
       const { date: date } = req.params;
    const changedEvent = req.body;
    try {
      const updatedEvent = await groups.findOneAndUpdate(
            {$and: [
                { StartTime: new Date(date) },
                { CreatorId: req.userId }
            ]}, 
            { ...changedEvent }, 
            { new: true }
        );
        res.json(updatedEvent);
    } catch (err) {
  res.status(404).json({ message: err.message });
    }
  },
   findOrCreateConversation : async (req, res) => {
       const { sender,recipient,senderName,recipientName } = req.body;
 
    try {
        const conversationRoom = await Conversations.findOne(
            {
                $or: [
                    {attendees: [sender, recipient]},
                    {attendees: [recipient, sender]}
                ]
            }
        )
        if(conversationRoom){

          res.json(conversationRoom)
        }
        else{
            const conversation = new Conversations({
         attendees:[sender,recipient]
       });
         await conversation.save();
            const newEvent = new groups({
            conversation:conversation._id,
            meetingName:`${senderName} & ${recipientName}`,
            description:'',
            creatorId: sender,
            attendees:[sender,recipient],
            isCouple:true,
            receiverId:recipient
          });
        await newEvent.save();
           const newConversation = await Conversations.findByIdAndUpdate(
          conversation._id,
          { $set: { event: newEvent._id } },
          { new: true }
        );
        res.json(newEvent)
        }
     
    } catch (err) {
  res.status(404).json({ message: err.message });
    }
  },


};

export default groupsCtrl;
