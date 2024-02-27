import Forum from "../models/forumModel";
import Posts from '../models/postModel'
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 2
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}
const forumCtrl = {

    createForum: async (req, res) => {
        try {
            const { forumName,description,creator,isPrivate} = req.body;
            const newForum = new  Forum({
                forumName,description,creator,isPrivate
            });
              /* save user */
              newForum.attendees.push(creator);
              await newForum.save();
              res.status(200).json({ msg: "Register success" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createForumPost: async (req, res) => {
        try {
            const { content, images,forumId } = req.body
        
            /*   if(images.length === 0) return res.status(400).json({msg: "Please add your photo."}) */
         
              const newPost = new Posts({
                  content, images, user: req.user._id,forumId
              })
       
              await newPost.save()
  
              res.json({
                  msg: 'Created Post!',
                  newPost: {
                      ...newPost._doc,
                      user: req.user
                  }
              })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getForum: async (req, res) => {
        try {
            const forum = await Forum.find({_id:req.params.id}).populate('attendees waitingUsers');
               
            res.json( forum );
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    checkForum: async (req, res) => {
        try {
      
         
            const isJoin = await Forum.find({_id:req.params.id,attendees: { $in: [req.user._id] }})
          
            const waitingUsers = await Forum.find({_id:req.params.id,waitingUsers: { $in: [req.user._id] }})
          
                
            res.status(200).json( { waitingUsers,isJoin} );
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
  
    acceptJoining: async (req, res) => {
        try {
            const { userId } = req.body
            await Forum.findOneAndUpdate(
                { _id: req.params.id },
                {
                  $push: { attendees: userId },
                  $pull: { waitingUsers: userId }
                }, {new: true}
              );
              res.status(200).json({ msg:"success"});
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    rejectJoining: async (req, res) => {
        try {
            const { userId } = req.body
            console.log(userId)
            await Forum.findOneAndUpdate(
                { _id: req.params.id },
                {
                  $pull: { waitingUsers: userId }
                }, {new: true}
              );
              res.status(200).json({ msg:"success"});
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
  
    kickMember: async (req, res) => {
        try {
            const { userId } = req.body
            await Forum.findOneAndUpdate(
                { _id: req.params.id },
                {
                  $pull: { attendees: userId }
                }, {new: true}
              );
              res.status(200).json({ msg:"success"});
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    requestJoining: async (req, res) => {
        try {
            console.log(req.user._id)
            console.log(req.params.id)
           
            await Forum.findOneAndUpdate({_id: req.params.id}, {
                $push: { waitingUsers: req.user._id },
            })
            res.status(200).json({ msg:"success"});
          
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getPostsForum: async (req, res) => {
        try {
            /* const posts = await Posts.find({
                forumId:req.params.id,
            }) */
            const { filter } = req.query;
            const features =  new APIfeatures(Posts.find({
                forumId:req.params.id,
            }), req.query).paginating()
   
            const posts = await features.query.sort(filter)
            .populate("user likes","avatar username fullname followers")
            .populate({
                path: "comments",
                 options: { strictPopulate: false },
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })
            res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAllForum: async (req, res) => {
        try {
            const {type} = req.query
            if(type=="myforum"){
                const forum = await Forum.find({creator:req.user._id})
                res.json({ forum });
            }
            if(type=="all"){
                const forum = await Forum.find().limit(8)
                res.json({ forum });
            }
               
          
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
  
    getForums: async (req, res) => {
        try {
          /*   const {type} = req.query
            if(type=="myforum"){
                const forum = await Forum.find({creator:req.user._id})
                res.json({ forum });
            }
            if(type=="all"){
            } */
        /*     const forum = await Forum.find().limit(8)
            res.json({ forum }); */
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5
            const page = req.query.page ? parseInt(req.query.page) : 0;
            /*  console.log(req.query.sorting)
             console.log(req.query.globalFilter) */
            const { keyword, sortBy,  description,  forumName } = req.query;
      
            var query = {};
            var keywordCondition = keyword
              ? {
                $or: [
               
                  { forumName: { $regex: keyword, $options: "i" } },
                  { description: { $regex: keyword, $options: "i" } },
                ],
              }
              : {};
      
            if (forumName) {
              query.forumName = forumName;
            }
            if (description) {
              query.description = description;
            }
            /*  const users = await Users.find({}).select("-password"); */
            const forum = await Forum.find({ $and: [query, keywordCondition] })
              .limit(pageSize)
              .skip(pageSize * page)
              .sort(`${sortBy}`)
           
            var length = await Forum.find({ $and: [query, keywordCondition] }).count();
            res.status(200).json({
              status: 'success',
              length,
              forum
      
            })   
          
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
  
  
    deleteForum: async (req, res) => {
        try {
            console.log('qwd')
            const forum = await Forum.findOneAndDelete({_id: req.params.id/* , creator: req.user._id */})
            await Posts.deleteMany({forumId: req.params.id})
            console.log('success')
           /*  const forum = await Forum.find({
                username: { $regex: req.query.username },
            })
                .limit(8)
                .select("fullname username avatar") */


            res.json({ msg:'sucess'});
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
  
    updateForum: async (req, res) => {
        try {
            const { forumName,description,isPrivate } = req.body
                console.log('up')
                await Forum.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        forumName,description,isPrivate
                    }, {new: true}
                  );

                  res.json({ msg:'sucess'});
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

};

export default forumCtrl;
