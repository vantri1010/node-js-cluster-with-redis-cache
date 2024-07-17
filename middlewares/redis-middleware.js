import { createClient } from "redis";
import { redisHost, redisPort } from "./keys.js";

async function getFromRedis(key, client) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
}

export async function redisMiddleware(req, res, next) {
    try {
        const client = createClient({
            host: redisHost,
            port: redisPort
        });

        client.on('error', (err) => console.log('Redis Client Error', err));
        client.on('connect', () => console.log('Connected to Redis DB'));
        client.on('ready', () => console.log('Ready to use Redis DB'));
        client.on('end', () => console.log('Client disconnected from Redis DB'));

        (async () => {
            await client.connect();
            console.log(`client.isOpen: ${client.isOpen}, client.isReady: ${client.isReady}`);
        })();
        
        const { url } = req;
        const cacheKey = url.slice(1); // Remove the leading slash

        const cachedData = await getFromRedis(cacheKey, client);

        if (cachedData !== null) {
            res.send(cachedData);
            console.log(`Data retrieved from Redis for ${cacheKey}`);
        } else {
            next();
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("<h4>Something went wrong!</h4>");
    }
}

// export default redisMiddleware;