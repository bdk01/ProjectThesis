import dotenv from "dotenv";
import logger from "../utils/logger";
import mongoose from "mongoose";
dotenv.config();


async function connect() {
/*   const dbUri = config.get<string>("dbUri"); */
/* const URL = process.env.MONGODB_URL; */
const URL = "mongodb://127.0.0.1:27017/App";
  try {
    mongoose.set("strictQuery", false);
   /*  await mongoose.connect(URL); */
     mongoose.connect(
      URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
   /*  logger.info("DB connected"); */
   console.log('db connect')
  } catch (error) {
    /* logger.error("Could not connect to db"); */
    process.exit(1);
  }
/* mongoose.set("strictQuery", false);
mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) throw err;
    log.err("Could not connect to db");
  }
); */
}

export default connect;
