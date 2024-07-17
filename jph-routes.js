import express from "express";
import redis from "redis";
import { fetchPosts } from "./jsonplaceholder/jph-posts-api.js";
import { fetchComments } from "./jsonplaceholder/jph-comments-api.js";
import { fetchUsers } from "./jsonplaceholder/jph-users-api.js";
import { redisMiddleware } from "./middlewares/redis-middleware.js";
import { redisHost, redisPort } from "./middlewares/keys.js";

const routes = express.Router();
routes.use(redisMiddleware);

// const client = redis.createClient({
//     host: redisHost,
//     port: redisPort,
// });


routes.get("/posts", async (request, response) => {
    try {
        const data = await fetchPosts();
        console.log(`Data Fetched from Server with process ID - ${process.pid}`);
        client.set("posts", JSON.stringify(data));
        response.send(data);
    } catch (error) {
        response.status(500).send("Something went wrong!");
    }
});

routes.get("/comments", async (request, response) => {
    try {
        const data = await fetchComments();
        console.log(`Data Fetched from Server with process ID - ${process.pid}`);
        client.set("comments", 300, JSON.stringify(data));
        response.send(data);
    } catch (error) {
        response.status(500).send("Something went wrong!");
    }
});

routes.get("/users", async (request, response) => {
    try {
        const data = await fetchUsers();
        console.log(`Data Fetched from Server with process ID - ${process.pid}`);
        client.set("users", JSON.stringify(data));
        response.send(data);
    } catch (error) {
        response.status(500).send("Something went wrong!");
    }
});

export default routes;