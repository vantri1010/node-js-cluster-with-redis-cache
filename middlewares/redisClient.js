import { createClient } from "redis";
import { redisHost, redisPort } from "./keys.js";

export const client = createClient({
  url: `redis://${redisHost}:${redisPort}`,
});

client.on("error", (err) => console.error("Redis Client Error", err));
client.on("connect", () => console.log("Connected to Redis DB"));
client.on("ready", () => console.log("Ready to use Redis DB"));
client.on("end", () => console.log("Client disconnected from Redis DB"));

// Ensure the client is connected
(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error("Redis Client Connection Error", err);
  }
})();
