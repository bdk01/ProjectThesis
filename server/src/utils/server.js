import express from 'express'
import mongoose from "mongoose";
import cors from "cors"; 
import bodyParser from "body-parser";
import dotenv from "dotenv";
import appRouter from '../routes';
import cookieParser from 'cookie-parser'
import fileUpload from "express-fileupload";
import { createServer } from "http";



dotenv.config();
function createServer1() {
const app = express();
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};


/* app.use(bodyParser.urlencoded({extended: true })); */
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cookieParser());

//socket
/* const httpServer = createServer(app); */

// Create peer server
/* ExpressPeerServer(httpServer, { path: "/" }); */
/* Routes */
app.use(appRouter);
return app;
}
export default createServer1;