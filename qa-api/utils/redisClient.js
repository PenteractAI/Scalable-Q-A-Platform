import { createClient } from "npm:redis@4.6.4";

const redisClient = createClient({
    url: "redis://redis:6379",
    pingInterval: 500,
})

await redisClient.connect();

export default redisClient;