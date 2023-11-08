/* import fetch from "node-fetch"; */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
import fetch from 'node-fetch';
const meetingCtrl = {
  getToken: async (req, res) => {
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;
  
    const options = { expiresIn: "3d", algorithm: "HS256" };
  
    const payload = {
      apikey: API_KEY,
      permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
    };
  
    const token = jwt.sign(payload, SECRET_KEY, options);
    res.json({ token });
  },
  createMeeting: async (req, res) => {
    const { token, region } = req.body;
    const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ region }),
    };
  
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => res.json(result)) // result will contain meetingId
      .catch((error) => console.error("error", error));
  
   /*   const { token } = req.body;
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({
        region: "sg001",
        customRoomId: "aaa-bbb-ccc",
        webhook: "see example",
      }),
    };
     const url = `https://api.videosdk.live/v2/rooms`;
     const response = await fetch(url, options);
     console.log(response)
     const data = await response.json();
     console.log(data); */
  },
  validateMeeting: async (req, res) => {
   const token = req.body.token;
   const meetingId = req.params.meetingId;

   const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

   const options = {
     method: "POST",
     headers: { Authorization: token },
   };

   fetch(url, options)
     .then((response) => response.json())
     .then((result) => res.json(result)) // result will contain meetingId
     .catch((error) => console.error("error", error));
  },
};



export default meetingCtrl;
