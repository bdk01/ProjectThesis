import express from 'express'
import mongoose from "mongoose";
import cors from "cors"; 
import bodyParser from "body-parser";
import dotenv from "dotenv";
import appRouter from './routes';
import cookieParser from 'cookie-parser'

import { createServer } from "http";
import {ExpressPeerServer } from "peer";
import { Server } from "socket.io";
import SocketServer from './socketServer';
import messageRoute from './routes/messageRoute';

dotenv.config();
const app = express();
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", socket => {
  console.log(socket.id +' connected')
  SocketServer(socket);
});
// Create peer server
/* ExpressPeerServer(httpServer, { path: "/" }); */
/* Routes */
app.use(appRouter);
/* app.use(messageRoute) */

/* Connect to  mongodb */
const URL = process.env.MONGODB_URL;
mongoose.set("strictQuery", false);
mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

const PORT = process.env.PORT || 7000;
httpServer.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
