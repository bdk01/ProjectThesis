import express from 'express'
import mongoose from "mongoose";
import cors from "cors"; 
import bodyParser from "body-parser";
import dotenv from "dotenv";
import appRouter from './routes';
import cookieParser from 'cookie-parser'
import fileUpload from "express-fileupload";
import { createServer } from "http";
import {ExpressPeerServer } from "peer";
import { Server } from "socket.io";
import SocketServer from './socketServer';
import messageRoute from './routes/messageRoute';
import logger from './utils/logger';
import connect from "./config/connectDB";
import rateLimit from 'express-rate-limit'

dotenv.config();
const app = express();
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};
console.log('connecttest')
/* 
const limit = rateLimit({
  windowMs: 1 *60*1000,
  max:30
}) */
/* app.use(limit) */
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cookieParser());

//socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", socket => {
  console.log(socket.id +' connected2')
  SocketServer(socket);
});

/* Routes */
app.use(appRouter);

/* Connect to  mongodb */

const PORT = process.env.PORT || 8000;
console.log(process.env.MONGODB_URI)
httpServer.listen(PORT, async() => {
  logger.info(`App is running a1l http://localhost:${PORT}`);

  /*  await connect(); */
  mongoose.set("strictQuery", false);
   mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }) .then(() => console.log('DB Connected'));
});

export default app