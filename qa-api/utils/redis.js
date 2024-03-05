import { createClient } from "npm:redis@4.6.4";

export const cmdClient = createClient({
    url: 'redis://redis:6379',
    pingInterval: 500,
})

export const subClient = createClient({
    url: 'redis://redis:6379',
    pingInterval: 500,
})

await cmdClient.connect();
await subClient.connect();