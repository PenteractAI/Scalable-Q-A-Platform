import {cmdClient} from "../utils/redis.js";

const TTL = 60;

/**
 * Check if the user can publish a new content depending on its type
 *
 * @param userUuid
 * @param type
 * @returns {Promise<boolean>}
 */
export const canPost = async (userUuid, type) => {
    const key = `user:${userUuid}:${type}`;
    const exists = await cmdClient.get(key);
    if(exists) {
        const ttl = await cmdClient.ttl(key);
        console.log(`User ${userUuid} tried to add a new ${type} too early. Remaining TTL: ${ttl}s.`);
    }
    return !exists;
}

/**
 * Store in Redis a new entry for a user and a type of content with a specific TTL
 *
 * @param userUuid
 * @param type
 * @returns {Promise<void>}
 */
export const storeWithTTL = async (userUuid, type) => {
    const key = `user:${userUuid}:${type}`;
    await cmdClient.set(key, 'true', {EX: TTL });
}

export const publishMessage = async (channel, message) => {
    await cmdClient.publish(channel, JSON.stringify(message));
}