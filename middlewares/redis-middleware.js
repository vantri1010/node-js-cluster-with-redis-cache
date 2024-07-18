import { client } from "./redisClient.js";

export async function redisMiddleware(req, res, next) {
  try {
    const { url } = req;
    const cacheKey = url.slice(1); // Remove the leading slash
    const cachedData = await client.get(cacheKey);

    if (cachedData !== null) {
      console.log(`Data retrieved from Redis for ${cacheKey}`);
      res.send(JSON.parse(cachedData));
    } else {
      next();
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send("<h4>Something went wrong!</h4>");
  }
}
