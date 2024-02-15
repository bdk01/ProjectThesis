import 'dotenv/config';
import Redis from 'ioredis';
import logger from '../utils/logger';

const REDIS_URI = process.env.REDIS_URL || 'redis://localhost:6379';

const clientRedis = new Redis(REDIS_URI);
/* const clientRedis =  new Redis({
    port: 6379,
    host: 'redis'
}); */
clientRedis.on('connect', () => {
    logger.info('Connect to Redis client successfully.');
});

clientRedis.on('close', () => {
    logger.info('Close Redis client successfully.');
});

/*  const redis = require('redis');



 clientRedis.connect();
 clientRedis.on('connect', (err)=>{
     if(err) throw err;
     else console.log('Redis Connected..!');
 }); */
/*   const clientRedis= new Redis({
    url: 'redis://client:6379'
}); */
export default clientRedis;