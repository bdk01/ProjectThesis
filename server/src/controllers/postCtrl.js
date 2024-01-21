import Posts from '../models/postModel'
import Comments from'../models/commentModel'
import Users from '../models/userModel'

import clientRedis from '../config/connectRedis'
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

const postCtrl = {
    createPost: async (req, res) => {
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
    getPosts: async (req, res) => {
        try {
            const { filter } = req.query;
       /*     
            clientRedis.get(`posts/${filter}`, async (err, cachedposts) => {
                if (err) throw err;
          
                if (cachedposts) {
                  res.json(JSON.parse(cachedposts));
                } else {
             
                  const users = await Users.find({
                    role: "teacher",
                  })
                 
                  const teacherUser = users.map(user=>user._id)
                 
                const newArr = [...req.user.following, req.user._id,...teacherUser]
               
               const uniq = [...new Set(newArr)]
             
    
                const features =  new APIfeatures(Posts.find({
                    user: uniq
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
                const obj = {
                    msg: 'Success!',
                    result: posts.length,
                    posts
                }
              
                clientRedis.setex(`posts/${filter}`, 3600, JSON.stringify(obj));
                res.json({
                    msg: 'Success!',
                    result: posts.length,
                    posts
                })
                }
              }); */
            const users = await Users.find({
                role: "teacher",
              })
             
              const teacherUser = users.map(user=>user._id)
             
            const newArr = [...req.user.following, req.user._id,...teacherUser]
           
           const uniq = [...new Set(newArr)]
         

            const features =  new APIfeatures(Posts.find({
                user: uniq
            }), req.query).paginating()
   
            const posts = await features.query.sort(filter)
            .populate("user likes", "avatar username fullname followers")
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
    getMonthlyPost: async (req, res) => {
        try {
          const currentYear = new Date().getFullYear();
          const monthlyPostRegistrations = await Posts.aggregate([
            {
              $group: {
                _id: {
                  month: { $month: '$createdAt' },
                  year: { $year: '$createdAt' },
                },
                count: { $sum: 1 },
              },
            },
            {
              $addFields: {
                monthName: {
                  $concat: [
                    { $switch: { branches: [
                      { case: { $eq: ['$_id.month', 1] }, then: 'January' },
                      { case: { $eq: ['$_id.month', 2] }, then: 'February' },
                      { case: { $eq: ['$_id.month', 3] }, then: 'March' },
                      { case: { $eq: ['$_id.month', 4] }, then: 'April' },
                      { case: { $eq: ['$_id.month', 5] }, then: 'May' },
                      { case: { $eq: ['$_id.month', 6] }, then: 'June' },
                      { case: { $eq: ['$_id.month', 7] }, then: 'July' },
                      { case: { $eq: ['$_id.month', 8] }, then: 'August' },
                      { case: { $eq: ['$_id.month', 9] }, then: 'September' },
                      { case: { $eq: ['$_id.month', 10] }, then: 'October' },
                      { case: { $eq: ['$_id.month', 11] }, then: 'November' },
                      { case: { $eq: ['$_id.month', 12] }, then: 'December' },
                    ], default: 'Invalid Month' } },
                    ', ',
                    { $toString: '$_id.year' },
                  ],
                },
              },
            },
            {
              $sort: { '_id.year': 1, '_id.month': 1 },
            },
          ]);
      
    
          res.json({ monthlyPostRegistrations })
    
        } catch (err) {
          return res.status(500).json({ msg: err.message })
        }
      },
    updatePost: async (req, res) => {
        try {
            clientRedis.del(`posts/-createdAt`)
            clientRedis.del(`posts/createdAt`)
            const { content, images } = req.body
                
            const post = await Posts.findOneAndUpdate({_id: req.params.id}, {
                content, images
            }).populate("user likes", "avatar username fullname")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            res.json({
                msg: "Updated Post!",
                newPost: {
                    ...post._doc,
                    content, images
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    reportPost: async (req, res) => {
        try {
          /*   const post = await Posts.find({_id: req.params.id, likes: req.user._id})
            if(post.length > 0) return res.status(400).json({msg: "You liked this post."})

            const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user._id}
            }, {new: true})

            if(!like) return res.status(400).json({msg: 'This post does not exist.'}) */
            const updatedPost = await Posts.findOneAndUpdate(
                {_id: req.params.id},
                { $inc: { reports: 1 } },
                { new: true }
              );
          
              if (!updatedPost) {
                console.error('Post not found');
                return;
              }
            res.json({msg: 'Report success!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    likePost: async (req, res) => {
        try {
            const post = await Posts.find({_id: req.params.id, likes: req.user._id})
            if(post.length > 0) return res.status(400).json({msg: "You liked this post."})

            const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user._id}
            }, {new: true})

            if(!like) return res.status(400).json({msg: 'This post does not exist.'})

            res.json({msg: 'Liked Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unLikePost: async (req, res) => {
        try {

            const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user._id}
            }, {new: true})

            if(!like) return res.status(400).json({msg: 'This post does not exist.'})

            res.json({msg: 'UnLiked Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({user: req.params.id}), req.query)
            .paginating()
            const posts = await features.query.sort("-createdAt")

            res.json({
                posts,
                result: posts.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)
            .populate("user likes", "avatar username fullname followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            if(!post) return res.status(400).json({msg: 'This post does not exist.'})

            res.json({
                post
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPostsDicover: async (req, res) => {
        try {
            const users = await Users.find({
                role: "teacher",
              })
             
              const teacherUser = users.map(user=>user._id)
              console.log(teacherUser)
            const newArr = [...req.user.following, req.user._id,...teacherUser]
            console.log(newArr)
           const uniq = [...new Set(newArr)]
           console.log(uniq)
           /*   const getNewArr = newArr.filter(newAr=>newAr!==teacherUser) */
           /*   console.log(getNewArr) */
            const num  = req.query.num || 9

            const posts = await Posts.aggregate([
                { $match: { user : { $in: uniq } } },
                { $sample: { size: Number(num) } },
                { $sort: { updatedAt : -1 } },
            ])

            return res.json({
                msg: 'Success!',
                result: posts.length,
                posts,
            
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePost: async (req, res) => {
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
    },
    savePost: async (req, res) => {
        try {
            const user = await Users.find({_id: req.user._id, saved: req.params.id})
            if(user.length > 0) return res.status(400).json({msg: "You saved this post."})

            const save = await Users.findOneAndUpdate({_id: req.user._id}, {
                $push: {saved: req.params.id}
            }, {new: true})

            if(!save) return res.status(400).json({msg: 'This user does not exist.'})

            res.json({msg: 'Saved Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unSavePost: async (req, res) => {
        try {
            const save = await Users.findOneAndUpdate({_id: req.user._id}, {
                $pull: {saved: req.params.id}
            }, {new: true})

            if(!save) return res.status(400).json({msg: 'This user does not exist.'})

            res.json({msg: 'unSaved Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   
    getSavePosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({
                _id: {$in: req.user.saved}
            }), req.query).paginating()

            const savePosts = await features.query.sort("-createdAt")

            res.json({
                savePosts,
                result: savePosts.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAllPost: async (req, res) => {
      
        try {
            console.log('get')
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 4;
           const page = req.query.page ? parseInt(req.query.page) : 0;
            const { keyword, content,sortBy} = req.query;
         
           var query = {};
           var keywordCondition = keyword
           ? {
               $or: [
                   { content: { $regex: keyword, $options: "i" } },
             
               ],
               }
           : {};
            if (content) {
           query.content = content;
           }
         
            const    posts = await Posts.find({ $and: [query, keywordCondition] })
         .limit(pageSize)
         .skip(pageSize * page)
         .sort(`${sortBy}`)
        .populate('user likes') 
         console.log('get1')
            var length = await  Posts.find({ $and: [query, keywordCondition] }).count();
               res.status(200).json({
                   status: 'success',
                   length,
                 posts       
               })
   
           } 
           catch (err) {
               return res.status(500).json({msg: err.message})
           }
  },
  
}

export default postCtrl