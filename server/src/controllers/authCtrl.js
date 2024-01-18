import Users from "../models/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../helper/sendemail";
import dotenv from "dotenv";
import Profile from "../models/profileModel";

dotenv.config();
let buildURLEmail = (token) => {
  let result = ``;

  result = `${process.env.URL_REACT}/reset-password/${token}`; /* truyen clientside */
  return result;
};
const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(401).json({ msg: "The email already exists" });
      if (password.length < 6)
        return res.status(400).json({ msg: "Password is least 6 char" });

      /* Password Encryption */

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        fullname,
        username,
        email,
        password: passwordHash,
      });
      /* save user */
      await newUser.save();
      const newprofile = new Profile({
        userId: newUser._id
      });


      /* save profile */
      await newprofile.save();
      await Users.findByIdAndUpdate(
        newUser._id,
        { $set: { profile: newprofile._id } },
        { new: true }
      );
      res.status(200).json({ msg: "Register success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
      const userInf = await Users.findOne({ email }).select('-password')
        .populate("followers following profile", "-password")
      // If login success , create access token and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/auth/refresh_token",
        maxAge: 30 * 7 * 24 * 60 * 60 * 1000, // 30days
      });


      res.status(200).json({ accesstoken, user: userInf });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/auth/refresh_token" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body
      const user = await Users.findOne({ email }).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const token = jwt.sign(
        { user: user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      await sendEmail({ redirectLink: buildURLEmail(token), user: user });

      return res.json({ msg: "check email" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const token = req.params.token;

      const password = req.body.password;
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, result) => {
          if (err)
            return res.status(400).json({ msg: "wq" });
          const user = await Users.findById(result.user._id).select("-password");
          if (!user) return res.status(400).json({ msg: "This does not exist." });
          const passwordHash = await bcrypt.hash(password, 10);
          await Users.updateOne(
            {
              _id: user._id,
            },
            { password: passwordHash },
            { new: true, upsert: true }
          );
          return res.status(200).json({ msg: "update success" });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  registerAdmin: async (req, res) => {
    try {
      const { fullname, username, email, password, role } = req.body;
      console.log(role)
      const user = await Users.findOne({ email });
      if (user)
        return res.status(401).json({ msg: "The email already exists" });
      if (password.length < 6)
        return res.status(400).json({ msg: "Password is least 6 char" });

      /* Password Encryption */

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        fullname,
        username,
        email,
        password: passwordHash,
        role: role
      });
      /* save user */
      await newUser.save();
      const newprofile = new Profile({
        userId: newUser._id
      });


      /* save profile */
      await newprofile.save();
      await Users.findByIdAndUpdate(
        newUser._id,
        { $set: { profile: newprofile._id } },
        { new: true }
      );
      res.status(200).json({ msg: "Register success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
        if (err)
          return res.status(400).json({ msg: "Please login or register" });
        const user = await Users.findById(result.id).select("-password").populate("followers following profile", "-password")
        if (!user)
          return res.status(400).json({ msg: "This does not exist." });
        const accesstoken = createAccessToken({ id: user.id });

        res.json({ user, accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now." });

          const user = await Users.findById(result.id).select("-password").populate("followers following profile", "-password")
          if (!user)
            return res.status(400).json({ msg: "This does not exist." });

          const access_token = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" }
          );

          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

export default authCtrl;
