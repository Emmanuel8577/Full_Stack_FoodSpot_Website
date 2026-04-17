import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
        // This ensures the server doesn't hang forever if the connection drops
        connectTimeout: 10000, 
        keepAlive: 5000,
    }
});

redisClient.on('error', (err) => console.log('Redis Cloud Error:', err));
redisClient.on('connect', () => console.log('Redis Connected Successfully to Cloud!'));

// Initialize the connection
try {
    await redisClient.connect();
} catch (error) {
    console.error("Could not connect to Redis Cloud:", error);
}

export default redisClient;