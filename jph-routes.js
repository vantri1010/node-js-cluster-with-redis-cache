import express from "express";
import redis from "redis";
import { fetchPosts } from "./jsonplaceholder/jph-posts-api.js";
import { fetchComments } from "./jsonplaceholder/jph-comments-api.js";
import { fetchUsers } from "./jsonplaceholder/jph-users-api.js";
import { redisMiddleware } from "./middlewares/redis-middleware.js";
import { redisHost, redisPort } from "./middlewares/keys.js";

import { client } from "./middlewares/redisClient.js";

const routes = express.Router();
routes.use(redisMiddleware);

routes.get("/posts", async (request, response) => {
  try {
    const data = await fetchPosts().then(
      console.log(`Posts Fetched from Server with process ID - ${process.pid}`)
    );
    client.set("posts", JSON.stringify(data), {
      EX: 100,
      NX: true,
    });
    response.send(data);
  } catch (error) {
    response.status(500).send("Something went wrong!");
    console.error("Error: ", error);
  }
});

routes.get("/comments", async (request, response) => {
  try {
    const data = await fetchComments().then(
      console.log(
        `Comments Fetched from Server with process ID - ${process.pid}`
      )
    );
    client
      .set("comments", JSON.stringify(data), {
        EX: 100,
        NX: true,
      })
      .then(console.log("success write comments to redis"));
    response.send(data);
  } catch (error) {
    response.status(500).send("Something went wrong!");
    console.error("Error: ", error);
  }
});

routes.get("/users", async (request, response) => {
  try {
    const data = await fetchUsers().then(
      console.log(`Users Fetched from Server with process ID - ${process.pid}`)
    );
    client.set("users", JSON.stringify(data), {
      EX: 20,
      NX: true,
    });
    response.send(data);
  } catch (error) {
    response.status(500).send("Something went wrong!");
    console.error("Error: ", error);
  }
});

export default routes;
