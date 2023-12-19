import Posts from '../models/postModel'
import Comments from'../models/commentModel'
import Users from '../models/userModel'

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

const feedbackCtrl = {
    createFeedback: async (req, res) => {
        try {
            const { content, images } = req.body
         
          /*   if(images.length === 0) return res.status(400).json({msg: "Please add your photo."}) */
       
            const newPost = new Posts({
                content, images, user: req.user._id
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
            return res.status(500).json({msg: err.message})
        }
    },
    getFeedback: async (req, res) => {
        try {
            const users = await Users.find({
                role: "teacher",
              })
             
              const teacherUser = users.map(user=>user._id)
             
            const newArr = [...req.user.following, req.user._id,...teacherUser]
           
           const uniq = [...new Set(newArr)]
         

            const features =  new APIfeatures(Posts.find({
                user: uniq
            }), req.query).paginating()
   
            const posts = await features.query.sort('-createdAt')
            .populate("user likes ", "avatar username fullname followers")
            .populate({
                path: "comments",
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
            return res.status(500).json({msg: err.message})
        }
    },
    deleteFeedback: async (req, res) => {
        try {
            const post = await Posts.findOneAndDelete({_id: req.params.id, user: req.user._id})
            await Comments.deleteMany({_id: {$in: post.comments }})

            res.json({
                msg: 'Deleted Post!',
                newPost: {
                    ...post,
                    user: req.user
                }
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
   
}
export default feedbackCtrl