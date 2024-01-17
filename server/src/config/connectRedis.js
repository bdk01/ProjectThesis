import Redis from 'ioredis';

const clientRedis =new Redis({
    port: 6379,          // Redis port
    host: 'localhost',   // Redis host

  })
 /*  const redis = require('redis');

  const clientRedis = redis.createClient({
      port: 6379,
      host: 'redis'
  });

  clientRedis.connect();
  clientRedis.on('connect', (err)=>{
      if(err) throw err;
      else console.log('Redis Connected..!');
  }); */
/*   const clientRedis= new Redis({
    url: 'redis://client:6379'
}); */
export default  clientRedis;