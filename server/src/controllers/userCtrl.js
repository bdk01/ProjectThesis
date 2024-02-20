import Users from "../models/userModel";
import Subjects from '../models/subjectModel'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../helper/sendemail";
import Profile from "../models/profileModel";
import clientRedis from "../config/connectRedis";
const userCtrl = {
  searchUser: async (req, res) => {
    try {

      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(8)
        .select("fullname username avatar")
      

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchAllUser: async (req, res) => {
    try {

      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5
      const page = req.query.page ? parseInt(req.query.page) : 0;
      /*  console.log(req.query.sorting)
       console.log(req.query.globalFilter) */
      const { keyword, sortBy, fullname, email, role, username } = req.query;

      var query = {};
      var keywordCondition = keyword
        ? {
          $or: [
            { fullname: { $regex: keyword, $options: "i" } },
            { username: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
          ],
        }
        : {};
      if (fullname) {
        query.fullname = fullname;
      }
      if (username) {
        query.username = username;
      }
      if (email) {
        query.email = email;
      }
      /*  const users = await Users.find({}).select("-password"); */
      const users = await Users.find({ $and: [query, keywordCondition] })
        .limit(pageSize)
        .skip(pageSize * page)
        .sort(`${sortBy}`)
        .select('-password')
        .populate('profile')
      var length = await Users.find({ $and: [query, keywordCondition] }).count();
      res.status(200).json({
        status: 'success',
        length,
        users

      })
    }
    catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {

  /*     const user = await Users.findById(req.params.id).select('-password')
        .populate("followers following profile", "-password")
      if (!user) return res.status(400).json({ msg: "User does not exist." })

      res.json({ user }) */

       console.log(req.params.id)
     clientRedis.get(`user/${req.params.id}`, async (err, cacheduser) => {
       if (err) throw err;

       if (cacheduser) {
         res.json(JSON.parse(cacheduser));
       } else {

         const user = await Users.findById(req.params.id).select('-password')
           .populate("followers following profile", "-password")
         if (!user) return res.status(400).json({ msg: "User does not exist." })

         
         clientRedis.setex(`user/${req.params.id}`, 360, JSON.stringify({user}));
         res.json({ user })
       
       }
     });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { username, email } = req.body;

      await sendEmail({ username, email });
      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword1: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {

      const { email, username, fullname, role,  id } = req.body


      await Users.findOneAndUpdate({ _id: id }, {
        email, fullname: fullname, username: username, role
      }, { new: true })
      clientRedis.del(`user/${id}`);
      res.json({ msg: "Update Success!" })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
 
  updateTa: async (req, res) => {
    try {

      const { email, username, fullname, role,  id,subjectTaId } = req.body

   
      if(role==="ta") return res.json({ msg: "Update Success!" });
      console.log('te')
      await Users.findOneAndUpdate({ _id: id }, {
        email, fullname: fullname, username: username, role ,subjectTa:null
      }, { new: true })
      console.log('te2')
      await Subjects.findOneAndUpdate({_id: subjectTaId}, {
        $pull: {teachingAssistant: id}
    }, {new: true})
    console.log('te3')
      clientRedis.del(`user/${id}`);
      res.json({ msg: "Update Success!" })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  
  getMonthlyUser: async (req, res) => {
    try {
      const currentYear = new Date().getFullYear();
      const monthlyRegistrations = await Users.aggregate([
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
  

      res.json({ monthlyRegistrations })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  follow: async (req, res) => {
    try {
      const user = await Users.find({ _id: req.params.id, followers: req.user._id })
      if (user.length > 0) return res.status(500).json({ msg: "You followed this user." })

      const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
        $push: { followers: req.user._id }
      }, { new: true }).populate("followers following profile", "-password")

      await Users.findOneAndUpdate({ _id: req.user._id }, {
        $push: { following: req.params.id }
      }, { new: true })

      res.json({ newUser })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  unfollow: async (req, res) => {
    try {

      const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
        $pull: { followers: req.user._id }
      }, { new: true }).populate("followers following profile", "-password")

      await Users.findOneAndUpdate({ _id: req.user._id }, {
        $pull: { following: req.params.id }
      }, { new: true })

      res.json({ newUser })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id]

      const num = req.query.num || 10

      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
        { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
      ]).project("-password")

      return res.json({
        users,
        result: users.length
      })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteUser: async (req, res) => {
    try {

      await Users.findOneAndDelete({ _id: req.params.id })
      clientRedis.del(`user/${req.params.id}`);
      res.status(200).json({
        msg: 'Deleted success!',
      }  )
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  editProfileUser: async (req, res) => {
    try {
      console.log('gg')
      const { avatar, fullname, username, phone, profile, introduction, studentId } = req.body
      /*   const newprofile = new ProfileModel({
          phone,introduction
        }); */

      console.log(studentId)
      /* save profile */
       

          const newprofile = await Profile.findOneAndUpdate({ userId: req.user._id }, profile, { new: true, upsert: true })
      

      await Users.findOneAndUpdate({ _id: req.user._id }, {
        avatar, fullname, username, profile: newprofile._id, studentId
      }, { new: true, upsert: true })
      clientRedis.del(`user/${req.user._id}`);
      res.json({ msg: "Update Success!" })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
};

export default userCtrl;
